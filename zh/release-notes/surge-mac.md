Surge Mac 更新日志
==============

该页面的更新可能有延迟，所有版本和最新的更新可以从 Surge 的 Sparkle 更新 XML 直接获取：

*   正式版本：https://www.nssurge.com/mac/v5/appcast-signed.xml
    
*   Beta 版本：https://www.nssurge.com/mac/v5/appcast-signed-beta.xml
    

### 

[](#ban-ben-5.8.2)

版本 5.8.2

*   修复启用 `gateway-restricted-to-lan` 参数时 IPv6 VIF 无法接管请求的问题。
    
*   对 `use-application-dns.net` 的 DNS 查询将返回 NXDOMAIN，导致 Firefox 自动禁用应用程序 DNS（即 DoH）。直接在浏览器中使用加密 DNS 会阻止 Surge 正确获取请求的域名。
    
*   错误修复和小幅改进。
    

https://dl.nssurge.com/mac/v5/Surge-5.8.2-2946-b739968f1d90da3b755d3bf82941e8c2.zip

### 

[](#ban-ben-5.8.1)

版本 5.8.1

*   新参数：proxy-restricted-to-lan/gateway-restricted-to-lan 一些用户由于缺乏网络安全知识，意外地将代理和网关服务暴露在互联网上（例如，配置了 DMZ）。因此，添加了这两个参数以限制代理和网关服务仅接受来自当前子网的设备。这两个参数默认启用。
    
*   修复增强模式与 PPPoE 直接拨号之间的兼容性。
    
*   支持使用 ETag 避免在请求外部资源时下载重复数据。
    
*   Surge 现在支持处理系统的 DNS 搜索域设置。
    
*   其他错误修复和兼容性改进。
    

https://dl.nssurge.com/mac/v5/Surge-5.8.1-2929-5220af95366dfacec7ca84cb8ddd122c.zip

### 

[](#ban-ben-5.8.0)

版本 5.8.0

#### 

[](#wang-luo-kuo-zhan)

网络扩展

*   鉴于传统 utun 接管方案在新系统版本中出现了诸多问题，从 Surge Mac 5.8.0 开始，Surge Mac 将使用 Network Extension 作为增强模式来接管系统网络。
    
*   Surge Mac 的最低系统版本要求提升至 macOS 12。
    
*   因为所需权限不同，更新后需要手动授权操作。
    
*   `vif-mode` 参数将不再有效。
    
*   增强模式现在可以与网络共享功能结合使用，这意味着你可以直接创建由 Surge 管理的 Wi-Fi（需要有线网络）。
    

#### 

[](#duan-kou-tiao-yue)

端口跳跃

Hysteria2 和 TUIC 协议现在支持端口跳跃，以改善 ISP 对 UDP 的 QoS 问题。详情请参阅服务器文档。

`Proxy = hysteria2, 1.2.3.4, 443, password=pwd, port-hopping="1234;5000-6000;7044;8000-9000", port-hopping-interval=30`

配置 `port-hopping` 参数后，前面配置的主端口号将不再有效。

参数：

*   `port-h-hopping`: 用于配置端口范围。用逗号分隔，并支持用连字符配置的范围。
    
*   `port-hopping-interval`: 更换端口号的间隔时间。默认为30秒
    

#### 

[](#qi-ta-gai-jin)

其他改进

*   鉴于新 macOS 系统中大量需要权限的功能，新增了一个专门用于管理系统权限的页面。
    
*   本地 DNS 映射中的 `syslib` 关键字现在可以在增强模式下使用。然而，在非增强模式下，解析完全由系统处理。在增强模式下，Surge 使用系统的 DNS 地址进行解析。
    
*   新增 `[General]` 参数 `show-error-page`, 用于控制当发生错误时是否显示 Surge 的 HTTP 错误页面。此参数默认启用，其行为与之前版本一致。
    

https://dl.nssurge.com/mac/v5/Surge-5.8.0-2900-6379c9d5240ae1555772aed2eb977e69.zip

### 

[](#ban-ben-5.7.5)

版本 5.7.5

*   面板现在可以在 Surge Mac 中使用。
    
*   DNS 转发子系统优化
    
*   当 DNS 查询的域名是不应转发到公共网络的域名（例如 .home.arpa, 1.0.168.192.in-addr.arpa）时，将自动确定上游 DNS 地址并仅转发到局域网 DNS 服务器。
    
*   Surge 现在可以正确响应假 IP 的 PTR 请求，这意味着使用 `dig -x 198.18.23.87` 命令可以确定与假 IP 对应的原始域名。
    
*   DNS 转发器现在将根据 `[Host]` 部分配置将 DNS 请求转发到特定的上游服务器。
    
*   对于不支持的假 IP 的 DNS-SD PTR 请求，直接以 NOTIMP 响应，而不进行转发。
    
*   为当前网页添加规则时，可以选择添加到现有规则集中。
    
*   修复了一些错误。
    

https://dl.nssurge.com/mac/v5/Surge-5.7.5-2826-4f19761fb2275ebbe2acf43907bd9371.zip

### 

[](#ban-ben-5.7.4)

版本 5.7.4

*   由于 Surge Ponte 所依赖的公共 STUN 服务器突然关闭，导致 Surge Ponte 无法使用，我们进行了紧急替换。此外，我们将在未来建立自己的 STUN 服务器，以避免此类问题。
    
*   增强与 VPN 和多网卡的兼容性
    

在之前的版本中，如果启用了增强模式，由于 Surge 覆盖了系统的路由表，所有出站数据包将被强制使用主接口。这绕过了路由表以避免创建循环。

然而，这也导致在有多个网卡或其他 VPN 的情况下，数据包无法从正确的接口发送的问题。

本版本改进了这一设计。现在，在增强模式下，如果存在更高优先级的子路由，Surge 将自动检查路由，并仍然对 TCP/UDP 数据包使用标准路由，从而提高兼容性。

*   修复包含重复 DOMAIN 和 DOMAIN-SUFFIX 规则时可能导致 DOMAIN-SUFFIX 规则失效的问题。
    
*   其他错误修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.7.4-2806-afe67661ef616b7bbab189dec1473b68.zip

### 

[](#ban-ben-5.7.3)

版本 5.7.3

*   现在可以在规则列表中看到某条规则被使用的次数
    
*   优化了阻拦 QUIC 流量的实现方法，以提高让客户端正确回退的可能性
    
*   Smart 组当不存在子策略时，也会使用 SUBSTITUTE 策略(DIRECT)而非直接失败。
    
*   修正 TLS 类协议，在 sni=off 的设置下，server-cert-fingerprint-sha256 参数未能生效的问题
    
*   新增规则类型 HOSTNAME-TYPE，用于判断请求的主机名的类型，可选值有：IPv4, IPv6, DOMAIN, SIMPLE。（SIMPLE 指的是不包含 . 的主机名，如 localhost）
    
*   优化了 DNS 的请求日志，现在会显示更多的信息，且在规则系统未触发 DNS 时，如果是 DIRECT 策略直连也可以显示 DNS 的相关日志了
    
*   在删除策略时，如果该策略被策略组所使用，现在允许直接删除并将自动从所有策略组移除
    

https://dl.nssurge.com/mac/v5/Surge-5.7.3-2785-048c0bdc5ee2b05dab39852d51a19ff4.zip

### 

[](#ban-ben-5.7.2)

版本 5.7.2

*   优化规则集中 ASN 规则的匹配性能
    
*   修复无法通过 UI 编辑 FINAL 规则的问题
    
*   修复无效的 cron 表达式会导致脚本被重复执行的问题
    
*   优化了脚本引擎的管理机制
    
*   其他小问题修复
    

https://dl.nssurge.com/mac/v5/Surge-5.7.2-2762-9a963758f386b5da00e7744b2a7f254d.zip

### 

[](#ban-ben-5.7.1)

版本 5.7.1

*   优化小型规则集的匹配性能，在旧型号 CPU 上效果尤为明显
    
*   外置资源更新页面可以显示规则集处理产生的错误信息
    
*   自动忽略规则集中的无效空行
    
*   修正应用临时规则后，如果产生了策略变化，不会打断原有连接的问题
    
*   修正在 Smart 组内使用 Ponte 策略时，如果目标设备是自身，未能自动转换为 DIRECT 策略的问题
    
*   修正 Ponte 设备请求在请求日志中显示的时间错误的问题
    
*   修正当外部策略组产生变化时，可能导致的崩溃
    
*   修正配置升级功能未能对托管配置和企业配置正确生效的问题
    
*   在 Smart 组初始化阶段，不再显示最常使用标签，以避免产生误解
    
*   修正在建立策略组时，如果勾选了外部策略但是没有填写 URL，会导致崩溃的问题
    
*   修正密钥库管理页面，进行移动操作后的项目未能正确显示存储位置的问题
    

https://dl.nssurge.com/mac/v5/Surge-5.7.1-2757-e7b680d5dc23e1258188adc4d81116d7.zip

### 

[](#ban-ben-5.7.0)

版本 5.7.0

#### 

[](#smart-group)

Smart Group

这是一种全新的策略组类型，由我们精心设计的算法引擎所驱动，可以自动从该策略组的子策略中选择合适的策略。Smart 策略组的目标是取代原有的自动测试组（url/load-balance/fallback），大幅优化体验的同时，尽可能减少用户需要手动干预策略组的情况，用户只需将可用策略放入该组即可。

详情请见：https://kb.nssurge.com/surge-knowledge-base/v/zh/guidelines/smart-group

#### 

[](#gui-ze-xi-tong)

规则系统

*   规则系统整体性能优化。
    
*   大幅优化大型域名规则集中的索引算法，对于十万条以上的规则集，检索效率提高了十倍以上。
    
*   修正规则集内的逻辑规则的子规则无法被规则集的 no-resolve 和 extended-matching 参数覆盖的问题
    
*   新增规则类型 DOMAIN-WILDCARD，支持 ? 与 \* 匹配域名
    
*   DOMAIN-SET 与 RULE-SET 改为强校验，当文件中包含无效行时将导致整个规则集无效，以避免误用产生问题
    

#### 

[](#ipv6)

IPv6

*   ipv6-vif 参数行为修改，当设置为 always 时，即使未设置 ipv6=true，也会开启 IPv6 功能。
    
*   为 ipv6-vif=always 参数增加了警告
    
*   调整了自动重试机制，在非 IPv6 网络下访问 IPv6 地址不再会进入重试流程，请求会立刻失败（以此解决在非 IPv6 环境下开启 IPv6 VIF 造成部分应用卡顿的问题，如微信和淘宝，但是应用仍然会持续发出 IPv6 请求）
    

#### 

[](#qi-ta-you-hua)

其他优化

*   $notification.post 增强，新增媒体资源支持、声音提示和自动消除。
    
*   优化 WireGuard 失败处理
    
*   降低 TUIC 协议在休眠时对电量的消耗
    
*   请求日志系统时间统计精度提高，现在可精确到 µs 级
    
*   优化各种异常的重试机制，避免在出现一些特定问题时持续重试导致高资源占用。对于需要持续重试的操作（如 WireGuard 重连、Ponte 服务端上报 iCloud），现在 Surge 会在出错后的 0.1s, 0.5s, 1s, 5s, 10s, 30s 后重试。
    
*   优化外部资源的缓存系统
    
*   新增配置文件行命令 #!REQUIREMENT
    

#### 

[](#xi-jie-tiao-zheng)

细节调整

*   限制了脚本在 debug 模式下，可以往请求 notes 中写入的日志的长度
    
*   默认 UDP 测试目标改为 1.0.0.1
    
*   在脚本中使用 API 时如果传入了错误类型的字段，将产生脚本异常
    
*   当脚本已完成或超时后，未完成的 $httpClient 不再会调用回调函数
    

#### 

[](#wen-ti-xiu-zheng)

问题修正

*   修正 Dashboard 查看远端设备时，无法读取截取的 HTTP Body 的问题
    
*   修正 Header Rewrite 规则无法根据 Host 字段进行 URL 匹配的问题
    
*   修正了在测试代理时，ip-version 和 tos 参数无法生效的问题
    
*   修正通过 HTTP-API 执行脚本时，若果错误的传入 null 会导致崩溃的问题
    

https://dl.nssurge.com/mac/v5/Surge-5.7.0-2724-acaafccea020f6afdc758c83057ffcbb.zip

### 

[](#ban-ben-5.6.0)

版本 5.6.0

#### 

[](#xin-gong-neng)

新功能

*   Mock (本地映射) 功能全面增强。
    
    *   新增数据类型如 `text`, `tiny-gif`, `base64` 以便直接内联返回数据。
        
    *   新增 `status-code` 参数
        
    *   UI 相关配置尚未更新。使用方法见文档：https://manual.nssurge.com/http-processing/mock.html
        
    
*   当配置了参数 `encrypted-dns-follow-outbound-mode=true`，如果 DoH/DoQ/DoH3 连接匹配到使用域名的代理服务器，并且该代理服务器的域名存在 DNS 本地映射记录含有 IP 地址或传统 DNS 服务器，则允许通过该代理服务器查询。（通过代理服务器查询 DNS 会破坏 CDN 优化，导致加载图片和视频时严重缓慢。除非有非常特殊的需求并且不必这样配置，应使用域规则确保请求直接由代理服务器查询。）
    
*   新增 Body Rewrite 功能，详情见文档：https://manual.nssurge.com/http-processing/body-rewrite.html
    
*   新增对 STUN 数据包的识别，可使用 PROTOCOL,STUN 进行匹配。类似 QUIC，为确保兼容性，PROTOCOL,UDP 也可继续匹配 STUN 流量。
    

#### 

[](#zeng-qiang)

增强

*   优化请求日志记录。现在将显示匹配到的 URL Rewrite 和 Header Rewrite 的具体规则。
    
*   调整了 DNS 引擎处理空结果的逻辑。现在当配置了多个 DNS 服务器时，不再等待所有服务器响应空结果，以避免在 AAAA 记录不存在时产生额外等待。（然而，由于 DNS 服务器在不同环境下的表现可能有所不同，观察此更改是否引起副作用；如果出现问题导致异常结果，请提供反馈。）
    
*   取消了 ICMP 超限时的警告通知
    

### 

[](#xiu-zheng)

修正

*   增强了 HTTP Body 解压时的兼容性。
    
*   修正了 Surge 由于传入某些错误类型的参数而导致的崩溃。
    
*   适应新系统限制，修正了在某些情况下选择显示主窗口无效的问题
    
*   修正了代理模式下非 https WebSocket 与新版 Safari 的兼容性问题
    

https://dl.nssurge.com/mac/v5/Surge-5.6.0-2611-efc3b7ebb3872061e9a6a4917742e203.zip

### 

[](#ban-ben-5.5.0)

版本 5.5.0

#### 

[](#mo-kuai)

模块

*   新增了多个新的官方模块；现在可以动态更新官方模块了。
    
*   模块新增了一个用于在 UI 中便捷访问和分类的分类字段。
    
*   模块现在接受参数表，支持多个参数。参数将用于通过文本替换修改模块内容。
    

#### 

[](#jiao-ben)

脚本

*   新的脚本执行引擎。优化了执行性能和内存使用。
    
*   $httpClient 增加了几个实用参数。 有关上述更新的更多详情，请参阅文档。
    

#### 

[](#zeng-qiang-gong-neng)

增强功能

*   新参数：always-raw-tcp-keywords。使用方法，请参见文档。
    
*   增加了 SRC-PORT 规则用于匹配客户端端口号。
    
*   IN-PORT/SRC-PORT/DEST-PORT 三条规则被归类为端口号规则类型，支持三种表达式：
    
    *   直接写端口号，如 IN-PORT,6153
        
    *   端口号闭区间：如 DEST-PORT,10000-20000
        
    *   使用 >, <, <=, >= 操作符，如 SRC-PORT,>=50000
        
    
*   UI 现在可以在编辑后保持原始配置中的纯空行。
    

#### 

[](#xiu-fu)

修复

*   修正了 QUIC 流量控制的一个细节问题并针对 Ponte/TUIC/Hysteria2 协议优化了延迟性能。
    
*   编辑单个规则后，通知相关参数将被保留。
    

https://dl.nssurge.com/mac/v5/Surge-5.5.0-2586-ed7ce88d6b2a286537ff5402324cb7fe.zip

### 

[](#ban-ben-5.4.3)

版本 5.4.3

*   重写了虚拟 IP 数据库，现在数据库可以基于最后一次使用时间自动清理数据。
    
*   修复了在使用 Snell v4 与 WireGuard 并启用复用时可能出现的一些问题。
    
*   对于带有非法域名的 DNS 请求，将生成一个空结果响应，而不是被直接忽略。
    
*   `tun-included-routes` 和 `tun-excluded-routes` 参数现在支持在启用 IPv6 VIF 时使用 IPv6 CIDR 块。
    
*   支持为内置规则集/内联规则集配置 no-resolve。
    
*   Surge Ponte 连接不再验证对等地址，以确保在某些特殊场景下的正常运行。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.4.3-2540-511d4692c27626166bbcbb61fdd56bc8.zip

### 

[](#ban-ben-5.4.2)

版本 5.4.2

*   修复了内置规则集 LAN 无法正确触发 DNS 解析的问题。
    
*   修复了处理某些格式错误的 UDP 包时可能导致崩溃的问题。
    
*   修复了一个系统可能错误判断已经重启，导致 Fake IP 表被清除的问题。
    
*   修复了与特定 HTTP 服务器的兼容性问题。
    
*   兼容了一些非标准 SOCKS5 UDP 服务器实现，将错误调整为警告。
    
*   其他 bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.4.2-2502-001dc6b9672b7e79f92ca5cd3be6baf2.zip

### 

[](#ban-ben-5.4.1)

版本 5.4.1

#### 

[](#gui-ze-yin-qing-you-hua)

规则引擎优化

RULE-SET 与 DOMAIN-SET 的实现完全重写，现在 Surge 会在资源更新时自动对规则集进行预处理，建立索引数据结构，大幅提高匹配速度。

1.  RULE-SET 和 DOMAIN-SET 两种类型规则集不再有性能和内存占用区别，可以随意使用。
    
2.  DOMAIN-SET 规则集不再存在不可以使用 eTLD 的限制。
    
3.  RULE-SET 中的 DOMAIN, DOMAIN-SUFFIX, IP-CIDR, IP-CIDR6 规则匹配速度得到大幅提升。
    
    *   十万条左右的 DOMAIN/DOMAIN-SUFFIX 规则集，在旧版中单次匹配需要 100ms，现在只需要个位数 ms。
        
    *   一万条左右的 IP-CIDR 规则集，在旧版中单次匹配需要约 0.1ms。新版只需要0.0002ms，提升了约 500 倍。IP-CIDR6 规则的性能提升幅度更高。
        
    
4.  在新版本中，自行通过 IP-CIDR 规则集构建出地区的 IP 地址集合，与直接使用内部的 GEOIP 规则的性能已经完全一致。
    
5.  先前版本加入的 Inline Ruleset 无法享受该优化，但是在百条数量级下几乎无差异。
    
6.  先前版本中，Ruleset 中的规则也是按照从上至下的方式逐条匹配，如果规则集中同时包含了需要 DNS 解析的规则，也只有当开始匹配该子规则时才会触发 DNS。新版本中，只要规则集中包含任意一条需要 DNS 解析的规则，在测试该规则集前就会先进行 DNS 解析。（绝大多数情况下没有任何区别）
    

*   主规则匹配效率小幅优化。
    
*   IP-CIDR6 规则在非索引情况下的效率也得到大幅提升。
    
*   RULE-SET 规则可直接配置参数 no-resolve 和 extended-matching，均等价于为所有子规则配置了该参数。
    
*   DOMAIN-SET 规则集也支持配置 extended-matching。
    

#### 

[](#minor-optimizations)

Minor Optimizations

*   MITM 时发送签名所使用的证书（证书链），以支持使用 intermediate 证书作为签发证书。
    
*   行首与行末注释，现在可以随意使用 `#` `//` `;` 等三种常见写法
    
*   配置文件错误消息提示优化，现在它可以更准确地给出发生错误的确切行号。
    
*   优化 Surge Ponte 错误处理流程，修正某些错误下不会自动更新设备信息的问题
    
*   Bug 修正。
    

https://dl.nssurge.com/mac/v5/Surge-5.4.1-2495-041f47425e9ecf56580562ce01560448.zip

### 

[](#ban-ben-5.4.0)

版本 5.4.0

#### 

[](#xin-gong-neng-1)

新功能

*   协议嗅探
    
    发往 80 与 443 端口的请求，会等待客户端发送第一个数据包后，提取 SNI 等信息用于规则系统判断。
    
    *   `DOMAIN`、`DOMAIN-SUFFIX`、`DOMAIN-KEYWORD` 规则新增可选参数 `extended-matching`。开启该参数后，该规则将同时尝试匹配 SNI 和 HTTP Host Header （或 :authority）中的字段。
        
    *   新增参数 `always-raw-tcp-hosts`，用于强行关闭对特定主机名的主动协议探测。
        
    
*   新代理协议支持：Hysteria 2
    
    Hysteria 2 是一个为不稳定和容易丢包的网络环境所优化的代理协议，基于 UDP/QUIC。
    
*   自动 QUIC 阻止
    
    由于大部分代理协议并不适合用于转发 QUIC 流量，现在 Surge 会自动阻止 QUIC 流量使其回退 HTTPS/TCP 协议，以保证性能，对于命中了 MITM 主机名的 QUIC 流量，同样将自动拒绝。
    
*   QUIC 类协议的 ECN (Explicit Congestion Notification) 支持
    
    显著改善了 Vector(Surge Ponte)/TUIC/Hysteria 2 协议的性能表现。
    

#### 

[](#you-hua)

优化

*   重新设计了 HTTP 捕获功能
    
    *   相关设置不再存储在配置中，`[Replica]` 部分已被弃用。
        
    *   在打开捕获开关后增加了一个自动关闭设置，可以根据时间、大小或请求次数自动停止捕获。
        
    *   在打开捕获开关后增加了自动激活 MITM，可以额外为特定主机名打开。 (即使主 MITM 开关关闭)。
        
    *   增加了在打开捕获开关后仅保存 HTTP/HTTPS 请求的选项。
        
    
*   提高了与某些非标准协议的兼容性。
    
*   在测试 Ponte 策略时，测试 URL 已从 `proxy-test-url` 更改为 `internet-test-url`。
    
*   按照 WireGuard 协议标准推荐，现在 WireGuard 握手数据包将被标记为 0x88 (AF41) DSCP 以提高成功率。
    
*   当通过 WireGuard 转发 UDP 数据包时，它支持保留隧道内数据包的 TOS(DSCP/ECN) 标签。
    
*   根据 WireGuard 协议标准推荐，Surge 将从隧道内的数据包复制 ECN 标签到外部数据包。收到带有 ECN 标签的数据包时，它们将根据 RFC6040 严格合并。 (`ecn=true` 必须为策略设置)。
    
*   UDP NAT 可以根据 ICMP 消息提前关闭 UDP 会话。
    
*   改进了 QUIC 的 PMTU 支持。
    

#### 

[](#bug-xiu-fu)

Bug 修复

*   修复了规则集的外部资源需要重新加载才能在更新后生效的问题。
    
*   在网络切换后，它将强制断开原始的 DoH/DoQ/DoH3 长连接，以避免获得不适合当前网络环境的结果。
    
*   修复了无效证书可能导致密钥存储界面崩溃的问题。
    
*   在对直接使用 IP 地址进行连接的 HTTPS 请求执行 MITM 时，不应将 IP 地址发送为 SNI，因为这可能导致兼容性问题。
    
*   其他 bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.4.0-2470-d6f513ab6e647abc29490f1f3506667f.zip

### 

[](#ban-ben-5.3.2)

版本 5.3.2

*   Surge Mac 现已准备好支持 macOS Sonoma。
    
*   外部资源现在可以由 Surge iOS 远程管理和更新。
    
*   修复了位置权限请求不能正确触发的问题。
    
*   Surge Web 仪表板升级到版本 2.0.4。
    
*   其他改进。
    

https://dl.nssurge.com/mac/v5/Surge-5.3.2-2393-f4b3e5e9a7bc5b73106ace7b0776eefe.zip

### 

[](#ban-ben-5.3.1)

版本 5.3.1

*   Surge 仪表板现在可以直接为本地和远程 Surge 实例创建临时规则。
    
*   Surge Web 仪表板现已升级到版本 2.0。
    
*   添加了 Inline Ruleset，允许直接在主配置文件中编写 Ruleset。
    
*   模块增强。模块现在可以操作 \[WireGuard \*\] 和 \[Ruleset \*\] 部分。
    
*   添加了用于获取 CA 证书（DER 格式）的 HTTP API：GET /v1/mitm/ca。
    
*   修复了 MITM 失败记录无法正确生成的问题。
    

https://dl.nssurge.com/mac/v5/Surge-5.3.1-2383-066f883d96a472655c9ea7be50475b8b.zip

### 

[](#ban-ben-5.3.0)

版本 5.3.0

*   现在您可以直接通过 Surge Ponte 访问已注册设备的远程仪表板。
    
*   Surge 仪表板现在可以操作远程设备的策略组和出站选项。
    
*   macOS Sonoma 现在需要位置权限以获取 SSID。如果使用相关规则和子网设置，Surge 将提示位置权限。
    
*   修复了策略组的覆盖不能被远程取消的 bug。
    
*   更正了 VIF 和特定设备之间的兼容性问题。
    
*   Surge Ponte 改进。
    

https://dl.nssurge.com/mac/v5/Surge-5.3.0-2375-bc1b4791973df9aba493c3190a7b0050.zip

### 

[](#ban-ben-5.2.3)

版本 5.2.3

*   您现在可以基于现有的配置文件创建一个新的可修改的配置文件。在这个新的配置文件中，选中的部分将引用原始配置文件中的相应内容，并自动与原始配置文件同步。同时，新配置文件中未选中的部分可以自由修改，不受原始配置文件的影响。（用于分离配置文件功能的 UI。）
    
*   分离的配置文件现在可以包括企业配置文件。
    
*   修复了当 SSH 服务器配置了横幅时无法连接的问题。
    
*   您现在可以使用 UI 来编辑 ShadowTLS 参数。
    
*   优化 ARM64 架构下的 VIF v1 模式的性能。当 VIF 模式设置为自动时，新版本将在 M1/M2 处理器下自动使用 v1 引擎，最大性能为 ~8Gbps，从而避免兼容性和稳定性问题。
    
*   纠正了 Dashboard 主窗口的打开位置可能不正确的问题。
    

https://dl.nssurge.com/mac/v5/Surge-5.2.3-2354-ce8606235be8df196c0e9619a9c8cbbd.zip

### 

[](#ban-ben-5.2.2)

版本 5.2.2

*   修复了在没有有效网络时可能会有关于系统代理设置被其他应用程序修改的错误提示的问题。
    
*   修复了使用 TUIC v5 作为底层代理时可能出现的一些问题。
    
*   修复了当启用 WebSocket 时，如果直接使用 IPv6 地址作为 vmess 主机名，无法正确构建 WebSocket 请求的问题。
    
*   当 SOCKS5 服务器不支持 UDP 转发时，提供更清晰的错误提示。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.2.2-2340-74b1e55a52888040394976468a61d973.zip

### 

[](#ban-ben-5.2.1)

版本 5.2.1

*   Surge Ponte 现在可以在 NAT 类型不满足要求时以 LAN-only 模式工作。同一 LAN 上的设备仍然可以访问。
    
*   在上一个版本中添加的连接限制器机制已被暂时移除。
    
*   优化设置为系统代理功能的逻辑。
    
*   修复了一个内存泄漏问题。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.2.1-2333-ef97cd79e935d838387dc99712fb38b3.zip

### 

[](#ban-ben-5.2.0)

版本 5.2.0

*   由于 macOS 网络栈内存的大小固定，当网络栈缓冲区耗尽时，内核将自动关闭占用最高的程序以释放资源。使用 Surge 接管 P2P 下载器时可能出现这个问题。此版本将自动检查此问题并自动进入安全模式。
    
*   Surge VIF 引擎已升级至 v3，不再依赖 Packet Filter (pf)，解决了与虚拟机和网络共享功能的兼容性问题。同时，增加了连接数限制，以避免由过多并发请求导致的系统资源耗尽。
    
*   为单个进程和单个设备添加了连接限制器，以避免个别设备消耗大量资源。
    
*   支持 QUIC 的 PMTU 发现，提高了 Surge Ponte 和 TUIC 协议的性能。
    
*   优化了基于 QUIC 的协议的错误处理逻辑。
    
*   使用 TUIC v5 转发 UDP 数据包时，遵循 IP 数据包的 DF 标志。避免了使用 TUIC v5 访问 QUIC 网站时可能出现的问题。
    
*   其他 bug 修复和优化。
    

https://dl.nssurge.com/mac/v5/Surge-5.2.0-2302-721d7db5429609c5a54af922f045a509.zip

### 

[](#ban-ben-5.1.1)

版本 5.1.1

*   增加了对 TUIC v5 协议的支持。
    
*   优化了 Surge Ponte/TUIC 的性能。
    
*   当策略组异常时，优化了请求 Note 的记录。
    
*   修复了在 MITM H2 模式下未正确进行连接复用的问题。
    
*   修复了 $httpClient/DoH 的请求可能有时会被误取消的问题。
    
*   调整了 Snell v4 协议的流量特性。
    
*   其他 bug 修复和优化。
    

https://dl.nssurge.com/mac/v5/Surge-5.1.1-2264-6f04d8ac1bbf1c91178a09124e45e37e.zip

### 

[](#ban-ben-5.1.0)

版本 5.1.0

#### 

[](#surge-ponte)

Surge Ponte

*   Surge Ponte 支持跨 iCloud 账户共享。
    
*   修复了通过 Surge Ponte 或 TUIC 协议访问 HTTP/1.0 服务器时可能出现的问题（例如 ASUS 路由器管理页面）。
    

#### 

[](#jie-mian)

界面

*   图标库：您现在可以从约 7000 个图标的库中为您的设备选择图标。
    

#### 

[](#dai-li-xie-yi-xiang-guan)

代理协议相关

*   修复了 Snell V4 下复用功能无法正常工作的问题。
    
*   SSH 协议现在支持服务器公钥指纹 pinning，查看手册以获取使用方法。
    

#### 

[](#jiao-ben-1)

脚本

*   $httpClient 支持二进制模式。
    
    *   请求的 body 支持 TypedArray。
        
    *   在请求参数中传入 binary-mode: true 允许返回结果作为 TypedArray 返回。
        
    
*   修复了 `http-request` 类型脚本无法直接使用二进制数据作为响应的问题。
    

#### 

[](#qi-ta)

其他

*   策略组添加了参数 `external-policy-modifier`，可用于调整外部策略。
    
*   优化了请求日志系统
    
    *   在日志中添加了类别标记。
        
    *   规则系统为 DNS 和规则集添加了更多输出。
        
    
*   其他 bug 修复和优化。
    

https://dl.nssurge.com/mac/v5/Surge-5.1.0-2216-82115a08df678cfa87137a506f7df061.zip

### 

[](#ban-ben-5.0.3)

版本 5.0.3

*   为 VMess 协议添加了 UDP 中继支持
    
    *   由于 VMess 服务器端默认支持 UDP 转发，因此无需添加额外参数即可使用。
        
    *   由于 VMess 协议的设计缺陷，当使用 VMess 转发 UDP 流量时，P2P 场景可能无法工作，如语音通话、在线游戏等。因此，不建议使用 VMess 协议。
        
    
*   SSH 协议现在支持指定服务器的公钥指纹。查看手册获取更多信息。
    
*   现在通过 STUN 协议获取外部 IP 地址，不再依赖 api.my-ip.io。
    
*   DDNS 现在在选择 IPv6 时使用安全的 IPv6 地址而非临时地址。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.0.3-2199-c241935acf37b3ec7f7fa4f5120e8690.zip

### 

[](#ban-ben-5.0.2)

版本 5.0.2

*   由于 macOS 的新隐私限制，如果使用了与 Wi-Fi BSSID 相关的功能，Surge 将请求位置服务权限以读取 Wi-Fi BSSID。
    
*   现在支持 Shadow TLS v3。附加 `shadow-tls-version=3` 以启用它。
    
*   Surge Mac 现在支持 Adaptive TLS Fingerprint。有关更多信息，请查看社区线程。
    
*   支持了一个新参数 `external-policy-modifier`，用于修改外部策略的参数。
    
*   新的代理客户端通知只有在接收到真正的请求时才会提示，被端口扫描时将不再显示。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.0.2-2186-2ab1aba0dc49688683b2e4d43200e468.zip

### 

[](#ban-ben-5.0.1)

版本 5.0.1

*   当 Ponte 开关关闭时，现在可以查看已注册的 Ponte 设备视图。
    
*   修复了通过 USB 使用 Surge Dashboard 时的崩溃。
    
*   $httpClient 现在支持二进制模式。
    
*   Bug 修复。
    

https://dl.nssurge.com/mac/v5/Surge-5.0.1-2162-22743a4d2f1e0aeb0b872e8f544c2e69.zip