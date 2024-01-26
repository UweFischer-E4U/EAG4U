jQuery.sap.declare("eag4u.util.Formatter");

eag4u.util.Formatter = {

    visible: function(aufgabe,storno){	
		if (aufgabe === 0) {
            if (storno === true) 
            {
                return false;
            } 
            else 
            { 
                return true;
            }
		}	
		if (aufgabe === 1) {
			return false;
		}
	},
	
	// Icons für den Status vergeben
	statusIcon: function(change) {
		if (change === "0") {
			return "sap-icon://circle-task";
		}
		if (change === "1") {
			return "sap-icon://decline";
		}
		if (change === "2") {
			return "sap-icon://accept";
		}
		if (change === "3") {
			return "sap-icon://circle-task-2";
		}
	},

	hakenIcon: function(change) {
		if (change === "X" || change === 1) {
			return "sap-icon://accept";
		}
	},	
      
	// den SAP Datums-String YYYYMMDD in ein "echtes" Datum umwandeln
	realDatum: function(string) {
		if (string === undefined || string === null)
		{
			return "Fehler";
		}
		else
		{
			var date = string.substr(6, 2) + "." + string.substr(4, 2) + "." + string.substr(0, 4);
			return date;
		}
	},
  
	// Datums-Objekt in ein "echtes" Datum umwandeln
	dateObject2Date: function(datObj) {
		if (datObj === undefined)
		{
			return "Fehler";
		}
		else
		{
			var str = "/Date(1521676800000)/";
			var res = parseInt(str.substring(6, 19));
			var date = new Date(res);
			var yyyy = date.getFullYear();
			var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
			var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			return dd + "." + mm + "." + yyyy;		
		}
	},

    // Rückgabe des Datums MIT Wochentag ausgeschrieben
    getDatum : function (datum) {
        if (datum !== undefined)
            {
            var dd = datum.substr(0, 2);
            var mm = datum.substr(3, 2) - 1;
            var yy = datum.substr(6, 4);
            var date = new Date(yy, mm, dd);
            var wtage = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
            var wtagekl = ["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."];
            var day = date.getDay();
            var wt = wtagekl[day] + " " + datum;
            return wt;
            }
	},





    machnix : function (){}

};