Common Policy Parameters
========================

### Egress Parameters

All of these parameters are available for both built-in and proxy policies.

#### `interface` (Default: automatically)

Force to use a specified outgoing network interface.

```
ProxyHTTP = http, 1.2.3.4, 443, username, password, interface = en2
```

Direct policy alias supports the "interface" parameter like a proxy policy.

```
[Proxy]
Corp-VPN = direct, interface = utun0
WiFi = direct, interface = en2, allow-other-interface=true
```

Please ensure the interface has a valid route table for the destination address.

#### `allow-other-interface` (Boolean, Default: false)

When the option is true, if the desired interface is unavailable, Surge is allowed to use the default interface to bind the connection. Otherwise, the connection fails directly.

```
ProxyHTTP = http, 1.2.3.4, 443, username, password, interface = en2, allow-other-interface=true
```

### `no-error-alert` (Boolean, Default: false)

Do not show error alerts for this policy.

#### `ip-version`

Choose the behavior between IPv4 and IPv6 protocols. The option just affects the connection to the proxy server. Therefore it only makes sense when the proxy server's hostname is a domain. If the underlying proxy is configured, this option has no effect since the DNS resolution happens remotely.

*   dual (Default, use the fastest link)
*   v4-only
*   v6-only
*   prefer-v4
*   prefer-v6

#### `hybrid` (Boolean, iOS Only, Default: false)

Set up the connection with cellular data and Wi-Fi simultaneously, then use the faster link.

#### `tfo` (Boolean, Default: false)

Enable TCP Fast Open.

#### `tos` (Decimal or Hexadecimal, Default: 0)

Customize the IP TOS value.

#### `ecn` (Boolean, Default: false) iOS 5.8.0+ Mac 5.4.0+

Turn on Explicit Congestion Notification if possible.

### `block-quic` iOS 5.8.0+ Mac 5.4.0+

Forwarding QUIC traffic through a proxy may cause performance issues. Enabling this option will block QUIC traffic, causing the client to fall back to the traditional HTTPS/TCP protocol.

*   `auto`: Automatically enable based on whether the proxy is suitable for forwarding QUIC traffic.
*   `on`: Block QUIC traffic.
*   `off`: Do not block QUIC traffic.

### Testing

#### `test-url`

Example: `test-url=http://google.com`

Override the global testing URL. The URL is used for availability and latency testing. Surge test and benchmark the proxy by performing an HTTP HEAD request to the URL.

#### `test-timeout` (In seconds)

Override the global testing timeout.

#### `test-udp`

Example: `test-udp=google.com@1.1.1.1`

Override the global `proxy-test-udp` settings for the proxy. Surge test and benchmark the UDP relay by performing a DNS lookup.