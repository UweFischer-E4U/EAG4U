/*global QUnit*/

sap.ui.define([
	"fabian1/fabian1/controller/fabian1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("fabian1 Controller");

	QUnit.test("I should test the fabian1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
