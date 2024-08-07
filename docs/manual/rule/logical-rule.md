Logical Rule
============

Use logical operator rule to combine multiple rules for complex scenarios. You may include logical rule in another logical rule.

#### AND Rule

Rule matches if all sub-rules match.

```
AND,((#Rule1), (#Rule2), (#Rule3)...),Policy
```

Example:

```
AND,((SRC-IP,192.168.1.110), (DOMAIN, example.com)),DIRECT
```

#### OR Rule

Rule matches if any sub-rule matches.

`OR,((#Rule1), (#Rule2), (#Rule3)...),Policy`

Example:

```
OR,((SRC-IP,192.168.1.110), (SRC-IP,192.168.1.111)),DIRECT
```

#### NOT Rule

Reverse the evaluation result of the original rule.

```
NOT,((#Rule1)),Policy
```

Example:

```
AND,((NOT,((SRC-IP,192.168.1.110))),(DOMAIN, example.com)),DIRECT
```