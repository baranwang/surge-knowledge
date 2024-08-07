URL Scheme for Surge iOS
------------------------

Surge iOS supports 4 actions and one option.

Action:

*   surge:///start
    
    Start with selected configuration.
    
*   surge:///stop
    
    Stop current session.
    
*   surge:///toggle
    
    Start or stop with selected configuration.
    
*   surge:///install-config?url=x
    
    Install a configuration form a URL. The URL should be encoded in percent encoding.
    

Option:

*   autoclose=true
    
    Auto close Surge after action completed. (Cannot be used with install-config)
    
    Example: surge:///toggle?autoclose=true
    

x-callback-url
--------------

Surge supports x-callback-url specification from v3.4. The URL scheme is 'surge' and the available actions are 'start', 'stop' and 'toggle'.