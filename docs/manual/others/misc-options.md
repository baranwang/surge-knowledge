Miscellaneous Options in \[General\] Section
============================================

As the options change frequently, you may look up the most up-to-date explanation for the \[General\] section options within the app.

*   Surge Mac: Main Window Menu -> Help -> Profile Syntax
*   Surge iOS: More Tab -> Help -> Profile Syntax

### loglevel

Log level. One of verbose, info, notify, or warning. It's not recommended to enable verbose in daily use because this slows down the performance significantly.

### ipv6

Enable full IPv6 support. Specifically, after enabling this option, the AAAA record of the domain name will be queried when accessing the domain name. Even if this option is not enabled, you can access IPv6 sites by directly accessing the IPv6 address.

### ipv6-vif

Allow the IPv6 through Surge VIF. Useful when you want Surge to handle raw TCP connections connecting to IPv6 addresses.

*   `off`: Never set up the Surge VIF with IPv6.
*   `auto`: Only set up the Surge VIF with IPv6 if the local network has a valid IPv6 network.
*   `always`: Always set up the Surge VIF with IPv6.

### dns-server

The IP addresses of upstream DNS servers.

### skip-proxy

In the iOS version, this option forces connection to these domain/IP ranges to be handled by Surge VIF instead of Surge proxy. In the macOS version, these settings are applied to the system when "Set as System Proxy" is enabled. This option is used to fix compatibility problems with some apps.

*   To specify a single domain, enter the domain name - for example, apple.com.
    
*   To specify all websites on a domain, use an asterisk before the domain name - for example, \*apple.com.
    
*   To specify a specific part of a domain, specify each part - for example, store.apple.com.
    
*   To specify hosts or networks by IP addresses, enter a specific IP address such as 192.168.2.11 or an address range, such as 192.168.2.\* or 192.168.2.0/24.
    

Notice: If you enter an IP address or address range, you are only able to bypass the proxy when you connect to that host using that address, not when you connect to the host by a domain name that resolves to that address.

### exclude-simple-hostnames

Just like the skip-proxy parameter. This option lets requests use simple hostnames (without dot) handled by Surge VIF instead of Surge proxy.

### external-controller-access

This option allows an external controller to control Surge, such as Surge Dashboard (macOS) and Surge iOS Remote Controller (iOS). E.g.: key@0.0.0.0:6165

### http-api

This option allows using HTTP APIs to control Surge. E.g.: key@0.0.0.0:6166

### http-api-tls

Use HTTPS protocol instead of HTTP. The MitM CA certificate must be configured first. You need to install the certificate on the client's device manually.

### http-api-web-dashboard

You may control Surge via a web browser after enabling this.

### show-error-page-for-reject

Show an error webpage for the REJECT policy if the request is a plain HTTP request.

### tun-excluded-routes

Surge VIF can only process TCP and UDP protocols. Use this option to bypass specific IP ranges to allow all traffic to pass through.

Notice: This option only works for Surge VIF. Requests handled by Surge Proxy Server aren't affected. Combine `skip-proxy` and `tun-excluded-routes` to make sure that specific HTTP traffic bypasses Surge.

### tun-included-routes

By default, Surge VIF interface declares itself as the default route. However, since the Wi-Fi interface has a smaller route, some traffic may not go through Surge VIF interface. Use this option to add a smaller route.

### internet-test-url

The URL for the Internet connectivity testing. Also, the testing URL for DIRECT policy.

### proxy-test-url

The default testing URL for proxy policies.

### test-timeout

The connectivity testing timeout.

### always-real-ip

This option asks Surge to return a real IP address instead of a fake IP address when Surge VIF handles a DNS question.

The DNS packet will be forwarded to upstream DNS servers.

This parameter is of the Host List type, for detailed rules see: [Host List Parameter Type](host-list.html)

### hijack-dns

By default, Surge only returns fake IP addresses for DNS queries sent to Surge DNS address (198.18.0.2). Queries sent to a standard DNS will be forwarded.

Some devices or software always use a hardcoded DNS server. (For example, Google Speakers always use 8.8.8.8). You may use this option to hijack the query to get a fake address.

You may use `hijack-dns = \*:53` to hijack all DNS queries.

### force-http-engine-hosts

Make Surge treat TCP connections as HTTP requests. Surge HTTP engine will process the requests, and all advanced features will be available, such as capturing, rewriting and scripting.

This parameter is of the Host List type, for detailed rules see: [Host List Parameter Type](host-list.html)

### encrypted-dns-follow-outbound-mode

By default, the encrypted DNS lookup uses the direct outbound. Enabling the option makes the DOH follow the outbound mode settings and rules.

### encrypted-dns-server

The URLs of the encrypted DNS servers. If encrypted DNS is configured, the traditional DNS will only be used to test the connectivity and resolve the domain in the encrypted DNS URL.

Supported Protocol:

*   DNS over HTTPS: `https://example.com`
*   DNS over HTTP/3: `h3://example.com`
*   DNS over QUIC: `quic://example.com`

### encrypted-dns-skip-cert-verification

Skip the encrypted DNS server certificate verification, which is insecure.

### use-local-host-item-for-proxy

By default, DNS lookup is always performed on the remote server if a proxy policy is used. After enabling this option, Surge uses the IP address instead of the domain to set up the proxy connection if the local DNS mapping result of the target domain exists.

### geoip-maxmind-url

The URL of the GeoIP database for updating.

### disable-geoip-db-auto-update

Disable the auto-updating for the GeoIP database.

### allow-dns-svcb

iOS system might perform an SVCB record DNS lookup instead of a standard A record lookup. This causes Surge to fail to return a virtual IP address. So by default, the SVCB record lookup is forbidden to force the system to perform an A record lookup.

### udp-policy-not-supported-behaviour

The fallback behavior when UDP traffic matches a policy that doesn't support the UDP relay. Possible values: `DIRECT`, `REJECT`.

### proxy-test-udp

The default UDP test parameter for proxies. E.g.: `apple.com@8.8.8.8`

### udp-priority

Enabled will prioritize UDP packets when system load is very high and packet processing is delayed. Also known as game mode.

### always-raw-tcp-hosts iOS 5.8.0+ Mac 5.4.0+

Surge will automatically sniff the protocol for TCP requests sent to ports 80 and 443, enabling advanced HTTP/HTTPS features while optimizing performance. However, this may cause some compatibility issues. If you encounter problems, you can add the hostname here, and Surge will not sniff these requests' protocols.

This parameter is of the Host List type, for detailed rules see: [Host List Parameter Type](host-list.html)

### proxy-restricted-to-lan iOS 5.13.1+ Mac 5.8.1+

### gateway-restricted-to-lan iOS 5.13.1+ Mac 5.8.1+

It has been found that some users, due to a lack of understanding of network security knowledge, accidentally expose proxy and gateway services to the Internet (e.g., configured DMZ). Therefore, these two parameters have been added to restrict proxy and gateway services to only accept devices from the current subnet. These two parameters are enabled by default.

Surge iOS Only Parameters
-------------------------

### compatibility-mode

### allow-wifi-access

Allow Surge proxy services access from other devices in the LAN.

### wifi-access-http-port

The port number of Surge HTTP proxy service.

### wifi-access-socks5-port

The port number of Surge SOCKS5 proxy service.

### wifi-access-http-auth

Require authentication for Surge HTTP proxy service. E.g.: username:password

### wifi-assist

Enable Wi-Fi assist.

### hide-vpn-icon

Hide the VPN icon in the status bar.

### all-hybrid

Instead of setting up connections with cellular data when the Wi-Fi network is poor, always set up connections with Wi-Fi and cellular data simultaneously.

This option can improve the network experience significantly on a poor Wi-Fi or when the Wi-Fi network is switching.

This feature will apply to all TCP connections and DNS lookups. Only enable it if you have an unlimited cellular data plan.

### allow-hotspot-access

Allow Surge proxy services access from other devices while Personal Hotspot is on.

### include-all-networks

By default, some requests might not be taken over by Surge. For example, apps can bind to the physical network interface to bypass Surge VIF. Enabling the Include All Networks option to make sure all requests are handled by Surge without leaking. This option is useful when you use Surge as a firewall. (Requires iOS 14.0 or above)

Enabling this option may cause AirDrop and Xcode debugging issues, Surge Dashboard via USB not working, and other unexpected side effects. Use with caution.

### include-local-networks

Enable this option to make Surge VIF handle requests sent to LAN. (Requires iOS 14.2 or above)

Enabling this option may cause AirDrop and Xcode debugging issues, Surge Dashboard via USB not working, and other unexpected side effects. Use with caution.

Must be used in conjunction with `include-all-networks=true`.

### include-apns

Enable this option to make Surge VIF handle network traffic for the Apple Push Notification service (APNs).

Must be used in conjunction with `include-all-networks=true`.

### include-cellular-services

Enable this option to make Surge VIF handle internet-routable network traffic for cellular services. (VoLTE, Wi-Fi Calling, IMS, MMS, Visual Voicemail, etc.)

Note that some cellular carriers route cellular services traffic directly to the carrier network, bypassing the internet. Such cellular services traffic is always excluded from the tunnel.

Must be used in conjunction with `include-all-networks=true`.

### compatibility-mode

This option is used to control the working mode of Surge iOS.

*   0: Auto, in versions of Surge iOS prior to 5.8.0 this is equivalent to 1, from 5.8.0 it is equivalent to 3.
*   1: Proxy Takeover + VIF, under this mode, proxy takeover has higher priority than VIF takeover, offering the best performance, but some apps may check for proxy settings and refuse to work.
*   2: Proxy Takeover Only
*   3: VIF Takeover Only: The default working mode of the latest version.
*   4: Proxy Takeover + VIF, but the proxy uses the VIF address instead of the loopback address.
*   5: VIF Takeover Only, but the VIF routing uses multiple smaller routes for takeover, does not configure a default route, can be used to bypass some special issues. (e.g., HomeKit Security Camera)

Surge Mac Only Parameters
-------------------------

### use-default-policy-if-wifi-not-primary

If disabled, SSID/BSSID patterns can still match even when Wi-Fi is not the primary network interface.

### read-etc-hosts

Follow local DNS mapping items in /etc/hosts.

### http-listen

The HTTP proxy service listen parameter. E.g.: `0.0.0.0:6152`

### socks5-listen

The SOCKS5 proxy service listen parameter. E.g.: `0.0.0.0:6153`

### debug-cpu-usage

Enable CPU debug mode. This may slow down the performance.

### debug-memory-usage

Enable memory debug mode. This may slow down the performance.

### vif-mode

*   `auto`: Let Surge automatically select the most suitable working mode.
*   `v1`: Traditional mode, the TCP protocol stack is entirely managed by Surge. Since Surge runs in user space, this means that each packet needs to be transferred from kernel space to user space for processing.
*   `v2`: Introduced in version 5.0, it uses the Packet Filter mechanism in macOS, taking advantage of macOS's TCP protocol stack, thereby avoiding the overhead of switching between kernel space and user space, resulting in a significant performance improvement. However, because it requires modifying pf settings, it is incompatible with virtual machine networking and the network sharing feature.
*   `v3`: Introduced in version 5.2, it circumvents Packet Filter and employs another technique to use macOS's TCP protocol stack. The performance is slightly lower than v2, but it avoids compatibility issues caused by adjusting pf settings.