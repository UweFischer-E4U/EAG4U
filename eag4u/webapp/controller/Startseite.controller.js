sap.ui.define([
    "eag4u/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (BaseController,Controller, MessageToast) {
    "use strict";

    return BaseController.extend("eag4u.controller.Startseite", {

        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onInit: function() {
            console.log("eag4u.controller.Startseite - onInit");
            this.oComponent = this.getOwnerComponent();

            // Globales Model aus der Component holen und in die View holen
            this.oDaten = this.oComponent.getModel("oDaten");
            this.getView().setModel(this.oDaten, "oDaten");
            
            // temporäres Model setzen
            this.oTemp = new sap.ui.model.json.JSONModel();
            this.getView().setModel(this.oTemp, "oTemp");            
            
            this._router = this.oComponent.getRouter();
            this._router.attachRoutePatternMatched(this._handleRouteMatched, this);
            
            // Vorgaben setzen (einmalig beim Init)
            let oDaten = this.getView().getModel("oDaten"); 
            let daten = {
                aufgabe: 0,
                einspeiser: false,
                storno: false,
                formelSend: false,
                zaehlpunkt: "",
                gp: ""
            }
            oDaten.setProperty("/eingaben", daten);
        },

        // --------------------------------------------------------
        // wird immer durchlaufen beim Wechsel der Ansicht / des Views
        // --------------------------------------------------------
        _handleRouteMatched: function(oEvent) 
        {
            console.log("eag4u.controller.Startseite - _handleRouteMatched");
        },

        goBearbeitung: function(){
            console.log("eag4u.controller.Startseite - goBearbeitung");
            // Routing durchführen
            this.getRouter().navTo("Bearbeitung", {
                // Parameter mitgeben wenn nötig
                // userId: this.userId
              }, this.bReplace);
        },


        // --------------------------------------------------------
        // Test-Klicks
        // --------------------------------------------------------
        goListen: function(){
            console.log("eag4u.controller.Startseite - goListen");
            // Routing durchführen
            this.getRouter().navTo("Listen", {
                // Parameter mitgeben wenn nötig
                // userId: this.userId
              }, this.bReplace);
        },
        // --------------------------------------------------------
        goView1: function(){
            console.log("eag4u.controller.Startseite - goView1");
            // Routing durchführen
            this.getRouter().navTo("View1", {
                // Parameter mitgeben wenn nötig
                // userId: this.userId
              }, this.bReplace);
        },
        


        

        machnix : function () {}        
    });

});
