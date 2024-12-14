1.  [Guidelines](/surge-knowledge-base/guidelines)

Gateway Mode Performance Troubleshooting
========================================

This document provides a troubleshooting guide for performance issues when using Surge Mac in gateway mode.

### 

[](#common-issues)

Common Issues

Please first rule out the following common issues:

*   Wireless Network
    

Please be sure to use a wired connection, as connecting the gateway device wirelessly will significantly impact performance.

*   MTU Settings
    

Do not configure Jumbo MTU. Although Surge fully supports Jumbo MTU, many devices may still have issues with Jumbo MTU. Please turn off Jumbo MTU at least during the troubleshooting phase.

*   10Gb Network
    

Several cases of performance anomalies have been observed on 10Gb networks. These issues often occur in networks where 10Gb devices and 1000Mbps devices are mixed, and are suspected to be related to TCP congestion control and packet loss policies when there is a rate mismatch. If you are using a 10Gb network, it is recommended to force it to 1000Mbps during the troubleshooting phase.

(This issue is not specific to Surge Mac and has been reported on various operating systems and network devices. If you confirm it is this issue, you can try replacing the switch and network adapter.)

### 

[](#performance-troubleshooting-steps)

Performance Troubleshooting Steps

1.  External Network Performance Test
    

First, you should test whether the external network speed meets expectations. Turn off Surge on the gateway device and run various speed test tools, such as [SpeedTest](https://www.speedtest.net/) and [WiFiman](https://wifiman.com/). If the external network speed is below expectations, please troubleshoot the router, switch, and Ethernet cable, and contact your ISP for assistance.

1.  Internal Network Device Link Test
    

You should test the link speed between the internal network devices and the gateway device, using tools like iperf3. To avoid the complex interference of wireless networks, it is recommended to use wired devices for testing. The bidirectional speed should reach 900Mbps+ in a gigabit network.

1.  Gateway Device Performance Test
    

Turn on Surge on the gateway device, create a new blank configuration to avoid interference, and run various speed test tools again. The test results should be consistent with the results in Step 1. If the results are lower than expected, monitor the system's CPU usage during the test. Surge has excellent performance optimization and is unlikely to encounter device hardware performance bottlenecks on Mac devices produced within the last 5 years (in gigabit networks). If you confirm it is this issue, try reinstalling the operating system and testing again.

1.  Proxy Performance Test
    

If you are using an encrypted proxy, configure the proxy in Surge, use global proxy mode in combination with speed test tools, and perform speed tests again. The results of this step are limited by two factors: proxy server bandwidth and gateway device performance. Similarly, Surge has excellent performance optimization and is unlikely to encounter device hardware performance bottlenecks on Mac devices produced within the last 5 years (in gigabit networks). If you confirm it is this issue, try reinstalling the operating system and testing again.