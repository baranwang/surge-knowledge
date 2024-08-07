Load Balance Group
==================

A load-balancing group randomly selects a policy from the available sub-policies to use.

### Parameters

#### `persistent`: Optional

When `persistent=true`, the same policy will be used for the same target hostname. Avoid triggering risk controls on the target site due to different egress IPs. However, a policy change may occur when availability changes.