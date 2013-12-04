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
  "dojo/text!./HeaderPane.html",
  "demo/header/menu/QuickMenu",
  // Our logger plugin is loaded here
  "log/logger!"],
  function (declare, _basedijit, template, QuickMenu, logger) {
    return declare("App.HeaderPane", [_basedijit], {

      templateString: template,
      _quickMenu: null,

      postCreate: function () {
        this.inherited(arguments);
        new QuickMenu().placeAt(this._quickMenu);
      },
      constructor: function () {
        // Only execute the 'heavy calculation' when the debugging is enabled for this logger.
        if (logger.isDebugEnabled()) {
          logger.debug("heavy calculation is happening here");
        }
        // Logging an info line with more than one parameter.
        logger.info("Constructing app", "HeaderPane");
        this.inherited(arguments);
      }
    });
  }
);