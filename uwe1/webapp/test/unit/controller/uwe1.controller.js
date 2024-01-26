/*global QUnit*/

sap.ui.define([
	"uwe1/controller/uwe1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("uwe1 Controller");

	QUnit.test("I should test the uwe1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
