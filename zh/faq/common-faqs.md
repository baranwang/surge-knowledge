1.  [FAQ](/surge-knowledge-base/zh/faq)

Surge 常见问题
==========

[](#surge-ios-te-ding-chang-jian-wen-ti)

Surge iOS 特定常见问题


--------------------------------------------------------------

### 

[](#surge-ios-dian-liang-xiao-hao-de-shuo-ming)

Surge iOS 电量消耗的说明

Surge iOS 可能产生的电量消耗由两项组成：网络通讯（基带）电量消耗与 CPU 电量消耗。

#### 

[](#guan-yu-wang-luo-tong-xun-ji-dai-dian-liang-xiao-hao)

关于网络通讯（基带）电量消耗

当开启 Surge iOS 后，由于所有的应用的网络请求都由 Surge 所接管并转发，使得 iOS 统计时，将所有网络通讯所产生的电量消耗计算在 Surge 上，所以 Surge 的电量占用比例会很高。但实际上并未产生额外的电量消耗。

#### 

[](#guan-yu-cpu-dian-liang-xiao-hao)

关于 CPU 电量消耗

*   如果配置了加密的代理进行流量转发，由于进行转发时需要进行加解密运算，将产生额外的 CPU 电量消耗。一般来说该额外开销很低，基本可忽略不计，但是如果在长时间、高带宽的场景下，可能产生较大消耗，如 iCloud 同步、App Store 应用包下载等，但默认情况下这些操作系统通常是在连接电源时才会执行。
    
*   如果配置了 cron 类型脚本，且触发时间很频繁，可能因为不断唤醒 CPU 导致额外的电量消耗。
    

综上所说，持续开启 Surge iOS 对电量消耗的影响很小，据我们的测试，正常使用下 24 小时额外消耗不到 2%，不必担心。

部分用户会因为系统电耗统计中 Surge 所占用百分比很高而认为 Surge 非常耗电。请注意该统计中的百分比，指的是这段时间内的总电量消耗中 Surge 的占比，而非表示 Surge 消耗的剩余电量。由于 Surge NE 常驻后台，如果这段时间内没有几乎没有使用过设备，那即使 Surge 只消耗了极少的电量，也会被统计为 100%。

[](#surge-mac-te-ding-chang-jian-wen-ti)

Surge Mac 特定常见问题


--------------------------------------------------------------

### 

[](#wei-shen-me-tcp-qing-qiu-jin-neng-kan-dao-ip-wu-fa-kan-dao-yu-ming)

为什么 TCP 请求仅能看到 IP 无法看到域名

如果在 Dashboard 发现，所有 TCP 请求均以 IP 地址展示，不显示域名，则说明 Surge 未能成功劫持 DNS。详细原理请见：[《Surge 官方中文指引：理解 Surge 原理 》](https://manual.nssurge.com/book/understanding-surge/cn)

可能的原因和解决方法有：

*   首先请检查设备的 DNS 设置是否为 Surge 的专用 DNS 地址：198.18.0.2，Surge 开启增强模式时会自动修改当前设备的 DNS，DHCP 模式下会自动为客户端设备配置该 DNS。
    
*   部分操作系统或浏览器带有 DoH/DoT 或其他加密 DNS 协议支持，Surge 无法劫持此类 DNS 请求，请手动关闭该功能。
    
*   设备上装有其他会劫持系统 DNS 的软件。
    

### 

[](#qing-qiu-cha-kan-qi-zhong-bu-xian-shi-qing-qiu)

请求查看器中不显示请求

如果 Surge 请求查看器中不显示请求，可按照以下顺序进行排查：

1.  确认 Surge 已接管本地或另一设备的网络：
    

*   开启设置为系统代理选项可接管当前设备的大部分 HTTP/HTTPS 请求。
    
*   开启增强模式可接管当前设备的几乎所有请求。
    

可通过 Surge 主界面的客户端与进程列表确认接管是否成功，如果有项目说明接管成功。

1.  确认请求查看器的过滤器设置
    

在 Surge 主程序的截取页面中，可配置请求查看器截取过滤器参数，若该参数配置不当，可导致请求查看器不显示结果。

### 

[](#zhu-shou-cheng-xu-helper-yi-chang-chu-li-fang-shi)

助手程序（Helper）异常处理方式

如果 Surge Mac 助手程序（Helper）异常，会导致无法设置系统代理和无法开启增强模式。（使用 CleanMyMac 或其他清理软件强行清理可能导致该问题）

请参照以下步骤修复：

1.  打开 Surge Mac 的设置界面，选择系统权限总览，在助手程序中选择移除。
    
2.  输入你的系统登录密码。
    
3.  点击打开终端。
    
4.  在终端窗口处再次输入系统登录密码并回车。
    
5.  重启电脑。
    
6.  打开 Surge，尝试勾选设置为系统代理，输入系统密码重新安装助手程序。
    

由于 macOS 是开发性系统，导致该问题产生的原因可能非常复杂，如果仍然不能正常工作，可能需要尝试重置整个系统。

### 

[](#surge-mac-yu-vpn-yi-tong-shi-yong)

Surge Mac 与 VPN 一同使用

如果在 Surge 开启时同时连接了其他 VPN，可能会出现问题，请尝试关闭增强模式，如果开启增强模式需要配合自定义 direct 策略强制绑定 interface，详见手册。

如果出现了访问内网域名无法解析的问题，请：

1.  如果 VPN 正确配置了 Split DNS，那么只要由系统去进行 DNS 解析即可拿到正确结果。使用 本地 DNS 映射功能直接将内网的域名配置为 syslib 解析。
    

Copy

```
[Host]
*.internal.example.com = server:syslib
```

1.  请注意，server:syslib 参数在开启增强模式时无法生效，可使用本地 DNS 映射功能直接将内网的域名交给内网的 DNS 进行解析。
    

Copy

```
[Host]
*.internal.example.com = server:10.0.0.1
```

如果该域名本身也可以由外网访问，这样的配置可能引起问题。（可通过 DNS 脚本判断环境解决）

### 

[](#zeng-qiang-mo-shi-jian-rong-xing-wen-ti)

增强模式兼容性问题

Surge Mac 增强模式的原理是通过一个虚拟网卡接管所有流量。该工作模式下可能引发兼容性问题，表现可能有网速缓慢、Surge 被直接关闭、Surge 反应缓慢等，以下列出部分已知的可能产生冲突的程序。

*   AdGuard
    
*   Viscosity
    
*   Little Snitch
    

[](#surge-ios-yu-mac-tong-yong-chang-jian-wen-ti)

Surge iOS 与 Mac 通用常见问题


-----------------------------------------------------------------------------

### 

[](#guan-yu-skipproxy-can-shu-de-shuo-ming)

关于 skip-proxy 参数的说明

配置中的 skip-proxy 参数由于命名问题可能被部分用户错误理解，Surge iOS/Mac 只是在配置自身为系统代理时，将配置于 `skip-proxy` 参数中的内容同时配置到系统的「跳过代理」设置中。与手动在系统的网络代理中进行配置相同。

*   如果 Surge Mac 仅勾选了设置为系统代理，未开启增强模式，那么处于该参数中的主机名的请求将不会被 Surge 所接管，所有 Surge 的相关功能不会生效。
    
*   如果 Surge Mac 勾选了设置为系统代理，且开启了增强模式，或者是在 Surge iOS 上。那么该参数将使对应请求的接管模式由代理接管变为 Surge VIF 接管。Surge 的各项功能仍然生效但是会有细节上的区别。
    

所以，并非是配置在 `skip-proxy` 参数中的主机名就不会使用代理转发，该参数只影响请求被 Surge 接管的方式。

*   关于接管方式的不同的具体区别，请参见 [《Surge 官方中文指引：理解 Surge 原理 》](https://manual.nssurge.com/book/understanding-surge/cn/)。
    
*   部分 App 即使遵循系统代理设置，也可能忽略跳过代理中的内容，具体取决于应用的代理实现。
    

### 

[](#wei-shen-me-chang-shi-xiu-gai-she-zhi-shi-ti-shi-bu-ke-yi-jin-xing-xiu-gai)

为什么尝试修改设置时提示不可以进行修改？

如果你的配置来源于其他人，这种情况下配置可能会随着远程修改而自动更新（即托管配置）。

由于远程随时可能更新并覆盖本地的配置，所以这种情况下并不允许在本地对设置进行调整，以避免冲突。

如果希望在原有托管配置的基础上调整配置，可以

1.  创建该托管配置的副本，这将使得新配置脱离原配置的自动更新，从而可以随意进行编辑。
    
2.  以该配置为基础，创建关联配置（Linked Profile），仅从原配置中引用部分段（通常为 \[Proxy\] 和 \[Proxy Group\]），这样可以自己编辑其他段的相关配置。详见：[配置分离](/surge-knowledge-base/zh/guidelines/detached-profile)
    

### 

[](#wei-shen-me-surge-pin-fan-ti-shi-wang-luo-zhi-liang-cha)

为什么 Surge 频繁提示网络质量差？

简单来说，是当网络确实出现问题时才会给出该提示，此时网络处于几乎不可用的状态。

技术细节上，当 Surge 检查到 TCP 的握手时间超过 2000 ms，便会向当前配置的所有传统 DNS 发送一个 DNS 请求，若在 2000ms 内未收到应答，则判定当前网络质量差通过给于提示。

*   如果在网络确实没有问题的状态下频繁出现该提示，请检查 DNS 服务器配置是否合理（比如在中国大陆使用 8.8.8.8/8.8.4.4 和 1.1.1.1/1.0.0.1 极易无法联通）。
    
*   如果不希望收到该提示，可以前往 Surge 内的通知设置中单独关闭该通知。
    

### 

[](#wei-shen-me-surge-jin-xing-dai-li-zhuan-fa-shi-ping-bi-le-quic-liu-liang)

为什么 Surge 进行代理转发时屏蔽了 QUIC 流量？

默认情况下，Surge 会根据代理类型自动决定是否允许转发 QUIC/HTTP3 流量，因为绝大多数代理并不适合用于转发 QUIC 流量，会产生严重的性能问题。

几乎所有应用都具备在 QUIC 不可用时自动回退到 HTTPS 的机制，所以不用担心因为 QUIC-BLOCK 而导致某网站不可访问或 App 无法使用。

相比 HTTP/2，QUIC(HTTP/3)协议只有微弱的性能改善，同时由于两者都使用了 TLS/1.3 作为安全层，所以安全性几乎完全一致。而由不合适的代理转发导致的性能问题大幅超过了 HTTP/3 的改善，所以完全没有必要为了追求使用 HTTP/3 而放行 QUIC 流量。

如果因为开发与调试需要使用 QUIC，请在对应代理策略的设置中调整 QUIC Block 选项。

**为什么大部分代理协议不适合转发 QUIC 流量？** TCP 协议和 QUIC 协议都是可靠的传输协议，这表示他们在传输数据时，如果发现某数据包丢包，会自动将该数据包重传。

我们看一下在一个假设情形中，TCP-based 的代理中转 QUIC 会出现什么问题：

1.  发送数据段 A，该数据段被封装进了 QUIC 的 UDP 数据包 B，通过 TCP-based 的代理中转又被封装进了 TCP 数据包 C。
    
2.  网络出现抖动，C 包被丢包了。
    
3.  TCP 协议检查到丢包，重发 C‘2 包。
    
4.  QUIC 协议也检查到丢包，重发 B’2 包，B’2 包在 TCP 层看来是新的数据流，产生新的 TCP 数据包 D 包。
    

可以看到，本来单次丢包所导致的重发，在双重可靠传输协议的嵌套下，产生了双倍的重发包。这里举例的是一个最简单的情况，如果丢包情况严重，那么 QUIC 层将产生大量的重发包，而 TCP 层又要保证所有的 QUIC 层重发包都被送达（实际上他们包含的数据是一样的），TCP 层再产生大量的重发包，导致拥塞情况承指数级上升。

以上只提及了众多问题中的一个，还会有双倍的 ACK 包，拥塞算法失效的问题。

所以，应当尽量避免在 TCP-based 的代理上使用 QUIC。但是如果 TCP 代理本身线路情况良好，极少丢包，同时 QUIC 流量不大，那么用起来可能确实感受不到明显问题。但是实际上也产生了不必要的额外开销，性能远不如直接使用 TCP 层代理，所以除非是需要测试 QUIC 等开发者用途，请勿调整 block-quic 参数放行 QUIC 流量。

### 

[](#wei-shen-me-jin-xing-mitm-shi-ti-shi-mitm-failed)

为什么进行 MITM 时，提示 MITM Failed？

MITM 是用于解密 HTTPS 流量的工具，使用前应先了解 MITM 的基本原理。可参考 [Wikipedia](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)。

1.  首先应确保完成 CA 证书安装操作（iOS/tvOS/visionOS 中除了安装外还需要在系统设置中手动开启开关）
    
2.  在 Surge 中为特定主机名开启 MITM，如 example.com。
    
3.  打开 Surge 的 MITM 开关。
    
4.  使用浏览器访问 https://example.com/ 网站，观察是否可以解密出完整的 URL 和 HTTP 方法。
    

如果顺利，则表示 MITM 已正确配置并生效。

如果浏览器中的请求已经可以被正确解密，但是一些 App 的请求却显示 MITM Failed，则说明该 App 使用了 SSL Pinning 机制阻止 MITM，请自行搜索相关关键词了解详情（一般来说 SSL Pinning 无法突破，强行绕过需要非常复杂的 hack 技术，如在越狱设备中注入 dylib 覆盖相关验证代码。）

很多常见的应用，如系统进程发往 apple.com 与 icloud.com 的请求，Facebook，Instagram，X等等，都采用了 SSL Pinning 机制阻止 MITM。