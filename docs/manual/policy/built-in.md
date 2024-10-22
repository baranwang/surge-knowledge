Built-in Policy
===============

There are several built-in policies, with the most important being `DIRECT` and `REJECT`. `DIRECT` signifies that the request should be sent directly to the host, while `REJECT` denotes that the request should be rejected.

### Built-in Policy

#### DIRECT

Send the request to the host directly.

#### CELLULAR iOS Only

Prefer the cellular network over the Wi-Fi network.

#### CELLULAR-ONLY iOS Only

Use the cellular network only. Failed if the cellular network is not available.

#### HYBRID iOS Only

Try to set up connections with the Wi-Fi and cellular network simultaneously. Only meaningful while All Hybrid option is not on.

#### NO-HYBRID iOS Only

Never try to set up connections with the cellular network if the Wi-Fi is available. Only meaningful while either All Hybrid or Wi-Fi Assist option is enabled.

Please check [REJECT Policy](reject.html) page for REJECT/REJECT-DROP/REJECT-NO-DROP.

### Alias

The built-in policies can be used in rules and policy groups directly. You can also define an alias in the proxy section.

```
[Proxy]
On = direct
Off = reject
```

Then you can use 'On' and 'Off' as policy names in rules and policy groups.