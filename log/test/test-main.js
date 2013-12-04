define(["doh/main", "log/main"], function (doh, logFactory) {
  var logger, inpageLogger;
  doh.register("tests.log.main", [
    {
      name: "create main logger",
      runTest: function (t) {
        var d = new doh.Deferred();
        // default logger
        logger = logFactory.getLogger("test.log.main");
        // in page logger
        inpageLogger = logFactory.getLogger("test.log.inpagemain");
        var appender = new logFactory.InPageAppender();
        inpageLogger.addAppender(appender);
        inpageLogger.setLevel(logFactory.Level.DEBUG);


        setTimeout(d.getTestCallback(function () {
          t.assertTrue(logger != null);
          t.assertEqual(logger.name, "test.log.main")
        }), 500);
        return d;
      }
    },
    {
      name: "set level to INFO",
      runTest: function (t) {
        var d = new doh.Deferred();

        // Set the logLevel of the logger to INFO.
        // All logging messages with level INFO or higher will be printed.
        logger.setLevel(logFactory.Level.INFO);
        setTimeout(d.getTestCallback(function () {
          t.assertEqual(logger.getLevel().name, "INFO");
        }), 50);
        return d;
      }
    },
    {
      name: "test logging level INFO",
      infomessage: "",
      oldinfo: console.info,
      runTest: function (t) {
        var d = new doh.Deferred(), _this = this;

        console.info = function (message) {
          _this.infomessage = message;
        }

        logger.info("This INFO message will be printed");
        inpageLogger.info("This INFO message will be printed");
        setTimeout(d.getTestCallback(function () {
          t.assertTrue(_this.infomessage.indexOf("INFO") >= 0);
        }), 50);
        return d;
      },
      tearDown: function () {
        console.info = this.oldinfo;
      }
    },

    {
      name: "test logging level ERROR",
      errorslogged: 0,
      timeout: 3000,
      olderror: console.error,
      runTest: function (t) {
        var d = new doh.Deferred(), _this = this;

        console.error = function (message) {
          _this.errorslogged++;
        }

        logger.error("This ERROR message will be printed");
        inpageLogger.error("This ERROR message will be printed");
        setTimeout(d.getTestCallback(function () {
          t.assertTrue(_this.errorslogged > 0);
        }), 500);
        return d;
      },
      tearDown: function () {
        console.error = this.olderror;
      }
    },
    {
      name: "test level INFO not logs DEBUG",
      timeout: 3000,
      olddebug: console.debug,
      runTest: function (t) {
        var d = new doh.Deferred(), debugs = 0, debugmessage = "";
        console.debug = function (message) {
          debugmessage = message;
          debugs++;
        }
        logger.debug("This DEBUG message will NOT be printed");

        setTimeout(d.getTestCallback(function () {
          t.assertEqual(debugs, 0);
          t.assertEqual(debugmessage, "");
        }), 1000);
        return d;
      },
      tearDown: function () {
        console.debug = this.olddebug;
        inpageLogger.debug("This DEBUG message will NOT be printed in default logger with level INFO");
      }
    },
    {
      name: "test change level logs to DEBUG en logger.debug",
      timeout: 3000,
      olddebug: console.debug,
      runTest: function (t) {
        var d = new doh.Deferred(), debugs = 0, debugmessage = "";
        // Set the logLevel of the logger to DEBUG.
        // All logging messages with level DEBUG or higher will be printed.
        logger.setLevel(logFactory.Level.DEBUG);
        console.debug = function (message) {
          debugmessage = message;
          debugs++;
        }
        logger.debug("This DEBUG message will be printed");
        inpageLogger.debug("This DEBUG message will be printed");
        setTimeout(d.getTestCallback(function () {
          t.assertTrue(debugs > 0);
          t.assertTrue(debugmessage != "");
        }), 1000);
        return d;
      },
      tearDown: function () {
        console.debug = this.olddebug;
      }
    },

    {
      name: "test change level logs to DEBUG via search params",
      timeout: 3000,
      olddebug: console.debug,
      runTest: function (t) {
        var d = new doh.Deferred(), debugs = 0, debugmessage = "";

        // fake search params via url
        // window.location.search = "?logLevel-test.log.main=DEBUG";
        logFactory.getInitialLogLevelFor = function () {
          return "DEBUG";
        }

        logger = logFactory.getLogger("test.log.main");

        console.debug = function (message) {
          debugmessage = message;
          debugs++;
        }
        var toLogMessage = "This DEBUG message will be printed";
        logger.debug(toLogMessage, "test");
        inpageLogger.debug(toLogMessage);
        setTimeout(d.getTestCallback(function () {
          t.assertEqual(logger.getLevel().name, "DEBUG");
          t.assertTrue(debugs > 0);
          t.assertTrue(debugmessage.indexOf(toLogMessage) >= 0);
          t.assertTrue(debugmessage.indexOf("DEBUG") >= 0);
          t.assertTrue(debugmessage.indexOf("test") >= 0);
        }), 1000);
        return d;
      },
      tearDown: function () {
        console.debug = this.olddebug;
      }
    }
  ]);
});

