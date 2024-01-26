/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "eag4u/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("eag4u.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // Allgemeingültige Models definieren
                this.oDaten = new sap.ui.model.json.JSONModel();
                this.setModel(this.oDaten, "oDaten");
                this.oDaten.setSizeLimit(1000);
            },
            
            getContentDensityClass() {
                return "sapUiSizeCompact";
                //return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
            }
    
        });
    }
);