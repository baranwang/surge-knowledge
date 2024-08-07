IP-based Rule
=============

There are 3 IP-based rule types. A IP-based rule will trigger a DNS lookup if the hostname of the request is a domain. If the DNS lookup fails, Surge will abort the rule testing and report an error.

#### IP-CIDR

    IP-CIDR,192.168.0.0/16,DIRECT
    IP-CIDR,10.0.0.0/8,DIRECT
    IP-CIDR,172.16.0.0/12,DIRECT
    IP-CIDR,127.0.0.1/8,DIRECT
    

Rule matches if the IP address of the request matches a specified range.

#### IP-CIDR6

    IP-CIDR6,2001:db8:abcd:8000::/50,DIRECT
    

Rule matches if the IPv6 address of the request matches a specified range.

#### GEOIP

`GEOIP,US,DIRECT`

Rule matches if the GeoIP test result matches a specified country code.

#### IP-ASN

`IP-ASN,1234,DIRECT`

Rule matches if the autonomous system number of the remote IP address matches.

### IP-based Rule Parameters

#### no-resolve

    GEOIP,US,DIRECT,no-resolve
    IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
    

When a GEOIP or IP-CIDR rule is encountered, Surge will send a DNS query to check if the hostname of request is a domain. You can select 'no-resolve' option to skip this rule for a request with domain.

> Notice: If some domains can't be resolved by local DNS server, please make sure there is no IP-based rule in front of the rule which matches that domain. Otherwise the rule testing will fail due to a DNS error. You can use 'no-resolve' to solve the issue too.