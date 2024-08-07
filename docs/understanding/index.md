Official Guidance：Understanding Surge
=====================================

_Surge Networks Inc._

_2020-08-27_

Chapter 1 Overview
==================

Surge is a networking tool on iOS and macOS platforms with four core capabilities.

*   Takeover: You can take over the network connection sent by the device. Surge supports both proxy service and virtual NIC takeover.
    
*   Processing: You can modify the network requests and responses that have been taken over. This includes URL redirection, local file mapping, custom modification using JavaScript, and many other methods.
    
*   Forwarding: You can forward the taken over network requests to other proxy servers. This can be global forwarding or with a flexible rule system to determine an outbound policy.
    
*   Intercept: You can intercept and save specific data of network requests and responses, and you can also decrypt HTTPS traffic with MITM.
    

These four capabilities form the core workflow of Surge. But Surge’s skills are not limited to these four points. For example, you can customize DNS servers, configure DNS-over-HTTPS globally, and so on.

Chapter 2 Takeover
==================

In order for Surge to perform subsequent functions such as forwarding, modifying, and intercepting, it is first necessary for Surge to take over the network connection.

Under macOS and iOS, there are three ways to have a network connection issued by a program taken over by another program, rather than sending data directly to a physical network card.

1.  Proxy

If the system is configured with a proxy server, the program will not directly connect to the target server when executing a network request, but will instead generate a connection to the proxy server. Using this feature, it is possible to take over network requests by starting a local proxy service and configuring the system proxy on 127.0.0.1.

However, this approach requires the program itself to support the proxy mechanism. The system’s proxy settings simply inform the program that it should use the proxy, requiring the program to complete the subsequent logic of the proxy itself. The good news is that for the vast majority of applications with a user interface, the developer does not need to do any additional work to support proxies because the system’s high-level networking framework (Cocoa/Cocoa Touch) is used during development.

As for command-line applications, since they use the POSIX interface to make network requests, the interface does not provide embedded support for proxy, so the developers have to support the proxy server by themselves, which leads to inconsistency in the support for the proxy and the specific behavior of various command-line applications. Also, since most command-line programs do not have special handling for macOS, they ignore the proxy server settings in the system configuration. Most command-line programs need to configure the proxy through the environment variables https\_proxy and http\_proxy, while others need to set it by modifying the configuration file.

There are also a small number of applications that cannot be taken over in this way due to a complete lack of proxy server support.

2.  Virtual Network Interface (VIF)

Almost all mainstream operating systems have TUN and TAP virtual network interfaces, which were originally designed to provide VPN support. By creating a virtual NIC on the system and configuring the global routing table, all network requests can be taken over.

This method is not visible to the application, so there is no need for the application to support it actively, and almost any application can be taken over in this way. Unless the application explicitly specifies a physical NIC, bypassing the default virtual NIC.

3.  Socket Filter

This is a kernel feature of macOS that can take over requests by injecting a Kernel Extension (kext) to hook all socket calls.

This can be used to force all network requests to be taken over by all programs on the system, except for some of the system itself. Proxifier and Little Snitch, for example, use this method to take over the network.

There are advantages and disadvantages to each of the three methods.

Method 1 has the best performance and is the least intrusive to the system, but is not supported by some applications. 2.

Method 2 has slightly lower performance because the intercepted traffic is IP-layer packets that require a TCP stack to be reassembled, resulting in additional performance overhead.

Method 2 is the most intrusive to the system. The Kernel Extension may cause system-wide instability, and Apple has confirmed that the support for Socket Filter will be removed in future macOS.

Surge mainly uses method 1 to take over network requests. Method 2 supplements this by taking over applications that do not support proxies.

*   For Surge iOS, when started, it registers itself as a proxy server, and a TUN virtual network card is established using the Network Extension API.
    
*   For Surge Mac, enabling the “Set as System Agent” option will register itself as a proxy server (Method 1), and enabling the “Enhanced Mode” option will create a virtual network card (Method 2).
    

The above description is for the Surge takeover of a local program. When using Surge to take over a network request from another device.

*   Due to the system limitations of iOS, you can only rely on using method 1 as a proxy server to take over requests from another device. (Modify the target device’s proxy server settings)
    
*   Surge Mac in addition to using method 1, you can also rely on method 2 to take over a request from another device. (Modify the default route settings for the target device)
    

2.1 Proxy service takeover (Method 1)
-------------------------------------

### 2.1.1 What is a proxy protocol?

A proxy is a mechanism that has been around since the dawn of computer networks. A proxy server is a messenger that relays data between an application and a target server.

![](Proxy_concept_en.png)

When using a proxy server, some additional work is required in addition to sending the raw data.

1.  Inform the proxy server, the hostname and port number of the target server.
    
2.  Send authentication information for proxy server authentication. (optional)
    
3.  Encryption of data transmissions. (optional)
    

The only two proxy protocols with RFC specifications are HTTP proxy and SOCKS proxy. SOCKS protocol has 3 versions: v4, v4a and v5. (SOCKS5 is used by macOS)

In addition to proxy protocols with RFC specifications, there are many custom proxy protocols, such as shadowsocks, Snell, etc. However, since systems and applications do not have built-in support for these protocols, they need to be converted to standard HTTP or SOCKS5 proxy services by a client application for use by applications and systems. Surge can also act as such a converter, providing proxy services to systems and applications with HTTP proxy and SOCKS5 proxy protocols.

_The HTTPS and SOCKS-TLS proxies do not have an RFC specification but are encrypted with a TLS layer over the original protocol._

### 2.1.2 HTTP Proxy and TCP Proxy

The HTTP proxy can only forward HTTP protocol requests (unless the HTTP proxy additionally supports the CONNECT method). When an HTTP proxy is used, a full HTTP request is sent to the HTTP proxy, the proxy server receives the request, forwards it, gets the HTTP response, and forwards it to the client. Therefore, the HTTP proxy is session-based, and a single HTTP proxy connection can keep forwarding different HTTP requests, and these HTTP requests may not even be to the same target host.

All other proxy protocols are TCP dataflow proxies, which simply relay TCP dataflow, which means that the proxy doesn’t care about or understand exactly what is being delivered.

Note that the traditional HTTP proxy is not available when we are connecting to the target server using HTTPS protocol, and we do not want the proxy to be aware of what is being forwarded, so the plaintext of what is being passed is not visible to the proxy. For this reason, the HTTP proxy protocol adds the CONNECT method, which turns an HTTP proxy into a TCP dataflow proxy for handling HTTPS requests. So now, the HTTP proxy can also be used to forward any TCP protocol.

### 2.1.3 Exclude simple hostnames and bypass proxy settings for these hosts

In the macOS network settings, there are options to “Exclude simple hostnames” and “Bypass proxy settings for these hosts and domains”, which, like the proxy settings itself, only “inform” the application that it should behave in this way.

As with the proxy implementation, most applications with a user interface automatically support these two options because they are developed using the system’s high-level web framework (Cocoa/Cocoa Touch). Almost all command-line applications do not support these two settings.

The exclude-simple-hostnames and skip-proxy settings in Surge’s \[General\] configuration correspond to these two options, which will be applied to the system when “Set as system proxy” is checked.

Note that if both method 1 and method 2 are started at the same time, network connections excluded by these two settings will also be taken over by method 2. (On Surge Macs, it does work if Enhanced Mode is not turned on)

2.2 Virtual NIC takeover (Method 2)
-----------------------------------

### 2.2.1 Fake IP

Under the POSIX specification, making network requests require DNS resolution through gethostbyname and similar methods, and then connect to the acquired IP address, causing a problem when using Method 2 to take over the request: DNS resolution must be performed first.

However, if the network request Surge decides to pass it to a proxy server for forwarding, a local DNS lookup is meaningless, and in some cases, the domain name may not be resolved locally at all.

To solve this problem, when Surge’s VIF receives a DNS query, it does not perform a real DNS query but returns a fake IP address (usually 198.18.x.x, the address block which is not used on the public network). When a TCP or UDP packet sent to the fake IP is received later, the fake IP is translated back to the original domain name for further processing.

The TTL (Time to live, which can be roughly interpreted as expiry date) of the DNS response returned by Surge is only 1 second, so the result is thrown as soon as you use it, you don’t have to worry about network anomalies after Surge shutdown due to fake IP. (However, it has been observed that some smart hardware does not follow TTL correctly and re-do DNS lookup, which can be solved by rebooting the device usually.)

In earlier versions of Surge, it was prudent to only return fake IPs for hostnames marked as force-remote-dns in the rules, but since this option was often a nuisance to users, it has now been removed, and fake IP addresses are returned for all hostnames. The always-real-ip option in Configure \[General\] is used to override this behavior, and Surge does not return fake IP for hostnames that appear in this option, instead forwards the DNS query to a DNS server for a real IP address.

### 2.2.2 tun-excluded-routes and tun-included-routes options

When creating a virtual NIC, Surge will add additional routing tables based on these two options, tun-excluded-routes is easier to understand, some users may ask why there is a tun-included-routes option, shouldn’t all routes be included by default?

For mainstream operating systems, the priority of routing table entries is determined by the subnet coverage of the entry. The smaller the coverage, the higher the priority of the routing table entry, not in a sequential or top-down order.

So even if Surge’s VIF is configured with a default routing table entry of 0.0.0.0/0, the physical NIC itself has a routing table entry for the current subnet (e.g., 192.168.1.0/24), which has a higher priority with a small coverage. So all network connections sent to 192.168.1.x will still not be picked up by Surge. If tun-included-routes = 192.168.1.100/32 is configured, then this routing table entry has the highest priority for the smallest coverage, allowing network connections to that IP to be picked up by Surge as well.

Chapter 3 Processing
====================

Before the connections can be processed, the network connections first need to be classified, and there are four main types in the current version of Surge.

1.  HTTP Connection: A connection taken over by the Surge HTTP proxy service. The Dashboard displays the full URL and HTTP method name of the request (GET, POST, HEAD, PUT, DELETE, TRACE, OPTIONS, etc.)
2.  HTTPS connection: A connection that is taken over by the Surge HTTP proxy service and is converted to a TCP stream using the CONNECT method. The target hostname and port number of the request are displayed in the Dashboard, and the method is shown as HTTPS.
3.  TCP connection: A TCP connection taken over by Surge VIF or Surge SOCKS5 proxy service. In the Dashboard, the target hostname and port number of the request are displayed, and the methods are displayed as TCP and SOCKS.
4.  UDP Sessions: UDP packets hosted by the Surge VIF and sent to the same address and port number form a UDP session.

For Type 1 connections, requests can be modified, forwarded, and fetched using Surge’s capabilities. For Type 2 connections, after decryption using MITM, they are exposed as a standard HTTP connections. Full capabilities are also available. For Type 3 connections, generally, only forwarding is possible.

3.1 Distinguishing requests
---------------------------

### 3.1.1 HTTP

Type 3 connections mentioned above may also be an HTTP connection, but since Surge does not have a way to accurately identify it, it does not actively use the HTTP engine to process it, or the connection may be broken due to inability to process it.

Some users have suggested that packet identification can be done to automatically determine the specific protocol, but Surge is not designed to do this for two reasons.

1.  Although most TCP-based protocols the first packet is sent from the client side, this is not required by the TCP standard. For a few protocols, such as Telent, the first packet is sent from the server side.

If Surge wants to determine whether the connection is HTTP by identifying the packet, it must wait for the client to send the first packet, which will result in the client waiting if the server should send the packet first. (This can be handled by adding a wait timeout, but it’s inelegant.)

2.  There are custom protocols that send out packets with HTTP request headers, but the subsequent data does not follow the HTTP specification, which is perfectly acceptable by TCP standards but will cause an exception if it is handled by the Surge HTTP engine.

So, Surge gives the choice to the user by providing the force-http-engine-hosts parameter, which forces the HTTP engine to process any hostname that appears in the parameter, even if it is a Type 3 connection taken over by Surge VIF or Surge SOCKS5. All HTTP advanced features can be enabled. However, if the connection is not a connection using the HTTP protocol, it will cause the connection broken.

In addition, if Surge finds an HTTP request header or response header in a TCP connection, it makes a note of “HTTP request header found in the raw TCP connection.” and “HTTP response header found in the raw TCP connection.”, and extracts the request and response headers for simple analysis. Please note that this function only analyzes the first packet of the TCP stream in both directions, and since the HTTP protocol usually multiplexes TCP connections, subsequent HTTP requests are not visible to this function.

### 3.1.2 HTTPS

A connection taken over by the HTTP proxy service using the CONNECT method is determined by Surge to be an HTTPS connection, but it may also be a TCP connection other than HTTPS.

Therefore, by default, Surge only simply forwards TCP streams for such connections. If the target hostname is in the hostname configuration of \[MITM\], Surge will perform HTTPS decryption.

#### 3.1.2.1 MITM Decryption for TCP Connections

When the tcp-connection option in the \[MITM\] segment of the configuration is turned on, if the hostname of a Type 3 connection appears in the hostname configuration of \[MITM\], Surge also performs HTTPS decryption and passes it to the HTTP engine for processing, enabling all HTTP advanced features.

However, if the connection is not HTTPS, it will cause the connection broken.

3.2 Modifying Requests and Responses
------------------------------------

All of Surge’s modifying capabilities are designed for the HTTP protocol. Unencrypted HTTPS connections and TCP connections will skip this step.

The current modifying capabilities offered by Surge include:

*   Redirection (URL Rewrite, Map Remote)
*   Local document mapping (Map Local, API Mock)
*   Request Header and Response Header Revision (Header Rewrite)
*   JavaScript script modification

Among them, script modification is the most powerful, and all other capabilities can be achieved indirectly through scripts. However, since scripting is tedious and requires a bit more cost at runtime, simple requirements should be implemented in other ways.

### 3.2.1 Redirects (URL Rewrite, Map Remote)

Surge provides two implementations of HTTP redirection.

1.  Request header modification: This is achieved by directly modifying the contents of the request header. The client program is not aware of this redirect. In order to ensure correct behavior after the redirect, Surge automatically overwrites the Host field of the request header with the hostname portion of the URL after the URL is modified. This behavior is not performed when the redirect is performed by a script.
    
2.  Return 302, 307 Response: Returns a 302/307 HTTP response directly. The client prgoram needs to support HTTP redirection.
    

### 3.2.2 Map Local (API Mock)

Depending on the purpose, this function is known by different names in different software, such as Map Local, API Mock, etc. However, it actually refers to the same type of function: return a predefined response instead of making a real HTTP request.

Surge automatically selects the appropriate Content-Type for the HTTP response header field based on the local file extension, or you can customize the response header field to override this behavior.

### 3.2.3 Header Rewrite

This function is used to modify the fields in the request header, and supports the add, del, and replace operations.

When an add operation is used, if the field name already exists, a field with the same name is appended, which is allowed by the HTTP standard. The server should be able to understand it by splicing multiple fields with the same name. However, since some HTTP servers do not follow this specification properly, it is generally recommended to use a combination of del and add unless there is a specific need to do so.

### 3.2.4 JavaScript Script Modification

Script modification provides the most comprehensive modification capability. You can modify the request and response header fields and data bodies at will, but please note that currently, Surge only supports script reading and modification of UTF-8 encoded data bodies.

Please refer to the manual for detailed instructions on how to use the script.

Chapter 4 Forwarding, proxy and rule systems
============================================

The request will be forwarded after it is processed. If Surge’s outbound mode is set to Direct Outbound, the request will be sent directly to the target server, and if the outbound mode is set to Global Proxy, it will be forwarded to the proxy server.

When the Outbound Mode setting is set to Rule-based Proxy, the forwarding policy will be determined based on the configured rules.

4.1 Rule System
---------------

There are two basic concepts in the rules system: policy and rule.

1.  Policy: describes the way in which Surge carries out its redirection, with three categories.

*   Built-in policies: DIRECT, REJECT, RECJCT-TINYGIF, REJECT-DROP.
*   Proxy policies: each policy corresponds to a proxy service
*   Policy group: select a final policy from the sub-policies according to certain rules.
    *   select policy group: select the policy through the UI menu.
    *   url-test policy group: Select the policy with the lowest latency.
    *   fallback policy group: Select the policy with the highest priority among the available policies.
    *   ssid policy group: Select the policy based on the current Wi-Fi SSID.
    *   load-balance policy group: randomly uses a sub-policy with optional availability checking.

2.  Rule: a rule consists of four parts: type, condition, policy, and parameter. When the condition is met, the rule matches, using the policy specified by the rule.

4.2 Policy
----------

The use of the various policies is specified below.

### 4.2.1 Built-in strategy

The built-in policies are provided by Surge and do not vary with configuration.

*   DIRECT: Send the request directly to the target server
*   REJECT: Reject the request and return an error page when the connection type is HTTP. (This behavior can be controlled by the show-error-page-for-reject parameter)
*   REJECT-TINYGIF: Reject the request and return a 1px GIF image response when the connection type is HTTP. If the connection is of another type, it is simply disconnected. This policy is mainly used for web ad blocking.
*   REJECT-DROP: Reject the request. Unlike REJECT, this policy will silently discard the connection. Because some applications have very violent retry logic, they will immediately retry after a failed connection, resulting in a storm of requests.

Since the operating system does not provide abandonment API for user-space program sockets, Surge silent abandonment is implemented by leaving the socket idle for a period of time before closing it.

Also, if a large number of requests to a hostname trigger the REJECT/REJECT-TINYGIF policy within a short period of time (the threshold is 10 times within 30 seconds in the current version), Surge will automatically upgrade the policy to REJECT-DROP in order to avoid wasting a lot of resources.

### 4.2.2 Proxy Policy

Proxy policies are defined by the user, and each policy describes a proxy service. Requests are forwarded when a proxy policy is used.

A simple proxy policy definition line is as follows.

`ProxyA = http, 11.22.33.44, 8080, username=user, password=pass`

ProxyA is the policy name for use by the rules and policy groups. The first parameter is the type of proxy protocol, currently, Surge supports the following types of proxy protocols: http,https,socks5,socks5-tls,ss,snell,vmess,trojan, and two special types external and direct. The second parameter is the proxy server hostname, the third is the proxy server port number, followed by the key=value parameter table, which is provided differently depending on the protocol type.

Different types of proxy protocols have their own specific parameters, and some parameters are common to all proxy policies.

*   tfo: Enabling TCP Fast Open, TFO allows the TCP handshake to pass the first packet during hankshake, thus reducing the time overhead of the proxy protocol handshake. However, since this is a new feature introduced in 2014, if any of the devices (routes/firewalls) between the target server does not support this feature, it will cause an exception. It has been observed that most ISP’s networks have a chance of encountering an error, so it is not recommended to enable it unless it is a LAN proxy server.
    
*   underlying-proxy: Use a proxy through another proxy, which may be referred to as a proxy chain in other software. (Currently only available in Surge iOS beta)
    
*   interface: Force the proxy to use a specific NIC.
    
*   allow-other-interface: If it is false and the specified NIC does not exist, the connection will be broken.
    
*   If always-use-connect=true, the remote HTTP proxy will be used as a standard TCP proxy.
    

#### 4.2.2.1 direct type (Surge Mac only)

This is a special type, not strictly a proxy, used to force a specified NIC to be used for requests.

`PolicyName = direct, interface=en2, allow-other-interface=false`

Note that due to restrictions in the Darwin kernel, the selected NIC must have a routing table entry for the destination address, otherwise the NIC cannot be used.

For example, if you are connected to both a wired and wireless network, we can see with the netstat -rn command that both cards, en0 and en1, have default full-coverage routing table entries, but with different priorities.

    Internet:
    Destination        Gateway            Flags        Netif Expire
    default            192.168.20.1       UGSc           en0
    default            192.168.20.1       UGScI          en1

In this case, you can use the direct policy to freely select en0 or en1.

**Used with VPN**

A very small coverage routing table is added after some VPN connection established and can be used to access specific intranet resources due to the small coverage priority. When enhanced mode is not enabled, if the egress policy is DIRECT, Surge will follow this behavior for local forwarding as well.

However, if enhanced mode is enabled, since Surge’s VIF has been configured as the default route, the egress connection will be forced to bind to the original default card, ignoring the routing table, in order to originate the connection from the local physical NIC. This will cause the VPN’s intranet routing table failing to work, which can be solved by forcing the VPN’s utun device to bind using the direct type policy.

    [Proxy]
    CorpVPN = direct, interface=utun1, allow-other-interface=true
    
    [Rule]
    DOMAIN-SUFFIX,internal.corp.com,CorpVPN

#### 4.2.2.2 external type (Surge Mac only)

The external type policy allows Surge to work more easily with other proxy procotol clients.

This feature is currently only available by directly editing the profile. External = external, exec = “/usr/local/bin/local”, args = “-c”, args = “/usr/local/etc/config.json”, local-port = 1080, addresses = 11.22.33.44

The args and addresses fields can be appended repeatedly.

When this policy is used Surge does the following. 1. Start the external process with the exec and args parameters, and then forward the request to SOCKS5 127.0.0.1:\[local-port\]. 2. If the external process is terminated, it will automatically restart when the policy is used again. 3. Surge automatically excludes the addresses in the addresses parameter from the VIF routing table when Enhanced Mode is started. (Enter the IP address of the proxy server being used in this field.) 4. The DIRECT policy is always used when requests from external processes started by Surge are processed by Surge VIF. (In order to cope with plugin requests like obfs-local, children of the external process are also handled in the same way) 5. Surge automatically shuts down all external processes when it exits, and Enhanced Mode automatically clears the routing table of incoming routes when it is turned off.

The functions of 3 and 4 above overlap, please try to use the addresses declaration to exclude addresses used for TUN processing to reduce system overhead, the function of 4 is an additional layer of protection.

### 4.2.3 Policy Group

Surge offers many different types of policy groups to meet the different needs of various scenarios.

#### 4.2.3.1 Connectivity Testing

Several of Surge’s features require connectivity testing.It might be tested in three ways:

1.  ICMP Ping Test: A simple ping test that reflects the current state of the physical network.

The router delay in the Mac version of the home card and network diagnostics are the results of this test.

2.  DNS Lookup Test: Parallel lookup of the A record for the bing.com domain to all DNS servers, resulting in the shortest time a response was received, reflecting current physical network conditions, with a simple confirmation of Internet access.

DNS latency in the home card and network diagnostics, connectivity test latency in the Main Menu for Surge Mac and the widget for Surge iOS are the results of this test.

3.  HTTP test: Send a HEAD request to the target HTTP server, calculate the time to receive the response header, any response packet is considered to be valid. The test URL can be customized, it is recommended to choose a URL with nodes in the world.

Internet and proxy latency in the home card, the baseline for the policy group, and the proxy test for network diagnostics are the results of this test.

The policy group uses Method 3 as the baseline of judgment rather than Method 1 because:

1.  There may be a relay server between the proxy server, and the ping test can only indicate the delay in reaching the relay server.
2.  In addition to testing the connectivity with the proxy server, the DNS and egress network conditions of the proxy server should also be considered.
3.  Some proxy protocols, such as SOCKS5, introduce additional latency overhead due to poor design, and should also be considered.

#### 4.2.3.2 url-test policy group

Test all sub-policies concurrently and select the one with the lowest latency. There are several parameters:

*   url: The URL for testing.
*   timeout: The maximum time to wait for the test, policies exceeding this time will be marked as failed and will not wait any more.
*   interval: The time between tests. The test timing for all url-test class groups is:
    *   Test on first use.
    *   Triggers the test again if the interval between the last test and subsequent use of the policy group has been greater than the interval set. (Note that this does not mean that the next test must be performed every number of minutes. The policy needs to be used to trigger)
    *   The test is triggered directly when the currently selected policy produces an unrecoverable error.
    *   After the network switchover, the results of the previous test will be cleaned up and the first test will be triggered when the policy group is used.
*   tolerance: If the test results of several policies are not very different, it will lead to frequent switching among these policies, if the exit IPs of the proxy servers are different, it may trigger the risk control of the target website. Therefore, a tolerance design is added so that switching to a new policy is done only when the difference in latency between the best policy and the selected policy is greater than the tolerance of the new test result.
*   evaluate-before-use: By default, the first of the sub-policies will be used directly when the policy group is used for the first time, while triggering the latency test. If evaluate-before-use=true is configured, then the first use will wait until the test is complete before selecting the best policy.

#### 4.2.3.3 fallback policy group

This is basically the same as the url-test group, with the difference that you only care about whether a sub-policy is available and not about the specific latency, and then choose the top policy from the available ones. You can mark slow lines as unavailable as well by turning down the timeout parameter. There is no tolerance parameter for this type.

#### 4.2.3.4 load-balance policy group

A load-balancing group is randomly selected from the sub-policies to use.

When the url parameter is configured, availability is checked against the behavior of the fallback group and then only a random selection is made from the available sub-policies.

In addition to the url, timeout, and interval, there is one other parameter.

*   persistent: when persistent=true, the same policy will be used as much as possible for the same target hostname. Avoid triggering risk controls on the target site due to different egress IPs. However, a policy change may occur when availability changes.

#### 4.2.3.5 ssid Policy Group

Although still called the SSID Policy Group, it has been expanded to include the ability to select sub-policies based on the current network’s SSID, BSSID, routed IP address, etc. The iOS version can also specify policies for data networks.

4.3 Rules
---------

Surge uses a system of rules to match the egress policy selected for each connection. The rules are matched in a **top-down, test-by-test** principle. The last rule must be a FINAL rule, used when all rules do not match.

### 4.3.1 Domain Name Rules

Matches this rule when the target hostname matches.

*   DOMAIN: Matches strictly a domain name.
*   DOMAIN-SUFFIX: Matches a domain name and its sub-domains, e.g. DOMAIN-SUFFIX,apple.com will match apple.com and www.apple.com, but will not match anapple.com.
*   DOMAIN-KEYWORD: Simple string search, will match a domain name if it contains a substring.
*   DOMAIN-SET: Designed for a large number of domain name list file, supports fast search for thousands of records. Each line in the file is a domain name, if a line begins with . matches all sub-domains and the domain name itself. This can be used for ad filtering.

#### 4.3.1.1 Domains and hostnames

The domain name is actually a form of the hostname, there is no distinction between domain and hostname within Surge, all the documentation mentions use the same logic for handling domain names and hostnames.

For example, the DOMAIN,1.2.3.4 rule can actually be used to match connections where the target host is an IP address 1.2.3.4. DOMAIN,MacBook.local can also be used to match Bonjour hostnames.

### 4.3.2 IP address rule

Matches the rule when the IP address of the target host matches. Contains three types: IP-CIDR, IP-CIDR6, and GEOIP.

The IP type rule triggers local DNS resolution when the target hostname is a domain name or hostname. Judgment is made based on the IP address obtained from the resolution. When the resolution fails: \* If the final FINAL rule has a dns-failed flag, then the FINAL rule will match directly. \* If the FINAL rule does not have a dns-failed tag, **the request will simply fail**.

IP type rules have a proprietary parameter no-resolve, if an IP rule has this parameter, then the 1. If the target hostname is a domain name, the rule is skipped and DNS resolution is not triggered. 2. If the target hostname is an IP address, follow the rule. 3. If the target host name is a domain name and an IP rule that appeared earlier has already triggered DNS resolution to obtain the IP address, then use that IP address to make a decision.

Because of the time overhead of DNS lookups, when configuring rules, it is optimal to try not to trigger DNS resolution first and to place all rules that do trigger DNS resolution at the bottom. This way, requests that should use proxy policies avoid local DNS resolution.

However, there is no need to intentionally avoid resolution altogether, because once you decide to use the DIRECT policy, it will eventually be resolved.

Note, however, that if a target hostname is not resolvable in the local DNS, you must add a rule that determines the policy to terminate the match before triggering the DNS. Alternatively, add a dns-failed flag to the FINAL rule and use a proxy policy.

### 4.3.3 HTTP Related Rules

Rules that are valid only for HTTP requests, including URL-REGEX and USER-AGENT.

Specifically, URL-REGEX is not valid for unencrypted HTTPS connections, only because the URL is available only after MITM decryption. However, the USER-AGENT rule is valid for unencrypted HTTPS connections as well, because programs using the HTTP proxy will send a CONNECT request with the plaintext of their own User Agent.

### 4.3.4 Other Rules

*   PROCESS-NAME: Available only for Mac version, can match program name.
*   SRC-IP: Matches the IP address of the source of the connection, can be used when taking over connections from other devices.
*   IN-PORT: Mac version supports multi-port listening, can configure specific rules for different listening ports.
*   DEST-PORT: Can match the port number of the target host.
*   PROTOCOL: Can match according to the protocol of the connection, the range of values is HTTP, HTTPS, TCP, UDP. (Although logically HTTP and HTTPS are both special forms of TCP, the rule will be treated differently according to the classification in the previous chapter.)
*   SCRIPT: A policy that can be chosen completely freely based on various parameters using JavaScript.

### 4.3.5 Rule set

RULE-SET rule sets can have multiple sub-rules in a single file for easy sharing and reuse. However, the rules in a rule set cannot be policy specific; the entire rule set points to a single policy.

In addition, Surge comes with two rule sets, SYSTEM and LAN, and the specific sub-rules contained in the rule set will be adjusted as Surge is updated. Note that the LAN ruleset triggers DNS resolution.

#### 4.3.5.1 Difference between RULE-SET and DOMAIN-SET

RULE-SET can contain all types of sub-rules, with no difference in execution efficiency from the rules in the main configuration, while DOMAIN-SET can only use both DOMAIN and DOMAIN-SUFFIX forms of content, using special logic optimized to provide a huge performance boost when there is very much content. (over a thousand items, otherwise there is not much difference between the two)

### 4.3.6 Logic rules

All rule types can be combined by using AND, OR, NOT operations. For example:

    AND,((PROCESS-NAME,Google Chrome),(PROTOCOL,UDP)),REJECT

UDP packets sent by Chrome can be dropped.

Chapter 5 TLS, HTTPS and MITM
=============================

This chapter explains in detail the relationship between TLS and HTTPS, the role of TLS, and how to perform MITM.

5.1 The Relationship between TLS and HTTPS
------------------------------------------

The design of modern computer network architecture adopts the idea of layering, and HTTP is an application layer protocol based on the TCP protocol layer.

The core function provided by TCP layer is reliable transmission, and upper layer applications do not have to worry about packet construction, splitting, disorder, packet loss and other implementation problems.

Based on TCP, HTTP defines more detailed data transmission standards and abstracts the data flow into a session system, where the client sends a request and the server responds with a response.

HTTPS is a TLS layer inserted between the TCP layer and the HTTP layer, the TLS layer can make the data flow of the TCP layer encrypted and security. All TCP-based upper layer protocols can be protected in this way without having to adjust the protocol itself. (e.g. SMTP)

5.2 The role of TLS
-------------------

It is generally thought that the role of the TLS layer is to encrypt data, but in fact the TLS layer hosts a full range of security features, including at least.

1.  Confidentiality: Aka data encryption, even if the attacker gets the complete data stream from the beginning to the end of the link, the original data cannot be decrypted.
2.  Authenticity: It can confirm the identity of the target host. For example, when accessing example.com, even if the whole physical network is hijacked, it can be guaranteed that it is the host of example.com and not other impostor hosts.
3.  Data integrity: Ensures that data cannot be modified, and that an attacker on the link who has modified the data stream will cause an error.

### 5.2.1 Data Encryption and Integrity Protection

In simple terms, the TLS handshake phase generates a symmetric encryption key (the session key) through asymmetric encryption or key negotiation and exchange algorithm, and the subsequent transmission relies on the session key for encryption and integrity protection.

### 5.2.2 Confirming the identity of the target host

Before we explain how TLS identifies the target host, we need to add a little bit of simple cryptography: asymmetric cryptography. Instead of describing the mathematics of asymmetric cryptography, we will simply describe how it is used.

#### 5.2.2.1 Asymmetric Encryption

Symmetric encryption, as the name suggests, refers to the fact that the same key is used for encryption and decryption. Asymmetric encryption, as the name suggests, refers to the fact that the encryption and decryption use different keys, we call the key used for encryption **Public Key**, and the key used for decryption **Private Key**. Of course, only the private key that goes with the public key can decrypt the content encrypted by the public key, this pair of public key and private key is called **Key Pair**. The key pair satisfies:

*   It is not possible to compute the private key directly from the public key.
*   If the key length meets the requirements, the arithmetic requirements for brute-force cracking are unrealistic.

In addition to being used for encryption and decryption, the key pair can also be used for signing. For a piece of content, the private key can be used to generate a signature (typically called a digital signature), and the public key can verify that the signature was generated by the private key as a way to make sure that the content is recognized by the private key holder. It also ensures that the content cannot be tampered with, and that digital signature verification will fail if the content changes.

The most common and well-known asymmetric cryptographic algorithm is the RSA algorithm, but there are other asymmetric cryptographic algorithms as well.

#### 5.2.2.2 X.509 Certificate Chain

The next step is to briefly understand what a certificate is, a certificate is actually a data structure of key-value pairs (Key-Value), different purposes will have different fields of content.

1.  A certificate corresponds to a key pair, the public key is part of the certificate, while the private key is kept private by the owner of the certificate.
2.  A certificate can be issued by another certificate. The certificate contains a digital signature from the parent issuing certificate and information about the parent issuer.
3.  The certificate of the superior issuer can be issued by another superior issuer to form a certificate chain. Generally, TLS uses a three-level certificate chain, in which the highest level issuer is called the root certificate (or CA certificate, Certificate Authority) and the intermediate certificate is called Intermediate Certificate. As for the leaf certificate, we call it the Server Certificate here.
4.  The operating system has preset many CA certificates, which means that the operating system trusts these CA certificates, the intermediate certificate is trusted by the CA certificate by presenting the digital signature of the CA certificate, and the server certificate is trusted by the intermediate certificate by presenting the digital signature of the intermediate certificate, which constitutes a chain of trust.

Then how does this certificate trust relationship correspond to the identity verification in the real world? Generally speaking, the CA certificate maintenance authority needs to comply with specific security auditing and law-abiding operation, and they will select some agents to grant intermediate certificates. When a domain name holder wants to obtain a certificate indicating his identity, the agent will first verify the identity of the applicant (e.g. through the contact email of the domain name) and then issue a certificate to the applicant.

The above system is a brief description of the X.509 certificate chain.

*   In the process of certificate issuance, the applicant usually generates the key pair, then encapsulates the public key as CSR (Certificate Signing Request) and sends it to the agent, and the agent returns the certificate with digital signature of its intermediate certificate and the applicant’s domain name in the certificate field after confirming its identity. The agent does not know the private key of the certificate.
    
*   The operating system continually adjusts the built-in root certificate library as the system is updated and according to business requirements.
    
*   Some software chooses to maintain its own root certificate store and ignores the system’s root certificate store, such as Firefox.
    

#### 5.2.2.3 TLS Handshake

With the above basics in place, we can begin to explain how TLS confirms the identity of the target host. Take a look at the TLS handshake in action.

1.  The client explicitly informs the server, via SNI, that it is accessing example.com and asks for the appropriate certificate.
2.  The server confirms that it has the certificate for example.com and provides the client with its own server certificate and all intermediate certificates.
3.  The client receives the certificate and confirms that the Common Name (or SAN field) field of the certificate contains example.com.
4.  Confirm that the root certificate store can validate the certificate through the certificate chain.

We can now confirm that the certificate provided by the server is indeed an authentic certificate of example.com.

5.  The client generates a random piece of content, encrypts it with the public key of the server certificate, and sends it to the server. The server can use the private key to decrypt the content to calculate the symmetric encryption key for the subsequent transmission phase, called the session key.

If the server does not have the private key for this certificate, then it is impossible to calculate the correct session key and continue communication with the client.

(The above process is somewhat simplified and may be slightly inconsistent depending on the TLS version and encryption method, read more at [https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/))

After the above steps, the client has finally established a secure channel with example.com. It is now ready for further HTTP content transfer.

5.3 MITM attack
---------------

Having explained how TLS secures connections, it would be too easy to explain how to decrypt TLS traffic via Man-In-The-Middle attacks (MITM).

As the name implies, a Man-in-the-Middle attack intercepts plaintext content by inserting a Man-in-the-Middle C between client A and server B. This is done by hijacking the connection from A to B. The attacker can use this man-in-the-middle technique to intercept TLS traffic. This is done by hijacking the connection from A to B to C, so that A thinks it is communicating with B when it is actually communicating with C. C then establishes a connection to B and acts as a go-between to forward content between A and B.

To implement MITM there are two conditions.

1.  Capable of hijacking A’s network, which can be easily done by proxy services, VPNs, ISPs, Wi-Fi providers, and other link owners. (Malware can also be achieved by hooking the operating system, but if the malware has obtained such a high level of privileges, there is no need to use MITM to decrypt the traffic, just read the memory of the corresponding software).
2.  Need to break through the TLS target host identity mechanism.

According to the previous description, since we want to perform MITM for our own research purposes, the way to break through is simple: insert a certificate that you own the private key in the root certificate store of the system.

### 5.3.1 Surge’s MITM process

Let’s take a complete look at the process of Surge performing MITM.

1.  The user configures the MITM function, Surge generates the key pair locally, generates a root certificate and installs it into the system certificate store. The MITM function of example.com is enabled.
2.  Receive a CONNECT request to example.com:433, enter MITM mode, and directly inform client that the TCP handshake to the server has been completed.
3.  The client begins the TLS handshake with a ClientHello message.
4.  Surge immediately generates a server certificate for example.com and signs the configured root certificate, and completes the handshake with the client.
5.  The client communicates at the HTTP layer, sending a real HTTP request.
6.  After Surge receives the request, it modifies the request as described in Chapter 2 and determines an outbound policy. Use the corresponding policy to forward the request by initiating a connection to the real example.com and completing a TLS handshake.

One detail that varies from software to software when performing MITM is that Surge generates a new server certificate out of air while it handshaking with the client. The strategy of some other software is to suspend the client handshake, start the server handshake immediately, and after completing the server handshake to get the server certificate, modify its public key and issuer information and re-sign with its own root certificate, and then use this certificate to complete the handshake with the client.

The reason why Surge adopts the first method is that Surge’s rule system allows the egress policy (e.g., URL) to be chosen based on HTTP layer characteristics, so the handshake must be completed first to get the HTTP layer request before it can establish a connection with the real target server.

### 5.3.2 Public root certificate

In practice, we have found that some MITM tools do not provide a locally generated root certificate. Instead, a root certificate and the private key of the certificate are packaged directly.

This practice is very insecure, if the user system trusts the certificate, once the network has been hijacked, attackers can use the public certificate of the private key for MITM attacks to decrypt traffic.

Be sure to generate your own unique root certificate locally and keep the private key securely.

### 5.3.3 MITM Attack Countermeasures

As a software developer, if you don’t want your traffic to be decrypted by MITM tools, you need to perform MITM defense.

The purpose of X.509 is to serve the browser, when users visit a website, they know nothing except the domain name of the website, so they have to rely on the certificate chain to verify the legitimacy of the certificate. However, there is no such restriction for an app. In the TLS handshake phase, it is enough to directly determine whether the public key of the server certificate is a pre-defined value, so that the MITM tool cannot bypass the authentication and decrypt the traffic.

In practice, there are many ways to do this, such as comparing the public key of the server certificate. I won’t go into them here. If the app performs MITM defense and wants to proceed with MITM, you must use a jailbroken device to modify the program binary or inject runtime code to break through the custom certificate verification process.

5.4 Additional details of TLS
-----------------------------

We’ll add a few more TLS-related details in passing.

### 5.4.1 Common HTTPS Errors

The “insecure” errors that we often see in browsing are errors that result from failures at various points in the validation process described above, typically:

*   Name does not match: the permitted domain name of the server certificate and the URL being accessed do not match.
*   Certificate expires: The certificate has an expire date, generally for one year, the error generally indicates that the website maintainer forgot to update the certificate, or the user set the wrong system time.
*   The root certificate can not be trusted: the root certificate of the certificate chain provided by the server did not exist in the system’s certificate store.

If the above error is encountered under a trusted network (e.g. home broadband), it is usually caused by a configuration error by the webmaster. But if the above error is encountered on a public network, then you need to be extra careful, you may have encountered a hijack.

### 5.4.2 SNI

We previously mentioned SNI in the TLS handshake, so here’s a detailed explanation of what SNI does.

First of all, we need to know that if the server has an IP address 11.22.33.44 and there are multiple domain names exampleA.com and exmapleB.com pointing to this IP, when the client initiates a TCP connection to the server, the server does not know whether the client is accessing through the IP or exampleA.com or exmapleB.com, because the TCP metadata contains only the IP address, and the domain name is not in the TCP. The domain name is used by the client to query for the IP address, but does not participate in the subsequent TCP sessions at all.

This is a problem in practice with the HTTP protocol, because of the scarcity of IP addresses, we sometimes want the same IP address (or the same server) to be able to provide different content (i.e., virtual hosts) depending on the domain name that the visitor is accessing. To solve this problem, the browser adds a Host field in the HTTP request header, which is the hostname portion of the URL. The server can then use the Host field to differentiate between the visited sites and return different content.

HTTPS also encounters the same problem, where the TLS handshake requires different server certificates depending on the domain name being accessed. Since the content of the Host exists in the encrypted transmission after the handshake, if the handshake can’t be completed, the problem cannot be solved by this field. So during the TLS handshake, the client (browser) sends the SNI of the domain name the client is accessing in plaintext for the server to select the certificate.

But this can lead to privacy leaks, allowing the link owner to know the domain name of the site users is visiting. However, since the IP address accessed by the user is always knowable, it is not really easy to say how serious the impact of the compromise of the visited domain name is.

In addition, if the TLS client is a browser, since the SNI of TLS and the Host of HTTP header are both the hostname of the URL, they must be identical. But they are not necessarily identical for other TLS clients. For example, Surge supports customizing the SNI content of the TLS handshake.

### 5.4.3 Forward Secrecy

As mentioned earlier when explaining the TLS handshake, the session key used for TLS subsequent symmetric encryption is computed from random data encrypted by the private key of the server certificate.

So, if an attacker saves the secret message of a communication, and if someday in the future the server’s private key leaks, or if advances in computer science make it possible to brute-force the private key, the session key can be used to decrypt the private key, thus completely decrypting the saved secret message.

To address this shortcoming, the TLS protocol in use today is a little more sophisticated in its handshake, no longer simply using static asymmetric key pairs to pass session keys, but instead using key negotiation algorithms to generate temporary session keys. The DHE algorithm, for example, is now common.

Here is a brief description of the use of DHE. 1. The server randomly generates a key pair for each new connection: the server private key and the server public key. 2. The client randomly generates a key pair for each new connection: the client private key and the client public key. 3. The client and server exchange their public keys. 4. The client calculates the result 1 by an algorithm based on the server public key, the client private key, and the client public key. 5. The server computes result 2 by an algorithm based on the client public key, the server private key, and the server public key. 6. The algorithm ensures that result 1 and result 2 must be equal, and the result is used to generate the session key. 7. The server private key, the client private key, result 1, result 2, and session key all exist only in the memory of both ends, and are completely discarded and irretrievable when the connection is terminated.

In such a key exchange mechanism, no one can recalculate the session key since the attacker can only save the exchanged client public key and server public key.

This feature is called Forward Secrecy, or Perfect Forward Secrecy. TLS automatically chooses whether or not to use a forward-secured key exchange algorithm during the handshake, depending on the client and server.

### 5.4.4 TLS Cipher Suite

In summary, during the handshake phase of the TLS protocol, the server and client need to negotiate several outcomes

1.  TLS protocol version
2.  Key exchange algorithms
3.  Signature algorithms
4.  Symmetric encryption algorithms
5.  Hash algorithm

The method of negotiation is simple: the client tells the server what combination of the above five items it supports, and the server chooses the most secure result it supports and tell the client. This combination is called TLS Cipher Suite.

Take a few of the most common TLS Cipher Suites today as examples.

*   TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256: This is a combination of TLS 1.2, the key exchange algorithm is ECDHE, the signature algorithm is RSA, the symmetric cryptographic algorithm is AES-128-GCM and the hash algorithm is SHA256.
    
*   TLS\_AES\_256\_GCM\_SHA384: This is a combination under TLS 1.3 version. The TLS 1.3 standard only supports key exchange using ECDHE algorithm, so no negotiation is needed, and since the cryptographic algorithms used are all AEAD algorithms with their own integrity protection, no separate integrity protection is needed. The signature algorithm is also not subject to negotiation. The combination contains only the symmetric encryption algorithm as AES-256-GCM and the hash algorithm as SHA384.
    

If you are using a TLS-based proxy protocol, you can see the Cipher Suite negotiated by the proxy connection in the notes to Surge’s Dashboard/Recent Requests.

Chapter 6 DNS
=============

Surge doesn’t use the system DNS resolution entirely and implements it all by itself.

6.1 Query In Parallel
---------------------

Surge performs DNS lookups to all configured DNS upstream servers simultaneously and selects the fastest returning result to improve performance. This feature is consistent with the dnsmasq implementation.

6.2 Optimistic DNS
------------------

Due to the complexity of modern networks, most sites configure their DNS record lifetime (TTL) for a very short period of time, such as 30 seconds. This allows network administrators to make changes to DNS records that take effect quickly, without having to wait for all nodes to time out of TTL for troubleshooting and maintenance.

Understandably, website and API availability is a top priority for many companies. If an IP is unreachable, it can take up to 24 hours for a DNS record to take full effect after modifying it, causing incalculable damage. So operations and maintenance are likely to choose a very short TTL.

But this brings a problem, the client will strictly follow the TTL to perform a query, so every short time will be a lookup again, a DNS query time cost is as short as a few milliseconds, but the longest can take several seconds. Frequent repetition of lookups causes unnecessary delays.

That’s why Apple introduced Optimistic DNS at WWDC 2018, which allows the program to continue to use old results while performing the new DNS lookups when establishing a connection if the local DNS cache has expired, and then try again with new results if the connection fails.

In most cases, the DNS records are unchanged, so this solution will not affect normal use at all. When encountering a DNS record update (the probability is usually small), it will only delay one or two requests. This can be said a perfect optimization.

However, due to limitations such as POSIX standard, Apple does not apply this optimization everywhere, but Surge does, so all requests can enjoy Optimistic DNS optimization.

6.3 Local Mapping
-----------------

Surge supports the configuration of local DNS mappings, which function basically the same as the /etc/hosts file. In addition to directly specifying the IP address of a hostname, Surge also supports customizing the DNS server for a specific domain. Or you can completely customize the resolution logic via script.

6.4 Using system’s resolution
-----------------------------

Surge supports configuring some domain names to fallback to system DNS resolution (example.com = server:syslib) to resolve compatibility issues, such as some VPNs use the Split DNS mechanism to add a DNS server on the system to handle specific domain names. This complex logic can be solved by configuring fallback on VPN-related domain names.