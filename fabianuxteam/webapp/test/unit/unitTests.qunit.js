/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"e4uuxt/fabianuxteam/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
