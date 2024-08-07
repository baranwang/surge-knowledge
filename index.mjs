import { XMLParser } from 'fast-xml-parser';
import fs from 'node:fs';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import ora from 'ora';
import puppeteer from 'puppeteer';
import TurndownService from 'turndown';

const turndownService = new TurndownService();
const xmlParser = new XMLParser();

/**
 * 获得单个页面的 markdown 内容
 * @param {string} urlPath
 * @returns {Promise<string>}
 */
async function getMarkdownByPath(urlPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlPath);
  function gitBookOnline() {
    return page.evaluate(() => {
      const mainDom = document.querySelector('main');
      const titleDom = mainDom.querySelector('header');
      const contentDom = mainDom.querySelector('.whitespace-pre-wrap');
      let result = '';
      if (titleDom) {
        result += titleDom.innerHTML;
      }
      if (contentDom) {
        result += contentDom.innerHTML;
      }
      return result;
    });
  }
  function gitBookV3() {
    return page.evaluate(() => {
      return document.querySelector('.markdown-section').innerHTML;
    });
  }
  function gitBookV2() {
    return page.evaluate(() => {
      return document.querySelector('.page-wrapper .page-inner').innerHTML;
    });
  }
  const results = await Promise.allSettled([gitBookOnline(), gitBookV3(), gitBookV2()]);
  browser.close();
  const html = results.find((result) => result.status === 'fulfilled').value;
  return turndownService.turndown(html);
}

/**
 * 获得整个网站的 sitemap
 * 优先使用 sitemap.xml，如果没有则使用目录结构
 * @param {string} urlPath
 * @returns {Promise<string[]>}
 */
async function getSiteMap(urlPath) {
  const sitemapXmlPath = `${urlPath}/sitemap.xml`;
  const resp = await fetch(sitemapXmlPath);
  if (resp.status === 200) {
    const sitemapXml = await resp.text();
    const sitemap = xmlParser.parse(sitemapXml);
    return sitemap.urlset.url.map((item) => item.loc);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlPath);
  const urls = await page.evaluate(() => {
    const result = [];
    document
      .querySelector('nav[role="navigation"]')
      .querySelectorAll('a')
      .forEach((a) => {
        result.push(a.href);
      });
    return result;
  });
  await browser.close();
  const currentHost = new URL(urlPath).host;
  return urls.filter((url) => new URL(url).host === currentHost);
}

/**
 * 获得整个网站的 markdown 内容
 * @param {string} urlPath
 * @param {string} outputPath
 * @returns
 */
async function getMarkdownBySiteMap(urlPath, outputPath) {
  const siteMap = await getSiteMap(urlPath);
  for (const url of siteMap) {
    const spinner = ora(`正在下载 ${url}`).start();
    try {
      let pathname = new URL(url).pathname;
      if (pathname.endsWith('/')) {
        pathname += 'index';
      }
      let filePath = path.join(outputPath, path.relative(new URL(urlPath).pathname, pathname));
      if (filePath.endsWith('.html')) {
        filePath = filePath.replace('.html', '');
      }
      filePath += '.md';
      const dir = path.dirname(filePath);
      const md = await getMarkdownByPath(url);
      spinner.succeed(`下载 ${url} 成功`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, md);
    } catch (error) {
      spinner.fail(`下载 ${url} 失败`);
      console.error(error);
    }
  }
}

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  await Promise.allSettled(
    Object.entries({
      manual: 'https://manual.nssurge.com/',
      understanding: 'https://manual.nssurge.com/book/understanding-surge/en/',
      'knowledge-base': 'https://kb.nssurge.com/surge-knowledge-base',
    }).map(([key, url]) => getMarkdownBySiteMap(url, path.resolve(__dirname, 'docs', key)))
  );
})();
