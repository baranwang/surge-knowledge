Built-in Policy
===============

There are several built-in policies, with the most important being `DIRECT` and `REJECT`. `DIRECT` signifies that the request should be sent directly to the host, while `REJECT` denotes that the request should be rejected.

### Built-in Policy

#### DIRECT

Send the request to the host directly.

#### REJECT

Reject the request, if the request is of HTTP type an error page will be returned. This behavior can be controlled by the `show-error-page-for-reject` parameter.

#### REJECT-DROP

Reject the request. Unlike `REJECT`, this policy will silently discard the connection. Because some applications have very violent retry logic, they will immediately retry after a failed connection, resulting in a storm of requests.

#### REJECT-NO-DROP

If a large number of requests to a hostname trigger the `REJECT/REJECT-TINYGIF` policy within a short period of time (the threshold is 10 times within 30 seconds in the current version), Surge will automatically upgrade the policy to `REJECT-DROP` in order to avoid wasting a lot of resources.

You may use `REJECT-NO-DROP` policy to avoid this behavior.

#### REJECT-TINYGIF

Reject the request, if the request is of HTTP type an 1px transparent gif will be returned, for AD-blocking.

#### CELLULAR iOS Only

Prefer the cellular network over the Wi-Fi network.

#### CELLULAR-ONLY iOS Only

Use the cellular network only. Failed if the cellular network is not available.

#### HYBRID iOS Only

Try to set up connections with the Wi-Fi and cellular network simultaneously. Only meaningful while All Hybrid option is not on.

#### NO-HYBRID iOS Only

Never try to set up connections with the cellular network if the Wi-Fi is available. Only meaningful while either All Hybrid or Wi-Fi Assist option is enabled.

### Alias

The built-in policies can be used in rules and policy groups directly. You can also define an alias in the proxy section.

```
[Proxy]
On = direct
Off = reject
```

Then you can use 'On' and 'Off' as policy names in rules and policy groups.