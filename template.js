(function(global) {
    "use strict;" // No problem in IE6

    // Class ------------------------------------------------
    function YourModule() {
    };

    // Header -----------------------------------------------
    YourModule["prototype"]["method"] = YourModule_method; // YourModule#method(someArg:any):void

    // Implementation ---------------------------------------
    function YourModule_method(someArg) {
        // ...
    }

    // Exports ----------------------------------------------
    if ("process" in global) {
        module["exports"] = YourModule;
    }
    global["YourModule"] = YourModule;

})((this || 0).self || global);
