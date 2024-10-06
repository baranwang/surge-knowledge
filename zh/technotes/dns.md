DNS 的本地与代理解析
============

我们经常接到用户请求支持配置分地区 DNS 解析功能 (Split DNS)，这种功能功能往往是无必要的。

Surge 只有在这两个环节会触发本地的 DNS 解析：

1.  在规则判定时
    

在进行规则判定时，Surge 自上往下依次尝试匹配每条规则，如果遇到了一条 IP 类型的规则（包含 IP-CIDR, IP-CIDR6, GEOIP, ASN 等规则），且该规则没有 no-resolve 参数修饰，那么 Surge 将进行 DNS 解析后再进行匹配。

1.  使用 DIRECT 策略时
    

若某请求使用了 DIRECT 策略，则会触发 DNS 解析。

也就是说，若在遇到需要触发 DNS 的规则前就已经完成匹配，且策略并非 DIRECT，则不需要在本地进行 DNS 解析。

而当使用代理策略时，除非配置了 `use-local-host-item-for-proxy` 参数，Surge 总是会使用域名向代理服务器发起请求，也就是说 DNS 解析永远在代理服务器进行。

这是最合理且高效的工作流，一方面省去了在本地进行 DNS 的不必要开销，另一方面在本地进行 DNS 的结果并不一定适合代理服务器使用。

为了使该工作流达到最优，应该遵循以下原则撰写规则：

1.  将需要进行 DNS 解析的规则放在最后，避免提前触发不必要的 DNS 解析。
    
2.  若某些域名在本地完全不能解析，应增加 `DOMAIN` 类型规则直接指定代理策略，避免在本地触发 DNS。
    
3.  若 FINAL 规则使用了代理策略，可为 `FINAL` 规则配置 `dns-failed` 参数修饰，这样当本地 DNS 解析失败时，也可将请求转至代理服务器。