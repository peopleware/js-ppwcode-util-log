/*
 Copyright 2013 by PeopleWare n.v.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
define(["dojo/_base/declare",
  "demo/base/_basedijit",
  "dojo/text!demo/header/menu/QuickMenu.html",
  "dijit/Toolbar",
  "dijit/form/Button",
  "dojo/_base/array",
  // Load the logging plugin
  "log/logger!",
  "log/main"
], function (declare, appBaseDijit, template, Toolbar, Button, array, logger, logFactory) {
  return declare("App.QuickMenu", [appBaseDijit], {

    templateString: template,
    _quickmenu: null,

    postCreate: function () {
      var self = this;
      var toolbar = new Toolbar({}, self._quickmenu);
      array.forEach(["info", "debug", "error", "custom"], function (label) {
        var button = new Button({
          label: label.toUpperCase(),
          value: label,
          showLabel: true,
          onClick: self.quickMenuItemClick
        });
        toolbar.addChild(button);
      });
      this.inherited(arguments);
    },

    quickMenuItemClick: function (event) {
      if ("custom" === event.target.value) {
        // Get the myCustomLogger from the logFactory.
        // The system can find the logLevel in the dojoConfig 'has' parameters.
        var customLogger = logFactory.getLogger("myCustomLogger");
        // Logging an info message,
        // but by default this will not be printed as myCustomLogger is defined to log WARN level at least.
        customLogger.info("This custom info message is NOT printed");
        // Logging a warning message,
        // by default this message will be printed as myCustomLogger is defined to log WARN level at least.
        customLogger.warn("This custom warning message is printed");
      } else {
        // Logging a message at the logLevel that is passed in via the button.
        logger[event.target.value]("App QuickMenu.Clicked:", event.target.value);
      }
    },

    constructor: function (args) {
      // Logging a debug statement with 2 string parameters. These can be as many parameters as you want.
      logger.debug("Constructing app", "QuickMenu");
      this.inherited(arguments);
    }
  });
});