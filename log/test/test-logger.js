define(["doh/main", "log/main", "log/logger!"], function (doh, logFactory, logger) {
  doh.register("tests.log.logger", [
    {
      name: "test create default INFO logger",
      runTest: function (t) {
        t.assertTrue(logger != null);
        t.assertEqual(logger.getEffectiveLevel().name, "INFO");
      }
    },
    {
      name: "test set another appender and DEBUG level",
      runTest: function (t) {
        logger.addAppender(new logFactory.InPageAppender());
        logger.setLevel(logFactory.Level.TRACE);

        t.assertEqual(logger.getEffectiveAppenders().length, 2);
        t.assertEqual(logger.getEffectiveLevel().name, "TRACE");

      }
    },
    {
      name: "test different levels logging in page",
      timeout: 5000,
      runTest: function (t) {
        var d = new doh.Deferred(), a = "The a", b = "The b", obj = function () {
          a = "My A";
          b = "My B";
          this.works = ["trace", "debug", "info", "warn", "error", "fatal"];
          this.doWork = function () {
            var _this = this;
            this.works.forEach(function (work) {
              logger[work](a, b, _this);
            });
          };
        };
        (new obj()).doWork();
        setTimeout(d.getTestCallback(function () {


        }), 4000);
        return d;

      }
    }
  ])
  ;
});