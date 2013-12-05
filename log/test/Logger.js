define(["doh/main", "log/main", "log/logger!", "module"], function (doh, logFactory, logger, module) {
  doh.register("tests.log.logger", [
    {
      // module level in boot
      // injected with has["logLevel-log.test.test-logger"] = "TRACE";
      name: "TEST[Logger]",
      runTest: function (t) {
        t.assertTrue(logger != null);
        // level test via has
        t.assertEqual(logFactory.getInitialLogLevelFor(logger.name), "TRACE");
        // module test logger module should be the same as current module
        t.assertEqual(logFactory.loggerName2Mid(logger.name), module.id);
      }
    }
  ])
  ;
});