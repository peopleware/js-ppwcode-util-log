define(["doh/main", "log/main"], function (doh, logFactory) {
  doh.register("tests.log.main", [
    {
      // has["logLevel-test.log.main_INFO"] = "INFO";
      name: "TEST main INFO",
      runTest: function (t) {
        var d = new doh.Deferred();
        var logger = logFactory.getLogger("test.log.main_INFO");
        setTimeout(d.getTestCallback(function () {
          t.assertEqual(logFactory.getInitialLogLevelFor(logger.name), "INFO");
          t.assertEqual(logFactory.loggerName2Mid(logger.name), "test/log/main_INFO");
          t.assertEqual(logFactory.mid2LoggerName("test/log/main_INFO"), logger.name);

        }), 500);
        return d;
      }
    },
    {
      // has["logLevel-test.log.main_DEBUG"] = "DEBUG";
      name: "TEST main DEBUG",
      runTest: function (t) {
        var d = new doh.Deferred();
        var logger = logFactory.getLogger("test.log.main_DEBUG");
        setTimeout(d.getTestCallback(function () {
          t.assertEqual(logFactory.getInitialLogLevelFor(logger.name), "DEBUG");
          t.assertEqual(logFactory.loggerName2Mid(logger.name), "test/log/main_DEBUG");
          t.assertEqual(logFactory.mid2LoggerName("test/log/main_DEBUG"), logger.name);

        }), 500);
        return d;
      }
    },
    {
      // has["logLevel-test.log.main_TRACE"] = "TRACE";
      name: "TEST main TRACE",
      runTest: function (t) {
        var d = new doh.Deferred();
        var logger = logFactory.getLogger("test.log.main_TRACE");
        setTimeout(d.getTestCallback(function () {
          t.assertEqual(logFactory.getInitialLogLevelFor(logger.name), "TRACE");
          t.assertEqual(logFactory.loggerName2Mid(logger.name), "test/log/main_TRACE");
          t.assertEqual(logFactory.mid2LoggerName("test/log/main_TRACE"), logger.name);

        }), 500);
        return d;
      }
    }
  ]);
});

