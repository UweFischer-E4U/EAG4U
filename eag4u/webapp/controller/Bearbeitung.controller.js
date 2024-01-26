sap.ui.define([
    "eag4u/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (BaseController,Controller, MessageToast) {
    "use strict";

    return BaseController.extend("eag4u.controller.Bearbeitung", {

        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
        onInit: function() {
            console.log("eag4u.controller.Bearbeitung - onInit");
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
        _handleRouteMatched: function(oEvent) 
        {
            console.log("eag4u.controller.Bearbeitung - _handleRouteMatched");
            var that = this;
            // nur Laden, wenn IN die Seite gewechselt wird
            if(oEvent.getParameter("name") === "Bearbeitung")
            {        
                // nur für den Reload nötig
                this.readEinzgrd(); 
                this.readSzenario();                
                this.readAuszgrd();
                this.readKopfdaten();                               
            }    
        },
        // --------------------------------------------------------
        // Panel aufklappen
        // die anderen pannel schließen
        // --------------------------------------------------------
        expandScenarioPanel: function(oEvent)
        {
            console.log("eag4u.controller.Bearbeitung - expandScenarioPanel");
            console.log(oEvent);
        },

        // --------------------------------------------------------
        //  Go Button
        // --------------------------------------------------------
        XXX: function(oEvent)
        {
            console.log("eag4u.controller.Bearbeitung - XXX");
            let oDaten = this.getView().getModel("oDaten");
            console.log(oDaten);
        },

        
        machnix : function () {}
    });

});
