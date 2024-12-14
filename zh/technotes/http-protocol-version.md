1.  [Technotes](/surge-knowledge-base/zh/technotes)

关于 HTTP 协议版本
============

该文档综述了各种 HTTP 协议版本的区别，以及 Surge 开启时对 HTTP 协议版本的影响。

### 

[](#ke-neng-de-http-ban-ben)

可能的 HTTP 版本

1.  HTTP/1.0：目前已几乎绝迹，仅有极个别网站在使用。但本质上与 HTTP/1.1 区别不大。
    
2.  HTTP/1.1：使用最为广泛的 HTTP 协议版本。当访问非 https:// 网站时，一定使用的是 HTTP/1.x 协议。
    
3.  HTTP/2：已逐渐成为主流的 HTTP 协议版本。必须配合 https 即 TLS 使用。相对于 HTTP/1.x 最大的改进为支持请求的 Multiplexing。
    
4.  HTTP/3：最新的 HTTP 规范，于 2022 年 6 月 9 日正式定稿，但互联网上已存在很多基于先前草稿版本规范实现的网站。与先前版本最大的不同是，HTTP/3 基于 UDP 而非 TCP 实现。
    

### 

[](#yi-ban-qing-kuang-xia-liu-lan-qi-yu-fu-wu-duan-xie-shang-http-ban-ben-de-fang-fa-ji-fei-surge-jie-ru)

一般情况下浏览器与服务端协商 HTTP 版本的方法（即非 Surge 介入时）

1.  当访问非 https:// 网站时，一定使用 HTTP/1.1。
    
2.  当访问 https:// 网站时，在 TLS 握手阶段，浏览器会通过 TLS 的 ALPN（Application-Layer Protocol Negotiation） 扩展，向服务端告知希望使用 `h2` 协议。若服务端支持 HTTP/2，则在 TLS 的握手回应中会告知客户端。此后浏览器与服务端间在 TLS 层上开始使用 HTTP/2。若服务端未表明支持 `h2`，则回退至 HTTP/1.1。
    
3.  服务端返回的 HTTP Response Header 中，可能带上 `Alt-Svc` 字段，表明该网站支持其他的协议，如 `Alt-Svc: h3=":443"`，表示该服务在端口号 443 上还支持使用 HTTP/3 协议，浏览器在下次请求时将使用 HTTP/3 协议访问。（具体策略由浏览器逻辑自行决定，不同的浏览器策略可能不同）
    
4.  因此，即使网站支持 HTTP/3，在首次访问时也必须先使用 HTTP/2 或 1.1 连接，当读取到 Alt-Svc 字段后再升级为 HTTP/3。
    
5.  为了解决这个问题，又新加入了 SVCB/HTTPS RRs DNS 记录，浏览器在访问时优先查询该记录而非 A/AAAA 记录，该记录中会标明服务端具体支持的协议版本和各版本对应的接入点。所以可直接使用 HTTP/3 进行连接。
    

### 

[](#bu-tong-liu-lan-qi-de-ce-le-qu-bie)

不同浏览器的策略区别

不同的浏览器实现在 HTTP 版本协商上有不一致的地方，比如 Chrome 在 HTTP/3 可用时，总是优先使用 HTTP/3 协议，当失败后再回退至 HTTP/2。而 Safari 则是并发尝试使用 HTTP/2 和 HTTP/3，并优先选择最先完成连接建立过程的连接。这可能使得在测试时发现 Safari 经常甚至永不使用 HTTP/3。

### 

[](#surge-kai-qi-shi-dui-http-xie-yi-ban-ben-xie-shang-de-ying-xiang)

Surge 开启时对 HTTP 协议版本协商的影响

1.  当 MITM 生效时
    

若 MITM 对某连接生效，此时由 Surge 完全接管 HTTP 协议栈，Surge 支持以 HTTP/1.1 或 HTTP/2 与客户端进行对话。

在配置中开启 MITM via HTTP/2 开关后（`h2=true`），Surge 会接受客户端的 h2 ALPN，否则将回退至 HTTP/1.1。

*   若使用 HTTP/1.1 接管，那么与真实服务器间的握手也不会发送 h2 ALPN，强行使用 HTTP/1.1。
    
*   若使用 HTTP/2 接管，那么与真实服务器间的握手会发送 h2 ALPN，根据握手结果使用 HTTP/1.1 或 HTTP/2。
    

1.  当使用代理模式接管时
    

若勾选了设置为系统代理选项，或是以其他方式配置了浏览器代理设置。由于 HTTP 代理不支持 UDP 流量转发，HTTP/3 将永不会被使用。（这是浏览器自身策略决定的）

HTTP/2 的协商不受影响，当访问 https 网站时，浏览器将使用 HTTP CONNECT 代理方法，此时 Surge 仅作为 TCP 层代理，对高层 TLS/HTTP 协议协商没有干扰。

1.  代理模式关闭，仅使用增强模式接管时
    
    *   对于 HTTP/2 的协商没有影响。
        
    *   对于 HTTP/3：
        
        *   默认情况下，由于 Surge 依靠 fake IP 机制接管请求（详见《Surge 官方中文指引：理解 Surge 原理》），会自动屏蔽掉所有 SVCB DNS 请求。如果某网站依赖该机制进行 HTTP/3 协商，那么将会失败。可通过配置 `allow-dns-svcb=true` 关闭该行为。但请注意关闭后可能导致 Surge 接管的请求中出现无法正确映射的 IP 和 CNAME。
            
        *   对于使用 `Alt-Svc` 进行协商的网站没有影响。
            
        *   若使用代理策略，请注意对应策略是否支持 UDP 转发，若不支持则会回退至 DIRECT 策略。