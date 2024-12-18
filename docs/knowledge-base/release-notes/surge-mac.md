1.  [Release Notes](/surge-knowledge-base/release-notes)

Surge Mac Release Notes
=======================

This page may not be up-to-date. All versions and the latest updates can be directly obtained from Surge's Sparkle update XML:

*   Release version: https://www.nssurge.com/mac/v5/appcast-signed.xml
    
*   Beta version: https://www.nssurge.com/mac/v5/appcast-signed-beta.xml
    

### 

[](#version-5.9.0)

Version 5.9.0

### 

[](#new-features)

New Features

*   Added pre-matching rules for low-overhead request rejection. Please refer to the documentation for details. https://manual.nssurge.com/policy/reject.html
    
*   Body Rewrite supports using JQ expressions to manipulate JSON.
    
*   The shadowsocks protocol adds support for the `2022-blake3-aes-256-gcm` and `2022-blake3-aes-128-gcm` encryption modes
    

### 

[](#improvements)

Improvements

*   The URL-REGEX rule now supports `extended-matching` tags.
    
*   Allow the use of Ponte policy as an underlying proxy.
    
*   Modify the termination logic of HTTP scripts. If a request needs to be interrupted, use $done({abort: true}). Other failures will not modify or terminate the request.
    
*   Overall optimization and improvement of UDP forwarding.
    

### 

[](#bug-fixes)

Bug Fixes

*   Fix the issue where DNS requests cannot select the correct interface according to the routing table in enhanced mode.
    
*   Fix the issue of not being able to obtain system routes on macOS 12.
    
*   Fix the issue where determining the existence of IPv6 might be incorrect in some cases.
    
*   Fix the issue where an incorrect message might sometimes indicate that the proxy settings have been modified by another program.
    
*   Other bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.9.0-3025-f8d045da66079150d4a281ed3770b3f6.zip

### 

[](#version-5.8.2)

Version 5.8.2

*   Fix the issue where IPv6 VIF cannot take over requests when the `gateway-restricted-to-lan` parameter is enabled.
    
*   DNS lookup of `use-application-dns.net` will return NXDOMAIN, causing Firefox to automatically disable application DNS, (i.e., DoH). Using encrypted DNS directly in the browser will prevent Surge from correctly obtaining the requested domain names.
    
*   Bug fixes and minor improvements.
    

https://dl.nssurge.com/mac/v5/Surge-5.8.2-2946-b739968f1d90da3b755d3bf82941e8c2.zip

### 

[](#version-5.8.1)

Version 5.8.1

*   New parameters: proxy-restricted-to-lan/gateway-restricted-to-lan It has been found that some users, due to a lack of understanding of network security knowledge, accidentally expose proxy and gateway services to the Internet (e.g., configured DMZ). Therefore, these two parameters have been added to restrict proxy and gateway services to only accept devices from the current subnet. These two parameters are enabled by default.
    
*   Fix the compatibility between enhanced mode and PPPoE direct dialing.
    
*   Support using ETag to avoid downloading duplicate data when requesting external resources.
    
*   Surge now supports handling the system's DNS search domain settings.
    
*   Other bug fixes and compatibility improvements.
    

https://dl.nssurge.com/mac/v5/Surge-5.8.1-2929-5220af95366dfacec7ca84cb8ddd122c.zip

### 

[](#version-5.8.0)

Version 5.8.0

#### 

[](#network-extension)

Network Extension

*   Due to numerous issues arising from the traditional utun takeover solution in newer system versions, starting from Surge Mac 5.8.0, Surge Mac will use Network Extension as the enhanced mode to take over the system network.
    
*   The minimum system version requirement for Surge Mac is raised to macOS 12.
    
*   Due to different required permissions, manual authorization operations is needed after updating.
    
*   The `vif-mode` parameter will no longer be effective.
    
*   Enhanced mode can now be used in conjunction with network sharing functionality, meaning you can directly create a Wi-Fi managed by Surge (requires wired network)
    

#### 

[](#port-hopping)

Port Hopping

Hysteria2 and TUIC protocol now support port hopping to improve ISP's QoS issues with UDP. See the server documentation for details.

`Proxy = hysteria2, 1.2.3.4, 443, password=pwd, port-hopping="1234;5000-6000;7044;8000-9000", port-hopping-interval=30`

After configuring the `port-hopping` parameter, the primary port number configured in the front will no longer be effective.

Parameters:

*   `port-hopping`: Used to configure the range of ports. Separated by commas and supports ranges configured with a hyphen.
    
*   `port-hopping-interval`: The interval for changing port numbers. Defaults to 30 seconds
    

#### 

[](#other-improvments)

Other Improvments

*   Due to the large amount of features requiring permissions in the new macOS system, a dedicated page has been added for managing system permissions.
    
*   The `syslib` keyword for local DNS mapping can now be used in enhanced mode. However, in non-enhanced mode, the resolution is entirely handled by the system. In enhanced mode, Surge resolves it using the system's DNS address.
    
*   Added `[General]` parameter `show-error-page`, which is used to control whether Surge's HTTP error page is displayed when an error occurs. This parameter is enabled by default, and the behavior is consistent with previous versions.
    

https://dl.nssurge.com/mac/v5/Surge-5.8.0-2900-6379c9d5240ae1555772aed2eb977e69.zip

### 

[](#version-5.7.5)

Version 5.7.5

*   The panel is now available in Surge Mac.
    
*   DNS Forwarding Subsystem Optimization
    
    *   When the domain of a DNS query is one that should not be forwarded to the public network (e.g., .home.arpa, 1.0.168.192.in-addr.arpa), it will automatically determine the upstream DNS address and only forward to LAN DNS servers.
        
    *   Surge can now correctly respond to PTR requests for fake IPs, meaning that using the `dig -x 198.18.23.87` command can be used to determine the original domain name corresponding to a fake IP.
        
    *   The DNS forwarder will now forward DNS requests to specific upstream servers based on `[Host]` section configuration.
        
    *   Directly respond with NOTIMP to unsupported DNS-SD PTR requests for fake IPs, without forwarding.
        
    
*   When adding a rule for the current webpage, you can choose to add to an existing ruleset.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.5-2826-4f19761fb2275ebbe2acf43907bd9371.zip

### 

[](#version-5.7.4)

Version 5.7.4

*   Due to the sudden shutdown of a public STUN server that Surge Ponte relies on, resulting in the unavailability of Surge Ponte, we have carried out an emergency replacement. Additionally, we will build our own STUN server in the future to avoid such issues.
    
*   Enhance compatibility with VPN and multiple network cards
    
    In previous versions, if the enhanced mode was enabled, all outgoing packets would be forced to use the primary interface due to Surge overriding the system's routing table. This bypassed the routing table to avoid creating a loop.
    
    However, this also caused issues where packets could not be sent from the correct interface in cases with multiple network cards or other VPNs.
    
    This version improves on that design. Now, in enhanced mode, Surge will automatically check routes and still use standard routing for TCP/UDP packets if there are higher priority sub-routes present, enhancing compatibility.
    
*   Fix an issue where DOMAIN-SUFFIX rules may become invalid if duplicate DOMAIN and DOMAIN-SUFFIX rules are included in the rule set.
    
*   Other bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.4-2806-afe67661ef616b7bbab189dec1473b68.zip

### 

[](#version-5.7.3)

Version 5.7.3

*   Now you can see the number of times a rule has been used in the rule list.
    
*   Optimized the implementation method of blocking QUIC traffic to increase the likelihood of clients correctly falling back.
    
*   The Smart group will use the SUBSTITUTE policy (DIRECT) instead of failing directly when there are no sub-policies.
    
*   Fixed an issue where the `server-cert-fingerprint-sha256` parameter was not effective for TLS-like protocols with sni=off settings.
    
*   Added a new rule type `HOSTNAME-TYPE`, used to determine the type of request hostname. Optional values are: `IPv4`, `IPv6`, `DOMAIN`, `SIMPLE`. (`SIMPLE` refers to hostnames without a dot, such as `localhost`)
    
*   Optimized DNS request logs. Now more information is displayed. Additionally, if DIRECT policy connects directly without triggering DNS in the rule system, related DNS logs can still be shown.
    
*   When deleting a policy that is being used by a policy group, it is now allowed to delete it directly and automatically remove it from all policy groups.
    
*   Bug fixes and other Improvements.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.3-2785-048c0bdc5ee2b05dab39852d51a19ff4.zip

### 

[](#version-5.7.2)

Version 5.7.2

*   Optimize the matching performance of ASN rules in the rule set.
    
*   Fix the issue where FINAL rules cannot be edited through UI.
    
*   Fix the problem that invalid cron expressions would cause scripts to be executed repeatedly.
    
*   Optimized the management mechanism of the script engine.
    
*   Other minor issues fixed.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.2-2762-9a963758f386b5da00e7744b2a7f254d.zip

### 

[](#version-5.7.1)

Version 5.7.1

*   Optimize the matching performance of small rule sets, especially evident on older model CPUs.
    
*   The external resource update page can display error information generated by rule set processing.
    
*   Automatically ignore invalid empty lines in the rule set.
    
*   Corrected the issue where applying temporary rules and then experiencing a policy change does not disrupt existing connections.
    
*   Corrected the issue when using Ponte policy within Smart group, if the target device is itself, it failed to automatically switch to DIRECT policy.
    
*   Corrected the problem of incorrect time displayed in request logs for Ponte device requests.
    
*   Corrected crashes that may occur when external policy groups change.
    
*   Fixed an issue where configuration upgrade functionality did not correctly take effect for managed configurations and enterprise configurations.
    
*   During Smart group initialization phase, no longer displays most frequently used tags to avoid misunderstanding.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.1-2757-e7b680d5dc23e1258188adc4d81116d7.zip

### 

[](#version-5.7.0)

Version 5.7.0

### 

[](#smart-group)

Smart Group

This is a new type of policy group, driven by our carefully designed algorithm engine, which can automatically select the appropriate policy from the sub-policies of this policy group. The goal of the Smart policy group is to replace the original automatic testing groups (url/load-balance/fallback), greatly optimizing the experience while minimizing the need for manual intervention in policy groups. Users only need to put the available policies into this group.

For details, see: https://kb.nssurge.com/surge-knowledge-base/guidelines/smart-group

### 

[](#rule-system)

Rule System

*   Overall performance optimization of the rule system.
    
*   Significant optimization of the indexing algorithm in large domain rule sets, improving the search efficiency by more than ten times for rule sets with more than 100,000 rules.
    
*   Corrected the issue where sub-rules of logical rules within a rule set could not be covered by the `no-resolve` and `extended-matching` parameters of the rule set.
    
*   Added a new rule type `DOMAIN-WILDCARD`, supporting `?` and `*` domain name matching.
    
*   `DOMAIN-SET` and `RULE-SET` are changed to strict validation. If there are invalid lines in the file, the entire rule set will be invalidated to avoid problems caused by misuse.
    

### 

[](#ipv6)

IPv6

*   The behavior of the `ipv6-vif` parameter has been modified. When set to always, IPv6 functionality will be enabled even if `ipv6=true` is not set.
    
*   Added a warning for the `ipv6-vif=always` parameter.
    
*   Adjusted the automatic retry mechanism. Accessing IPv6 addresses in a non-IPv6 network will no longer enter the retry process, and the request will fail immediately (solving the problem of some applications stalling when IPv6 VIF is enabled in a non-IPv6 environment, but the application will still continue to send IPv6 requests).
    

### 

[](#other-optimizations)

Other Optimizations

*   Enhanced `$notification.post`, adding support for media resources, sound hints, and automatic dismissal.
    
*   Optimized WireGuard failure handling.
    
*   Reduced the power consumption of the TUIC protocol during sleep.
    
*   Improved the precision of time statistics in the request log system, now accurate to µs level.
    
*   Optimized various abnormal retry mechanisms, avoiding high resource usage caused by continuous retry in the face of some specific problems. For operations that need to be retried continuously (such as WireGuard reconnection, Ponte server reporting to iCloud), Surge will now retry after 0.1s, 0.5s, 1s, 5s, 10s, 30s after an error.
    
*   Optimized the caching system for external resources.
    
*   Added the profile line modifier `#!REQUIREMENT`.
    

### 

[](#detail-adjustments)

Detail Adjustments

*   Limited the length of logs that can be written to request notes in debug mode by scripts.
    
*   Changed the default UDP test target to 1.0.0.1.
    
*   If incorrect types of fields are passed when using API in scripts, it will result in script errors.
    
*   After the script is completed or times out, unfinished $httpClient will no longer call the callback function.
    

### 

[](#issue-fixes)

Issue Fixes

*   Fixed the issue where the HTTP Body captured from remote devices could not be read in the Dashboard.
    
*   Fixed the problem where Header Rewrite rules could not match URLs based on the Host field.
    
*   Corrected the issue where ip-version and tos parameters could not take effect when testing proxies.
    
*   Fixed the crash issue caused by mistakenly passing null when executing scripts via HTTP-API.
    

https://dl.nssurge.com/mac/v5/Surge-5.7.0-2724-acaafccea020f6afdc758c83057ffcbb.zip

### 

[](#version-5.6.0)

Version 5.6.0

#### 

[](#new-feature)

New Feature

*   Mock (Map Local) feature fully enhanced.
    
    *   Added data types such as `text`, `tiny-gif`, `base64` for inline direct data return.
        
    *   Added `status-code` parameter
        
    *   UI related configurations have not been updated yet. For usage methods, see the documentation: https://manual.nssurge.com/http-processing/mock.html
        
    
*   When the parameter `encrypted-dns-follow-outbound-mode=true` is configured, if a DoH/DoQ/DoH3 connection matches a proxy server using a domain name, and if there is a DNS Local Mapping record for that proxy server's domain name containing an IP address or traditional DNS server, then it is permissible to query through that proxy server. (Querying DNS through a proxy server will break CDN optimization, leading to severe slowness when loading images and videos. Unless there are very special requirements and it is not necessary to configure in this way, domain rules should be used to ensure requests are directly queried by the proxy server.)
    
*   Added feature Body Rewrite, see documentation for details: https://manual.nssurge.com/http-processing/body-rewrite.html- Added recognition for STUN packets, which can be matched using PROTOCOL,STUN. Similar to QUIC, to ensure compatibility, PROTOCOL,UDP can also continue to match STUN traffic.
    

#### 

[](#enhancements)

Enhancements

*   Optimized request logging. Now the specific rules matched for URL Rewrite and Header Rewrite will be displayed.
    
*   Adjusted the logic of how the DNS engine handles empty results. Now when multiple DNS servers are configured, it no longer waits for all servers to respond with empty results in order to avoid additional waiting when AAAA records do not exist. (However, since the behavior of DNS servers may vary in different environments, observe whether this change causes side effects; please provide feedback if issues arise causing abnormal results.)
    
*   Canceled warning notifications when ICMP exceeds limits
    

### 

[](#fixes)

Fixes

*   Enhanced compatibility when decompressing HTTP Body.
    
*   Fixed a crash in Surge caused by passing some incorrect types of parameters in scripts.
    
*   Adapted to new system restrictions, fixed the issue where selecting to display the main window is ineffective in some cases
    
*   Fixed compatibility issues with non-https WebSocket in proxy mode and the new version of Safari
    

https://dl.nssurge.com/mac/v5/Surge-5.6.0-2611-efc3b7ebb3872061e9a6a4917742e203.zip

### 

[](#version-5.5.0)

Version 5.5.0

#### 

[](#module)

Module

*   Added several new official modules; official modules can now be dynamically updated.
    
*   Modules have a new classification field for convenient access and categorization in the UI.
    
*   Modules now accept parameter tables, supporting multiple parameters. Parameters will be used to modify module content through text replacement.
    

#### 

[](#script)

Script

*   New script execution engine. Optimized execution performance and memory usage.
    
*   $httpClient has added several practical parameters. For more details on the updates above, see the documentation.
    

#### 

[](#enhancements-1)

Enhancements

*   New parameter: always-raw-tcp-keywords. For usage, refer to documentation.
    
*   Added SRC-PORT rule for matching client port numbers.
    
*   IN-PORT/SRC-PORT/DEST-PORT three rules are categorized as port number rule types, supporting three kinds of expressions:
    
    *   Directly writing the port number, such as IN-PORT,6153
        
    *   Port number closed interval: such as DEST-PORT,10000-20000
        
    *   Using >, <, <=, >= operators, such as SRC-PORT,>=50000
        
    
*   The UI can now maintain pure empty lines from original configurations after editing.
    

#### 

[](#fixes-1)

Fixes

*   Corrected a detail issue with QUIC flow control and optimized latency performance for Ponte/TUIC/Hysteria2 protocols.
    
*   After editing a single rule, the notification-related parameters will be retained.
    

https://dl.nssurge.com/mac/v5/Surge-5.5.0-2586-ed7ce88d6b2a286537ff5402324cb7fe.zip

### 

[](#version-5.4.3)

Version 5.4.3

*   Rewrote the virtual IP database, now the database can automatically clean up data based on the last time of use.
    
*   Fixed some issues that may occur when using Snell v4 with WireGuard and enabling reuse.
    
*   For DNS requests with illegal domain names, an empty result response will be generated instead of being directly ignored.
    
*   `tun-included-routes` and `tun-excluded-routes` parameters now supports IPv6 CIDR block when IPv6 VIF is enabled.
    
*   Support configuring no-resolve for built-in rule sets/Inline rule sets.
    
*   Surge Ponte connections no longer validate peer addresses to ensure normal operation in certain special scenarios.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.4.3-2540-511d4692c27626166bbcbb61fdd56bc8.zip

### 

[](#version-5.4.2)

Version 5.4.2

*   Fixed an issue that the built-in rule set LAN failed to correctly trigger DNS resolution.
    
*   Fixed an issue that could cause a crash when handling some malformed UDP packets.
    
*   Fixed an issue that the system that could potentially misjudge has been restarted, causing the Fake IP table to be cleared.
    
*   Fixed a compatibility issue with a specific HTTP server.
    
*   Compatible with some non-standard SOCKS5 UDP server implementations, adjusted errors to warnings.
    
*   Other bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.4.2-2502-001dc6b9672b7e79f92ca5cd3be6baf2.zip

### 

[](#version-5.4.1)

Version 5.4.1

#### 

[](#rule-engine-optimizations)

Rule Engine Optimizations

*   The implementation of RULE-SET and DOMAIN-SET has been completely rewritten. Now, Surge automatically preprocesses and indexes rule sets during resource updates, significantly increasing the matching speed.
    
    1.  There is no longer any difference in performance and memory usage between RULE-SET and DOMAIN-SET types of rule sets, allowing flexible usage.
        
    2.  There is no longer a restriction in DOMAIN-SET rule sets that prevents the use of eTLDs.
        
    3.  The matching speed for DOMAIN, DOMAIN-SUFFIX, IP-CIDR, and IP-CIDR6 rules in RULE-SET has been greatly improved.
        
    4.  A DOMAIN/DOMAIN-SUFFIX rule set with approximately 100,000 entries used to take 100ms for a single match in the old version; now, it only takes single-digit ms.
        
    5.  An IP-CIDR rule set with approximately 10,000 entries used to take about 0.1ms for a single match in the old version. The new version only needs 0.0002ms, an improvement of about 500 times. The performance improvement for IP-CIDR6 rules is even greater.
        
    6.  In the new version, building a regional IP address collection using the IP-CIDR rule set offers the same performance as directly using the internal GEOIP rule.
        
    7.  The Inline Ruleset added in the previous version does not benefit from this optimization, but there is virtually no difference at the scale of hundreds of entries.
        
    8.  In previous versions, rules within a Ruleset were matched one by one from top to bottom. If rules requiring DNS resolution were included, DNS would only be triggered when starting to match that sub-rule. In the new version, if any rule requiring DNS resolution is included in the rule set, DNS resolution will occur before testing that rule set. (In most cases, there is no difference)
        
    
*   Main ruleset matching efficiency has been slightly optimized.
    
*   The efficiency of IP-CIDR6 rules has been significantly improved even in non-indexed situations.
    
*   RULE-SET rules can now be configured directly with parameters no-resolve and extended-matching, which are equivalent to configuring all sub-rules with these parameters.
    
*   DOMAIN-SET rule sets also support configuration with extended-matching.
    

#### 

[](#minor-optimizations)

Minor Optimizations

*   Now, when performing MITM, the certificate used for signing will be sent to the client together, to support using intermediate certificates for MITM.
    
*   All comments (at the beginning and end of lines) can now use `#`, `//`, `;` three common comment symbols.
    
*   Profile error message prompt optimization, now it can give the exact line number where the error occurred more accurately.
    
*   Optimize Surge Ponte error handling process, correct the issue where device information is not automatically updated under certain errors.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.4.1-2495-041f47425e9ecf56580562ce01560448.zip

### 

[](#version-5.4.0)

Version 5.4.0

#### 

[](#new-features-1)

New Features

*   Protocol sniffing
    
    Requests to port 80 and 443 will wait for the client to send the first packet, then extract the SNI and other information for the rule system to judge.
    
    *   `DOMAIN`, `DOMAIN-SUFFIX`, `DOMAIN-KEYWORD` rules add an optional parameter called `extended-matching`. When this parameter is enabled, the rule will try to match both the SNI and the HTTP Host Header (or :authority).
        
    *   Added a parameter called `always-raw-tcp-hosts`, used to forcibly turn off active protocol detection for specific hostnames.
        
    
*   New proxy protocol support: Hysteria 2
    
    Hysteria 2 is a proxy protocol optimized for unstable and packet-loss-prone network environments, based on UDP/QUIC.
    
*   Automatic QUIC blocking
    
    Since most proxy protocols are not suitable for forwarding QUIC traffic, Surge will now automatically block QUIC traffic to make it fallback to HTTPS/TCP protocol, ensuring performance. For QUIC traffic that hits the MITM hostname, it will also be automatically rejected.
    
*   ECN (Explicit Congestion Notification) support for QUIC-based protocols
    
    Significantly improved the performance of the Vector(Surge Ponte)/TUIC/Hysteria 2 protocol.
    

#### 

[](#optimizations)

Optimizations

*   Reworked HTTP capture functionality
    
    *   The related settings are no longer stored in the configuration, the `[Replica]` section has been deprecated.
        
    *   Added an automatic shut-off setting after turning on the capture switch, which can automatically stop capturing based on time, size, or the number of requests.
        
    *   Added automatic activation of MITM after turning on the capture switch, which can be additionally turned on for specific hostnames. (Even if the main MITM switch is off).
        
    *   Added an option to only save HTTP/HTTPS requests after turning on the capture switch.
        
    
*   Improved compatibility with some non-standard protocols.
    
*   When testing the Ponte policy, the test URL has been changed from `proxy-test-url` to `internet-test-url`.
    
*   Following the WireGuard protocol standard recommendation, WireGuard handshake packets will now be tagged with 0x88 (AF41) DSCP to increase the success rate.
    
*   When forwarding UDP packets via WireGuard, it supports retaining the TOS(DSCP/ECN) tag of packets inside the tunnel.
    
*   Based on the WireGuard protocol standard recommendation, Surge will copy the ECN tag from packets inside the tunnel to packets outside. When receiving packets with an ECN tag, they will be strictly merged according to RFC6040. (`ecn=true` must be set for the policy).
    
*   UDP NAT can close the UDP session early based on ICMP messages.
    
*   Improved PMTU support for QUIC.
    

#### 

[](#bug-fixes-1)

Bug Fixes

*   Fixed the issue where the external resources of rule sets needed to be reloaded to take effect after updates.
    
*   After a network switch, it will forcefully break the original long connection of DoH/DoQ/DoH3 to avoid obtaining results that are not suitable for the current network environment.
    
*   Fixed the issue where invalid certificates might cause the key store interface to crash.
    
*   When performing MITM on HTTPS requests that directly connect using an IP address, the IP address should not be sent as SNI, as this might cause compatibility issues.
    
*   Other bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.4.0-2470-d6f513ab6e647abc29490f1f3506667f.zip

### 

[](#version-5.3.2)

Version 5.3.2

*   Surge Mac is now ready for macOS Sonoma.
    
*   External resources can now be remotely managed and updated by Surge iOS.
    
*   Fixed the issue where the location permission request could not be correctly triggered.
    
*   Surge Web Dashboard upgraded to version 2.0.4.
    
*   Other improvements.
    

https://dl.nssurge.com/mac/v5/Surge-5.3.2-2393-f4b3e5e9a7bc5b73106ace7b0776eefe.zip

### 

[](#version-5.3.1)

Version 5.3.1

*   Surge Dashboard now can directly create temporary rules for local and remote Surge instances.
    
*   Surge Web Dashboard now upgraded to version 2.0.
    
*   Added Inline Ruleset, which allows the Ruleset to be written directly in the main profile
    
*   Module enhanced. Modules can now operate \[WireGuard \*\] and \[Ruleset \*\] sections.
    
*   Added an HTTP API for obtaining CA certificates (DER format): GET /v1/mitm/ca.
    
*   Fixed that MITM failed records could not be correctly generated.
    

https://dl.nssurge.com/mac/v5/Surge-5.3.1-2383-066f883d96a472655c9ea7be50475b8b.zip

### 

[](#version-5.3.0)

Version 5.3.0

*   You can now directly access the Remote Dashboard of registered devices through Surge Ponte.
    
*   The Surge Dashboard can now operate the policy group and outbound options of remote devices.
    
*   macOS Sonoma now requires location permissions to obtain the SSID. If related rules and subnet settings are used, Surge will prompt for location permissions.
    
*   Fixed a bug that the override of a policy group cannot be canceled remotely.
    
*   Corrected the compatibility issue between VIF and specific devices.
    
*   Surge Ponte improvments.
    
*   Minor bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.3.0-2375-bc1b4791973df9aba493c3190a7b0050.zip

### 

[](#version-5.2.3)

Version 5.2.3

*   You can now create a new modifiable profile based on an existing profile. In this new profile, the selected sections will reference the corresponding content in the original profile and will automatically synchronize with the original profile. At the same time, unselected sections in the new profile can be modified freely without being affected by the original profile. (The UI for the detached profile feature.)
    
*   The detached profile now can include the Enterprise profile.
    
*   Fixed the issue that it was impossible to connect when the SSH server configured a banner.
    
*   You can now use the UI to edit ShadowTLS parameters.
    
*   Optimize performance in VIF v1 mode for ARM64 architecture. When the VIF mode is set to automatic, the new version will automatically use the v1 engine under M1/M2 processors, with a maximum performance of ~8Gbps, thereby avoiding compatibility and stability issues.
    
*   Correct the issue where the opening position of the Dashboard main window may be incorrect.
    

https://dl.nssurge.com/mac/v5/Surge-5.2.3-2354-ce8606235be8df196c0e9619a9c8cbbd.zip

### 

[](#version-5.2.2)

Version 5.2.2

*   Fixed the problem where there might be incorrect prompts about system proxy settings being modified by other applications when there is no valid network.
    
*   Fixed some issues that may occur when using TUIC v5 as the underlying-proxy.
    
*   Fixed the issue where if WebSocket is enabled, it cannot correctly construct a WebSocket request when directly using an IPv6 address as the vmess hostname.
    
*   Provide clearer error prompts when the SOCKS5 server does not support UDP relay.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.2.2-2340-74b1e55a52888040394976468a61d973.zip

### 

[](#version-5.2.1)

Version 5.2.1

*   Surge Ponte now can work in LAN-only mode when NAT type doesn't meet the requirement. Devices on same LAN can still access.
    
*   The connection limiter mechanism added in the previous version has been temporarily removed.
    
*   Optimize the logic of setting as system proxy function.
    
*   Fixed a memory leak issue.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.2.1-2333-ef97cd79e935d838387dc99712fb38b3.zip

### 

[](#version-5.2.0)

Version 5.2.0

*   Due to the fixed size of macOS network stack memory, when the network stack buffer is exhausted, the kernel will automatically close the program with the highest occupancy to release resources. This problem may occur when using Surge to take over P2P downloaders. This version will automatically check for this issue and enter safe mode automatically.
    
*   Surge VIF engine has been upgraded to v3, no longer relying on Packet Filter (pf), solving compatibility issues with virtual machines and network sharing functions. At the same time, connection number limits have been added to avoid system resource exhaustion caused by excessive concurrent requests.
    
*   Add a connection limiter for single processes and single devices to avoid consuming large amounts of resources for individual devices.
    
*   Support for QUIC's PMTU discovery, which improves the performance of Surge Ponte and TUIC protocols.
    
*   Optimize error handling logic of QUIC-based protocols.
    
*   When forwarding UDP packets using TUIC v5, follow the DF flag of the IP packet. Avoid the issue that can occur when visiting the QUIC website with TUIC v5.
    
*   Other bug fixes and optimizations.
    

https://dl.nssurge.com/mac/v5/Surge-5.2.0-2302-721d7db5429609c5a54af922f045a509.zip

### 

[](#version-5.1.1)

Version 5.1.1

*   Added support for TUIC v5 protocol.
    
*   Optimized the performance of Surge Ponte/TUIC.
    
*   Optimized the request Note recording when the strategy group is abnormal.
    
*   Fixed the problem that connection reuse was not done correctly under MITM H2 mode.
    
*   Fixed the problem that the request of $httpClient/DoH may sometimes be accidentally cancelled.
    
*   Adjusted the traffic characteristics of Snell v4 protocol.
    
*   Other bug fixes and optimizations.
    

https://dl.nssurge.com/mac/v5/Surge-5.1.1-2264-6f04d8ac1bbf1c91178a09124e45e37e.zip

### 

[](#version-5.1.0)

Version 5.1.0

#### 

[](#surge-ponte)

Surge Ponte

*   Surge Ponte supports cross-iCloud account sharing.
    
*   Fixed issues that might occur when accessing HTTP/1.0 servers via Surge Ponte or TUIC protocol. (e.g. ASUS router management page)
    

#### 

[](#interface)

Interface

*   Icon Library: You can now select icons for your device from a library of about 7000 icons.
    

#### 

[](#proxy-protocol-related)

Proxy Protocol Related

*   Fixed an issue that the reuse feature could not work properly under Snell V4.
    
*   SSH protocol now supports server public key fingerprint pinning, see the manual for usage.
    

#### 

[](#scripts)

Scripts

*   $httpClient supports binary mode.
    
    *   The body of the request supports TypedArray.
        
    *   Passing in binary-mode: true in the request parameters allows the return result to be returned as TypedArray.
        
    
*   Fixed the problem that `http-request` type scripts could not use binary data directly as response.
    

#### 

[](#others)

Others

*   Policy group adds parameter `external-policy-modifier`, which can be used to adjust external policies.
    
*   Optimized the request log system
    
    *   Added category marks to the logs.
        
    *   Rule system adds more output for DNS and rulesets.
        
    
*   Other bug fixes and optimizations.
    

https://dl.nssurge.com/mac/v5/Surge-5.1.0-2216-82115a08df678cfa87137a506f7df061.zip

### 

[](#version-5.0.3)

Version 5.0.3

*   Added UDP relay support for the VMess protocol
    
    *   Since the VMess server-side supports UDP forwarding by default, there's no need to add extra parameters to use it.
        
    *   Due to design flaws in the VMess protocol, when using VMess to forward UDP traffic, P2P scenarios may not work, such as voice calls, online gaming, etc. Therefore, it is not recommended to use the VMess protocol.
        
    
*   SSH protocol now supports specifying the server's public key fingerprint. Check the manual for more information.
    
*   The external IP address is now obtained through the STUN protocol and no longer relies on api.my-ip.io.
    
*   The DDNS now uses the secured IPv6 address instead if a temporary one, when IPv6 is selected.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.0.3-2199-c241935acf37b3ec7f7fa4f5120e8690.zip

### 

[](#version-5.0.2)

Version 5.0.2

*   Due to the new privacy restrictions on macOS, if the Wi-Fi BSSID-related features are used, Surge will request location service permissions to read the Wi-Fi BSSID.
    
*   Shadow TLS v3 is now supported. Append `shadow-tls-version=3` to enable it.
    
*   Surge Mac now supports Adaptive TLS Fingerprint. For more information, please check the community thread.
    
*   Supports a new parameter `external-policy-modifier` for groups to modify the parameters of external policies.
    
*   The new proxy client notification will only be prompted when a real request is received and will no longer be displayed when being port scanned.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.0.2-2186-2ab1aba0dc49688683b2e4d43200e468.zip

### 

[](#version-5.0.1)

Version 5.0.1

*   The registered Ponte device view is now available when the Ponte switch in off.
    
*   Fixed a crash while using Surge Dashboard via USB.
    
*   $httpClient now supports binary mode.
    
*   Bug fixes.
    

https://dl.nssurge.com/mac/v5/Surge-5.0.1-2162-22743a4d2f1e0aeb0b872e8f544c2e69.zip