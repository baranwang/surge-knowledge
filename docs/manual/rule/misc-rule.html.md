Miscellaneous Rule
==================

### Port Number Rules

Port number rules support three kinds of expressions:

*   Directly writing the port number, such as IN-PORT,6153
*   Port number closed interval: such as DEST-PORT,10000-20000
*   Using >, <, <=, >= operators, such as SRC-PORT,>=50000 iOS 5.8.4+ Mac 5.4.4+

#### DEST-PORT

Rule matches if the target port of the request matches.

    DEST-PORT,80-81,DIRECT
    

#### IN-PORT

Rule matches if the incoming port of the request matches. Useful while Surge listening on multiple ports.

    IN-PORT,6152,DIRECT
    

#### SRC-PORT iOS 5.8.4+ Mac 5.4.4+

Rule matches if the client port number of the request matches.

    SRC-PORT,>=50000,DIRECT
    

### Others

#### SRC-IP

Rule matches if the client IP address of the request matches. Only for remote machines.

    SRC-IP,192.168.20.100,DIRECT
    

#### PROTOCOL

Rule matches if the protocol of the request matches. The possible values are HTTP, HTTPS, TCP, UDP, DOH, DOH3, DOQ, QUIC.

    PROTOCOL,HTTP,DIRECT
    

1.  Due to the existence of multiple draft versions of QUIC, not all QUIC traffic can be recognized by Surge.
2.  For compatibility reasons, `PROTOCOL,UDP` can also match QUIC traffic.
3.  The protocol keywords `DOH`, `DOH3`, and `DOQ` are only used to match encrypted DNS requests sent by Surge itself. This feature needs to be used in conjunction with `encrypted-dns-follow-outbound-mode=true`.

#### SCRIPT

Use a Javascript script to determine whether it matches.

    SCRIPT,ScriptName,DIRECT
    

#### CELLULAR-RADIO iOS Only

Rule matches if the cellular radio technology of the current network matches. The possible values are GPRS, Edge, WCDMA, HSDPA, HSUPA, CDMA1x, CDMAEVDORev0, CDMAEVDORevA, CDMAEVDORevB, eHRPD, HRPD, LTE, NRNSA, NR

    CELLULAR-RADIO,LTE,DIRECT
    

#### DEVICE-NAME

Rule matches if the client's device name matches.

*   For Surge Ponte access, the device name is the device name in the client device system settings.
    
*   If Surge DHCP is enabled, for local area network device access, you can use the custom device name found on the device view.