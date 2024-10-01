Surge Mac 5.0
=============

自 2020 年 Surge Mac 4 发布以来，这 3 年里我们为 Surge Mac 4 提供了诸多重量级的免费更新，例如：

*   4.0.5 版本支持了 Cloud Notification，可以在 Surge iOS 上收到 Surge Mac 的状态提醒推送。
    
*   4.1.0 版本提供了脚本的 UI 编辑支持，支持了分离配置文件，支持了 HTTPS-API，支持了 SUBNET 规则。
    
*   4.2.0 版本内建了 Web Dashboard。
    
*   4.2.1 版本支持了 Surge Private DDNS 与外部 IP 地址查询。
    
*   4.3.0 版本支持了使用 Dashboard 远程管理设备，加入了流量的历史记录查看。
    
*   4.4.0 版本支持了将 WireGuard 当做一个一般代理策略使用。
    
*   4.5.0 版本全面加强了策略组的嵌套，支持各种复杂的相互引用。
    
*   4.6.0 版本加入将 SSH 作为一般代理策略的支持。
    
*   4.7.0 版本支持了使用 HTTP/2 进行 MITM。
    
*   4.8.0 支持了 DNS over QUIC 和 DNS over HTTP/3。
    
*   4.9.0 Surge VIF 开始支持处理 IPv6 流量。
    
*   4.10.0 加入了 Snell V4、TUIC、ShadowTLS 等协议的支持。
    

现在，我们决定迈入 5.0 版本。

[](#xin-gong-neng)

新功能


---------------------------

### 

[](#surge-ponte)

Surge Ponte

Surge Ponte 是一种在运行 Surge Mac 和 iOS 设备之间的私有 mesh 网络。

*   无需繁琐配置，只需按向导进行一次性开启。
    
*   Surge 会自动选择最合适的通道建立连接，包括 LAN 连接、NAT 穿透、代理转发。
    
*   始终使用端到端加密。
    
*   设备信息和加密密钥通过您的 iCloud 同步，没有任何数据流经我方的服务器，实现完全的数据隔离。
    

关于 Surge Ponte 的详细配置说明请见：[Surge Ponte 指引](/surge-knowledge-base/zh/guidelines/ponte)

### 

[](#xin-de-surge-vif-mo-shi-yin-qing)

新的 Surge VIF 模式引擎

在 Surge Mac 5.0 中，Surge VIF 使用了全新的工作方式，大幅减少了用户态与内核态切换的开销，使得增强模式和网关模式的性能大幅提升。即使是在 Intel Core i5 处理器的 MacBook Air 上，回环网络性能也可到达 ~8Gbps，而在 M2 处理器上可达 ~30Gbps。

这不仅意味着 Surge Mac 能完全承载 10GbE 网络，同时也意味着即使在低带宽占用时，CPU 电量消耗也会更低。

![](https://kb.nssurge.com/~gitbook/image?url=https%3A%2F%2F3176820532-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FnRjbzkErvUl5IX5jdskH%252Fuploads%252Fgit-blob-1e14a3faf07a119b16c9d3c0f82f894ae5d7bb05%252Fmac-v5-iperf.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=774c3dad&sv=1)

注：新的引擎可能产生兼容性问题，如有遇到请反馈，可配置 `legacy-vif=true` 参数使用旧引擎。

### 

[](#xin-de-fu-wu-zong-lan-shi-tu)

新的服务总览视图

![](https://kb.nssurge.com/~gitbook/image?url=https%3A%2F%2F3176820532-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FnRjbzkErvUl5IX5jdskH%252Fuploads%252Fgit-blob-1893aa4aca5daa31bdc23bbef2a16981cbf1a3fd%252Fmac-v5-overview2.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=a726f940&sv=1)

新的服务总览视图可轻松查看 Surge 各项服务的状态，并进行控制。

### 

[](#xin-de-vector-xie-yi)

新的 Vector 协议

为了满足 Surge Ponte 的需要，我们研发了一个全新的基于 QUIC/UDP 的代理协议：Vector。目前暂时仅支持以 Surge Mac 5.0 作为 Vector 服务端，在未来我们会推出适用于其他操作系统的独立二进制服务端程序。

### 

[](#dai-li-zhen-duan-gong-ju)

代理诊断工具

新加入了一个代理策略诊断窗口，可在菜单栏 › 窗口 › 代理诊断中打开，可使用该工具测试代理是否正常，以及测试代理的 UDP NAT 类型。另外，该工具可直接测试外置策略组中的代理。

### 

[](#xi-jie-you-hua)

细节优化

大版本的升级意味着我们会对内部的各种陈旧代码进行重构，重新检查每一项功能是否工作正确，有诸多潜藏已久的小问题会在这个过程中得到修正。（Surge Mac 4 同样会收到一次 Bug 修正更新）

另外一些其他构思和开发中的想法暂未发布，我们会根据开发进度逐步发布，或推迟至之后的小更新中。

### 

[](#geng-duo)

更多

Surge Mac 5.0 只是一个新的开始，正如 v4 版本一样，在后续的更新中我们还会带来更多免费的新功能。如果您对现在的新功能还不够满意，可以等之后再升级。

### 

[](#xi-jie-geng-xin)

细节更新

*   子网设置功能现在可以通过 UI 配置了。
    
*   策略组编辑页面重做，支持所有高级功能的 UI 配置。
    
*   模块可以自动更新了。
    
*   DHCP 可设置为将 Surge 自动作为新设备的网关。
    
*   快速规则配置功能支持的浏览器新增：Arc, Safari Technology Preview, Chrome Beta/Dev/Canary, Edge Beta/Dev/Canary。
    
*   脚本编辑器现在是独立的窗口，不再阻挡主窗口。
    
*   新增 `DEVICE-NAME` 规则，可用于匹配 Ponte 设备或者 DHCP 设备访问。
    
*   引入了 `FAILED` 内置策略用于在特殊情况下标记请求失败（如策略组无法加载，Ponte 功能未开启），而不是使用 REJECT。
    
*   SOCKS5 代理请求类型显示时修改为 TCP，可在 Notes 中确认是由 SOCKS5 代理接管。Vector 请求也一样。
    
*   支持在 `[Host]` 中为域名配置 DNS over QUIC/H3 服务器。
    

[](#geng-xin-shou-fei-ce-le)

更新收费策略


----------------------------------------

*   自 2022 年 10 月 15 日起购买 Surge Mac v4 的用户，可免费更新至 Surge Mac 5。
    
*   2022 年 4 月 15 日 至 2022 年 10 月 14 日之间购买的用户，按照购买时间先后，最低只要 $1.99 即可升级。
    
*   2022 年 4 月 15 日以前购买的用户，升级价格为
    
    *   1 设备授权：$34.99
        
    *   3 设备授权：$48.99
        
    *   5 设备授权：$69.99
        
    

可访问 [https://nssurge.com/buy\_now?upgrade=true](https://nssurge.com/buy_now?upgrade=true) 查看具体价格和升级选项。

[](#geng-xin-fang-shi)

更新方式


--------------------------------

即日起，可以手动下载更新开始使用 Surge Mac 5.0，下载链接：[https://dl.nssurge.com/mac/v5/Surge-latest.zip](https://dl.nssurge.com/mac/v5/Surge-latest.zip)

Surge Mac v4 用户将在几日后收到自动更新提示。

可免费升级的用户以及新购的用户授权已自动升级至 v5。

[](#chang-jian-wen-ti)

常见问题


--------------------------------

### 

[](#ru-guo-ceng-jing-sheng-ji-guo-shou-quan-ru-cong-1-she-bei-sheng-ji-dao-le-3-she-bei-na-me-zen-me-ji)

如果曾经升级过授权（如从 1 设备升级到了 3 设备），那么怎么计算呢？

将按照订单金额和时间，进行加权平均，比如在 2021/7/27 日购买了 1 设备授权，然后在 2022/8/23 日升级到了 3 设备授权，那么等价购买时间为 2021/12/20。

`(1532649600 * 49.99 + 1566518400 * 29.99) / (49.99 + 29.99) = 1545349341`

### 

[](#sheng-ji-zhi-hou-hai-ke-yi-ji-xu-shi-yong-jiu-ban-ben-ma)

升级之后还可以继续使用旧版本吗？

可以，但是设备数量限制是共享的。

### 

[](#ru-guo-xiang-tong-shi-sheng-ji-shou-quan-she-bei-shu-liang-ne)

如果想同时升级授权设备数量呢？

如果是从 v3/v4 授权升级，可以在升级时同时升级授权数量，该价格比先升级到 v4 再升级数量优惠 $10。

### 

[](#wo-xian-zai-yong-you-de-shou-quan-shi-v2-ban-ben-ke-yi-you-hui-sheng-ji-ma)

我现在拥有的授权是 v2版本，可以优惠升级吗？

v2 版本授权已不享受升级折扣，请直接重新购买。

### 

[](#ru-guo-bu-xiang-sheng-ji-ne)

如果不想升级呢？

可以永久继续使用 Surge Mac 4，转入维护状态。