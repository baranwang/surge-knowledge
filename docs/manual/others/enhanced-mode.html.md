Enhanced Mode (Surge Virtual Network Interface, VIF)
====================================================

Some applications may not follow the system proxy settings. Using the enhanced mode in Surge can ensure all applications are handled.

To accomplish this, Surge creates a virtual network interface (VIF) and registers it as the default route. All DNS queries are answered with a virtual IP in the 198.18.0.0/15 block.

It is important to note that the Surge VIF can only process TCP, UDP, and ICMP traffic. Therefore, only enable this feature when necessary. Additionally, it is not possible to proxy ICMP traffic, so the Surge VIF will return a response directly.

The enhanced mode is enabled by default on Surge for iOS, while on Surge for Mac, it must be manually started.