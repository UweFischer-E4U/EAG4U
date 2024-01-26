sap.ui.define([
    "eag4u/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (BaseController,Controller, MessageToast) {
    "use strict";

    return BaseController.extend("eag4u.controller.Listen", {

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onInit: function () {
            console.log("eag4u.controller.Startseite - onInit");
            this.oComponent = this.getOwnerComponent();

            // Globales Model aus der Component holen
            this.oDaten = this.oComponent.getModel("oDaten");
            this.getView().setModel(this.oDaten, "oDaten");
            //  Model in die View holen
            this.getView().setModel(this.oDaten, "oDaten");

            // temporäres Model setzen
            this.oTemp = new sap.ui.model.json.JSONModel();
            this.getView().setModel(this.oTemp, "oTemp");

            this._router = this.oComponent.getRouter();
            this._router.attachRoutePatternMatched(this._handleRouteMatched, this);
        },

        // --------------------------------------------------------
        // wird immer durchlaufen beim Wechsel der Ansicht / des Views
        // --------------------------------------------------------
        _handleRouteMatched: function (oEvent) {
            console.log("eag4u.controller.Startseite - _handleRouteMatched");
            var that = this;
            this.readEinzgrd(); 
            this.readAuszgrd();
        },


        machnix: function () { }
    });

});
