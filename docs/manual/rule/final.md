Final Rule
==========

The FINAL rule must be written after all other rules. It defines the default policy for requests which are not matched by any other rules.

Example:

```
[Rule]
DOMAIN-SUFFIX,company.com,ProxyA
DOMAIN-KEYWORD,google,DIRECT
GEOIP,US,DIRECT
IP-CIDR,192.168.0.0/16,DIRECT
FINAL,ProxyB
```

### Options

#### Option: dns-failed

Use the FINAL rule if the DNS lookup fails during rule evaluation. This option only makes sense when used with a non-DIRECT policy.