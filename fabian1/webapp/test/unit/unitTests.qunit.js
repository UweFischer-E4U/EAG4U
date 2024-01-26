/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"fabian1/fabian1/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
