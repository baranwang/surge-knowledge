1.  [Release Notes](/surge-knowledge-base/release-notes)

Surge Mac 5.0
=============

Since the release of Surge Mac 4 in 2020, we have provided numerous heavyweight free updates for Surge Mac 4 over the past three years, such as:

*   Version 4.0.5 supports Cloud Notification, allowing you to receive Surge Mac status reminders pushed on Surge iOS.
    
*   Version 4.1.0 provides UI editing support for scripts, supports separate configuration files, supports HTTPS-API, and supports SUBNET rules.
    
*   Version 4.2.0 has a built-in Web Dashboard.
    
*   Version 4.2.1 supports Surge Private DDNS and external IP address queries.
    
*   Version 4.3.0 supports remote device management using Dashboard, and adds a history view of traffic.
    
*   Version 4.4.0 supports using WireGuard as a general proxy policy.
    
*   Version 4.5.0 greatly enhances the nesting of policy groups, supporting various complex cross-references.
    
*   Version 4.6.0 adds support for using SSH as a general proxy policy.
    
*   Version 4.7.0 supports using HTTP/2 for MITM.
    
*   Version 4.8.0 supports DNS over QUIC and DNS over HTTP/3.
    
*   Version 4.9.0 Surge VIF starts supporting IPv6 traffic processing.
    
*   Version 4.10.0 adds support for Snell V4, TUIC, ShadowTLS and other protocols.
    

Now, we've decided to move to version 5.0.

[](#new-features)

New Features


-----------------------------------

### 

[](#surge-ponte)

Surge Ponte

Surge Ponte is a private mesh network between Surge Mac and iOS devices.

*   No complicated configuration required, just a one-time setup with the wizard.
    
*   Surge automatically selects the most suitable channel to establish a connection, including LAN connection, NAT traversal, and proxy forwarding.
    
*   Always uses end-to-end encryption.
    
*   Device information and encryption keys are synced through your iCloud, with no data passing through our servers, ensuring complete data isolation.
    

For detailed configuration instructions on Surge Ponte, please see: [Surge Ponte Guide](/surge-knowledge-base/guidelines/ponte)

### 

[](#new-surge-vif-mode-engine)

New Surge VIF Mode Engine

In Surge Mac 5.0, Surge VIF uses a completely new working method, greatly reducing the overhead of user mode and kernel mode switching, significantly improving the performance of enhanced mode and gateway mode. Even on a MacBook Air with an Intel Core i5 processor, loopback network performance can reach ~8Gbps, and ~30Gbps on an M2 processor.

This means not only can Surge Mac fully carry a 10GbE network, but also that CPU power consumption will be lower even at low bandwidth usage.

![](https://kb.nssurge.com/~gitbook/image?url=https%3A%2F%2F856006905-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FqrBG3qqNVELxHgiBGHTv%252Fuploads%252Fgit-blob-1e14a3faf07a119b16c9d3c0f82f894ae5d7bb05%252Fmac-v5-iperf.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=10892759&sv=2)

Note: The new engine may cause compatibility issues, please report any issues and configure `legacy-vif=true` parameter to use the old engine if needed.

### 

[](#new-service-overview-view)

New Service Overview View

![](https://kb.nssurge.com/~gitbook/image?url=https%3A%2F%2F856006905-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FqrBG3qqNVELxHgiBGHTv%252Fuploads%252Fgit-blob-1893aa4aca5daa31bdc23bbef2a16981cbf1a3fd%252Fmac-v5-overview.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=f9d6d046&sv=2)

The new Service Overview view makes it easy to see the status of various Surge services and control them.

### 

[](#new-vector-protocol)

New Vector Protocol

To meet the needs of Surge Ponte, we developed a new QUIC/UDP-based proxy protocol: Vector. Currently, it only supports Surge Mac 5.0 as the Vector server, and in the future, we will release standalone binary server programs for other operating systems.

### 

[](#proxy-diagnostic-tool)

Proxy Diagnostic Tool

A new proxy policy diagnostic window has been added, which can be opened from Menu Bar › Window › Proxy Diagnosis, and can be used to test whether the proxy is working properly and the UDP NAT type of the proxy. In addition, the tool can directly test proxies in external policy groups.

### 

[](#detail-optimization)

Detail Optimization

A major version upgrade means we will refactor various outdated internal codes, re-examine whether each feature works correctly, and fix many long-standing minor issues in the process. (Surge Mac 4 will also receive a bug fix update)

Some other ideas and developments in progress have not yet been released, and we will release them gradually according to the development progress or postpone them to later minor updates.

### 

[](#more)

More

Surge Mac 5.0 is just a new beginning, just like the v4 version, we will bring more free new features in subsequent updates. If you are not satisfied with the new features now, you can wait to upgrade later.

### 

[](#detail-updates)

Detail Updates

*   Subnet settings can now be configured via UI.
    
*   Policy group editing page redone, supporting UI configuration for all advanced features.
    
*   DHCP can be set to automatically use Surge as the gateway for new devices.
    
*   Modules can now be updated automatically.
    
*   Quick rule configuration feature supports additional browsers: Arc, Safari Technology Preview, Chrome Beta/Dev/Canary, Edge Beta/Dev/Canary.
    
*   Script editor is now a separate window, no longer blocking the main window.
    
*   Added `DEVICE-NAME` rule, which can be used to match Ponte devices or DHCP devices access.
    
*   Introduced `FAILED` built-in policy for marking request failures in special cases (e.g., policy group cannot be loaded, Ponte feature not enabled), instead of using REJECT.
    
*   Modified SOCKS5 proxy request type display to TCP, and can confirm in Notes that it is taken over by SOCKS5 proxy. The same goes for Vector requests.
    
*   Supports configuring DNS over QUIC/H3 servers for domain names in `[Host]`.
    

[](#upgrade-pricing-policy)

Upgrade Pricing Policy


-------------------------------------------------------

*   Users who purchased Surge Mac v4 since October 15, 2022, can update to Surge Mac 5 for free.
    
*   Users who purchased between April 15, 2022, and October 14, 2022, can upgrade at the lowest price of $1.99, depending on the purchase date.
    
*   Users who purchased before April 15, 2022, the upgrade prices are
    
    *   1 device license: $34.99
        
    *   3 device licenses: $48.99
        
    *   5 device licenses: $69.99
        
    

Visit [https://nssurge.com/buy\_now?upgrade=true](https://nssurge.com/buy_now?upgrade=true) for specific prices and upgrade options.

[](#upgrade-method)

Upgrade method


---------------------------------------

Starting today, you can manually download and start using Surge Mac 5.0, download link: [https://dl.nssurge.com/mac/v5/Surge-latest.zip](https://dl.nssurge.com/mac/v5/Surge-latest.zip)

Surge Mac v4 users will receive an automatic update prompt in a few days.

The licenses for users who can upgrade for free and newly purchased users have been automatically upgraded to v5.

[](#frequently-asked-questions)

Frequently Asked Questions


---------------------------------------------------------------

### 

[](#how-is-it-calculated-if-the-license-has-been-upgraded-before-e.g.-from-1-device-to-3-devices)

How is it calculated if the license has been upgraded before (e.g., from 1 device to 3 devices)?

The order amount and time will be weighted average, for example, if you purchased a 1-device license on 2021/7/27 and upgraded to a 3-device license on 2022/8/23, the equivalent purchase time is 2021/12/20.

`(1532649600 * 49.99 + 1566518400 * 29.99) / (49.99 + 29.99) = 1545349341`

### 

[](#can-i-continue-using-the-old-version-after-upgrading)

Can I continue using the old version after upgrading?

Yes, but the device quantity limit is shared.

### 

[](#what-if-i-want-to-upgrade-the-number-of-licensed-devices-at-the-same-time)

What if I want to upgrade the number of licensed devices at the same time?

If upgrading from v3/v4 licenses, you can upgrade the number of licenses at the same time during the upgrade, which is $10 cheaper than upgrading to v4 first and then upgrading the number.

### 

[](#i-currently-have-a-v2-version-license-can-i-get-a-discount-for-the-upgrade)

I currently have a v2 version license, can I get a discount for the upgrade?

The v2 version licenses no longer enjoy upgrade discounts, please purchase a new one directly.

### 

[](#what-if-i-dont-want-to-upgrade)

What if I don't want to upgrade?

You can permanently continue to use Surge Mac 4.