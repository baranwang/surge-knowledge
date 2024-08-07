Snell Protocol
==============

Snell is a lean encrypted proxy protocol developed by our team. Here are some highlights:

*   Extreme performance.
*   Support UDP over TCP relay.
*   Single binary with zero dependencies. (except glibc)
*   A wizard to help you start.
*   Proxy server will report remote errors to the client if an error encounters. Clients may choose countermeasures for different scenarios.

> The Snell protocol is intended for Surge users only. Please do not reverse-analyze the protocol and make a compatible client of it. We want to keep the user base as small as possible, thanks for understanding.

You can download the standalone server binary from here:

[https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip](https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip)

[https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-i386.zip](https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-i386.zip)

[https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-aarch64.zip](https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-aarch64.zip)

[https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-armv7l.zip](https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-armv7l.zip)

The latest version is v4, which is not compatible with the previous versions like before. Please upgrade both the client (Surge iOS & Surge Mac) and the server binary.

    [Proxy]
    Proxy = snell, 1.2.3.4, 6333, psk=RANDOM_KEY_HERE, version=4
    

Release Notes
-------------

### v4.0.1

Fixed a bug that UDP packets can't be forwarded to IPv6 addresses.

Surge Mac as Snell Proxy Server
-------------------------------

You may also use Surge Mac as a Snell proxy server (Starting from version 3.1.0). Add the following lines to your profile.

    [Snell Server]
    interface = 0.0.0.0
    port = 6160
    psk = RANDOM_KEY_HERE
    

The embedded Snell server in Surge uses the Snell V1 protocol.