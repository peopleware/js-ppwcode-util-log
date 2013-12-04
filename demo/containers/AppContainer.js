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
  "dijit/layout/BorderContainer",
  "dijit/_TemplatedMixin",
  "dojo/text!./AppContainer.html",
  "demo/header/HeaderPane",
  // Load our log/logger plugin.
  "log/logger!"],
  function (declare, BorderContainer, _TemplatedMixin, template, HeaderPane, logger) {
    return declare("loggingTest.CustomBorderContainer", [BorderContainer, _TemplatedMixin], {

      templateString: template,

      postCreate: function () {
        var self = this;
        this.inherited(arguments);
        try {
          self.addChild(new HeaderPane({region: 'top'}));
        }
        catch (ERR) {
          // Logging an error message. The ERR parameter should be always the last parameter in the list.
          logger.error("quick menu is NOT added", ERR);
        }
      },
      constructor: function () {
        this.inherited(arguments);
        // Logging a message at info level.
        logger.info("app container inheritance success");
      }
    });
  }
);