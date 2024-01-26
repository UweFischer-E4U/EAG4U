sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, JSONModel, History, MessageToast) {
    "use strict";
    return Controller.extend("eag4u.controller.BaseController", {


        init: function () {
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        goStart: function() 
        {
            console.log("eag4u.controller.BaseController - goStart");
            // Routing durchführen
            this.getRouter().navTo("Start", {
                // Parameter mitgeben wenn nötig
                // userId: this.userId
              }, this.bReplace);
        },

        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("", {}, true /*no history*/);
            }
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        // --------------------------------------------------------
        // Einzgrd aus Datei holen
        // --------------------------------------------------------
        readEinzgrd: function () {
            console.log("eag4u.controller.BaseController - readEinzgrd");
            // Daten aus der Datei lesen - false=asyncron
            this.oTemp.loadData("model/einzgrd.json", {}, false);
            this.oTemp.refresh();
            // Daten in das entgültige Model schreiben
            this.oDaten.setProperty("/einzgrd", this.oTemp.getProperty("/"));
            this.oDaten.refresh();
        },

        // --------------------------------------------------------
        // Auszgrd aus Datei holen
        // --------------------------------------------------------
        readAuszgrd: function () {
            console.log("eag4u.controller.BaseController - readAuszgrd");
            // Daten aus der Datei lesen - false=asyncron
            this.oTemp.loadData("model/auszgrd.json", {}, false);
            this.oTemp.refresh();
            // Daten in das entgültige Model schreiben
            this.oDaten.setProperty("/auszgrd", this.oTemp.getProperty("/"));
            this.oDaten.refresh();
        },

        // --------------------------------------------------------
        // Versorgungsszenario aus Datei holen
        // --------------------------------------------------------
        readSzenario: function () {
            console.log("eag4u.controller.BaseController - readSzenario");
            // Daten aus der Datei lesen - false=asyncron
            this.oTemp.loadData("model/versorgungsszenario.json", {}, false);
            this.oTemp.refresh();
            // Daten in das entgültige Model schreiben
            this.oDaten.setProperty("/szenario", this.oTemp.getProperty("/"));
            this.oDaten.refresh();

            this.makePanelSzenario();
        },
        makePanelSzenario: function()
        {
            console.log("eag4u.controller.BaseController - makePanelSzenario");
            let data = this.oTemp.getProperty("/");
            let newList = [];
            // Liste für den Pannel zusammenstellen
            data.forEach((row) => 
            {                
                let panelInfo={
                    von: row.von,
                    bis: row.bis,
                    Scenario: row.Scenario,
                    SzenarioBez: row.SzenarioBez,
                    vertraege: []
                }
                let Bad=false;
                newList.forEach(function(e)
                { if(JSON.stringify(panelInfo)===JSON.stringify(e)) { Bad=true; } });
                // bad=true bedeutet schon in der Liste vorhanden, false dann pushen
                if(!Bad)
                { newList.push(panelInfo); }
            });

            // Verträge zu den Panels zuordnen
            data.forEach((row) => 
            {
                let vertrag = {
                    Vertrag: row.Vertrag,
                    abrechenbar: row.abrechenbar,
                    eigen: row.eigen,
                    ServiceArt: row.ServiceArt,
                    ServiceBez: row.ServiceBez,
                    nVS: row.nVS,
                    Serviceanbieter: row.Serviceanbieter,
                    ServiceanbieterBez: row.ServiceanbieterBez                        
                }
                let Bad=false;
                newList.forEach(function(e)
                {
                    if(row.von === e.von)
                    {
                        e.vertraege.push(vertrag);
                    }
                });                
            });
            // Daten in das entgültige Model schreiben
            this.oDaten.setProperty("/szenarioPanel", newList);
            this.oDaten.refresh();
        },

        // --------------------------------------------------------
        // Kopfdaten vom Zählpunkt aus Datei holen
        // --------------------------------------------------------
        readKopfdaten: function () {
            console.log("eag4u.controller.BaseController - readKopfdaten");
            // Daten aus der Datei lesen - false=asyncron
            this.oTemp.loadData("model/zaehlpunkt.json", {}, false);
            this.oTemp.refresh();
            // Daten in das entgültige Model schreiben
            this.oDaten.setProperty("/kopfdaten", this.oTemp.getProperty("/"));
            this.oDaten.refresh();
        },

        



        machnix: function () { }
    });
});
