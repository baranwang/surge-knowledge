import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapStream } from 'sitemap';

/**
 * 获取文件夹下的所有文件
 * @param {string} dir 文件夹路径
 * @param {Array} fileList 文件列表（递归用）
 * @returns {Array} 文件路径数组
 */
function getAllFiles(dir, fileList = []) {
  // 读取文件夹内容
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    // 判断是否为目录
    if (fs.statSync(filePath).isDirectory()) {
      // 递归调用
      getAllFiles(filePath, fileList);
    } else {
      // 存储文件路径
      fileList.push(filePath);
    }
  });

  return fileList;
}

(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const docsBaseDir = path.resolve(__dirname, './docs');
  const sites = fs.readdirSync(docsBaseDir).filter((file) => fs.statSync(path.resolve(docsBaseDir, file)).isDirectory());
  sites.forEach((site) => {
    const siteDir = path.resolve(docsBaseDir, site);
    const files = getAllFiles(siteDir).map((file) => path.relative(__dirname, file));
    const sitemap = new SitemapStream({ hostname: 'https://testingcf.jsdelivr.net/gh/baranwang/surge-knowledge@main/' });
    files.forEach((file) => {
      sitemap.write({ url: file });
    });
    const sitemapPath = path.resolve(__dirname, 'sitemap', `${site}.xml`);
    const writeStream = fs.createWriteStream(sitemapPath);
    sitemap.pipe(writeStream);
    sitemap.end();
  });
})();
