var gettingGPSDataInterval;

function showGPSData() {

	clearInterval(gettingGPSDataInterval);
	var gpsDataObject;
	var gpsGetDataAttemptsRemaining = 100;
	getGPSData();

	gettingGPSDataInterval = setInterval(function(){
		if (gpsGetDataAttemptsRemaining) {
			if (gpsDataObject) {
				document.getElementById("placeToWriteGPSDetails").innerHTML =  "<b>Accuracy:</b> " + gpsDataObject.coords.accuracy + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Altitude:</b> " + gpsDataObject.coords.altitude + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>AltitudeAccurac:</b> " + gpsDataObject.coords.altitudeAccuracy + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Heading:</b> " + gpsDataObject.coords.heading + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Latitude:</b> " + gpsDataObject.coords.latitude + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Longitude:</b> " + gpsDataObject.coords.longitude + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Speed:</b> " + gpsDataObject.coords.speed + "<br>";
				document.getElementById("placeToWriteGPSDetails").innerHTML += "<b>Timestamp:</b> " + gpsDataObject.timestamp + "<br>";
				clearInterval(gettingGPSDataInterval);
			}
			else {
				document.getElementById("placeToWriteGPSDetails").innerHTML = "Waiting for GPS data.";
			}
		}
		else {
			clearInterval(gettingGPSDataInterval);
		}
		gpsGetDataAttemptsRemaining--;
	}, 200);

	function getGPSData() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(getGPSDataObject);
	    } else {
	        document.getElementById("placeToWriteGPSDetails").innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	function getGPSDataObject(position) {
	    gpsDataObject = position;
	}
}


