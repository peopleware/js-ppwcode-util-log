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
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin"
],
  function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {
    return declare("App.baseCustomInTemplateMixin", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      module: null,
      startup: function () {
        this.inherited(arguments);
      },
      postCreate: function () {
        this.inherited(arguments);
      },
      destroy: function () {
        this.inherited(arguments);
      }
    });
  });
