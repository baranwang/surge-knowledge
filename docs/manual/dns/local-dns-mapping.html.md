Local DNS Mapping
=================

Surge supports local-customized DNS mapping. It's equivalent to /etc/hosts, but with more powerful features, including wildcard, alias, and assigning DNS server.

    [Host]
    abc.com = 1.2.3.4
    *.dev = 6.7.8.9
    foo.com = bar.com
    bar.com = server:8.8.8.8
    

Wildcard
--------

You can use \* prefix to wildcard all sub-domains. Please note that Surge uses a simple string match. For example, \*google.com will match google.com, foo.google.com, and bargoogle.com. And \*.google.com will **not** match google.com.

    [Host]
    *.dev = 6.7.8.9
    

Alias
-----

It's just like a CNAME record.

    [Host]
    foo.com = bar.com
    

Assigning DNS Server
--------------------

You can assign a specified DNS server to one or more domains.

    [Host]
    bar.com = server:8.8.8.8
    

Since Surge has its own DNS client implementation, some hostnames may fail to resolve. You can use 'server:system' to let the system handle the lookup.

    [Host]
    Macbook = server:system
    

By default, all hostnames with the suffix '.local' will be resolved by the system.

Use Local DNS Item Even For Proxies
-----------------------------------

    [General]
    use-local-host-item-for-proxy=true
    

By default, the DNS resolve always happens on the remote proxy server since Surge always sends proxy requests with domains.

After enabling this option, for the requests that match a local DNS mapping record, Surge sends proxy requests with the local IP addresses instead of the original domains.

It only works for local DNS mapping records using an IP address.