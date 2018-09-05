var extension_settings_data = browser.storage.sync.get('extension_settings_data');
extension_settings_data.then((res) => {
  if (isJavaScriptObjectEmpty(res)) {
    return Promise.reject();
  }

  // window.Date
  if (res.extension_settings_data.window_date.main_checkbox) {
    var digitPlacesToRoundCount = res.extension_settings_data.window_date.time_round_precision;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = createDateWrappingFunctionString(digitPlacesToRoundCount);
    document.getElementsByTagName('html')[0].appendChild(scriptTag);
  }

  // window.performance
  if (res.extension_settings_data.window_performance_now.main_checkbox) {
    var digitPlacesToRoundCount = res.extension_settings_data.window_performance_now.value_round_precision;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = createPerformanceNowWrappingFunctionString(digitPlacesToRoundCount);
    document.getElementsByTagName('html')[0].appendChild(scriptTag);
  }

  // window.HTMLCanvasElement
  if (res.extension_settings_data.window_html_canvas_element.main_checkbox) {
    var selectOption = res.extension_settings_data.window_html_canvas_element.type_of_restriction;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = createHTMLCanvasElementPrototypeWrappingFunctionString(selectOption);
    document.getElementsByTagName('html')[0].appendChild(scriptTag);
  }

  // navigator.geolocation
  if (res.extension_settings_data.navigator_geolocation.main_checkbox) {
      var isDateAlteringEnabled = res.extension_settings_data.window_date.main_checkbox;
      var timestampPrecision = 0;
      if (isDateAlteringEnabled) {
        timestampPrecision = res.extension_settings_data.window_date.time_round_precision;
      }

      var scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = createGeolocationGetCurrentPositionWrappingFunctionString(
          res.extension_settings_data.navigator_geolocation.type_of_restriction,
          res.extension_settings_data.navigator_geolocation.gps_a,
          res.extension_settings_data.navigator_geolocation.gps_b,
          res.extension_settings_data.navigator_geolocation.gps_c,
          res.extension_settings_data.navigator_geolocation.gps_d,
          res.extension_settings_data.navigator_geolocation.gps_e,
          res.extension_settings_data.navigator_geolocation.gps_f,
          res.extension_settings_data.navigator_geolocation.gps_g,
          timestampPrecision
        );
      document.getElementsByTagName('html')[0].appendChild(scriptTag);
  }

  // window.XMLHttpRequest
  if (res.extension_settings_data.window_xmlhttprequest.main_checkbox) {
    var selectOption = res.extension_settings_data.window_xmlhttprequest.type_of_restriction;
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.text = createXMLHttpRequestWrappingFunctionString(selectOption);
    document.getElementsByTagName('html')[0].appendChild(scriptTag);
  }
});

// functions for generating wrapping JavaScript code
function createDateWrappingFunctionString(timePrecisionIndecimalPlaces) {
  var javaScriptCodeString = "\
  (function() {\
    var timeInMillisecondsPrecisionInDecimalPlaces = " + timePrecisionIndecimalPlaces + ";\
    var originalDateObject = window.Date;\
    window.Date = function() {\
      var currentDateObject = new originalDateObject();\
      var roundedValue = roundToPrecision(currentDateObject.getMilliseconds(), timeInMillisecondsPrecisionInDecimalPlaces);\
      currentDateObject.setMilliseconds(roundedValue);\
      return currentDateObject;\
    };\
  \
    function roundToPrecision(numberToRound, precision) {\
      var moveDecimalDot = Math.pow(10, precision);\
      return Math.round(numberToRound * moveDecimalDot) / moveDecimalDot;\
    }\
  }) ();\
  ";

  return javaScriptCodeString;
}

function createPerformanceNowWrappingFunctionString(performanceNowPrecisionIndecimalPlaces) {
  var javaScriptCodeString = "\
  (function() {\
    var performanceNowPrecisionIndecimalPlaces = " + performanceNowPrecisionIndecimalPlaces + ";\
    var originalPerformanceNowFunction = window.performance.now;\
    window.performance.now = function() {\
      var originalPerformanceValue = originalPerformanceNowFunction.call(window.performance);\
      var roundedValue = roundToPrecision(originalPerformanceValue, performanceNowPrecisionIndecimalPlaces);\
      return roundedValue;\
    };\
  \
    function roundToPrecision(numberToRound, precision) {\
      var moveDecimalDot = Math.pow(10, precision);\
      return Math.round(numberToRound * moveDecimalDot) / moveDecimalDot;\
    }\
  }) ();\
  ";

  return javaScriptCodeString;
}

function createHTMLCanvasElementPrototypeWrappingFunctionString(selectOption) {
  var blockWritingToCanvasesEntirely = false;
  if (selectOption == "b") {
    blockWritingToCanvasesEntirely = true;
  }

  var javaScriptCodeString = "\
  (function() {\
    var blockWritingToCanvasesEntirely = " + blockWritingToCanvasesEntirely + ";\
    var originalHTMLCanvasElementPrototype = window.HTMLCanvasElement.prototype.getContext;\
    window.HTMLCanvasElement.prototype.getContext = function(contextType, contextAttributes) {\
      if (!blockWritingToCanvasesEntirely && confirm('Enable drawing to canvas?')) {\
        return originalHTMLCanvasElementPrototype.call(this, contextType, contextAttributes);\
      }\
      else {\
        return null;\
      }\
    };\
  }) ();\
  ";

  return javaScriptCodeString;
}

function createGeolocationGetCurrentPositionWrappingFunctionString(selectOption, latitudePrecision, longitudePrecision, altitudePrecision, accuracyPrecision, altitudePrecision, headingPrecision, speedPrecision, timestampPrecision) {
  var setAllGPSDataToZero = false;
  if (selectOption == "b") {
    setAllGPSDataToZero = true;
  }
  var latitudePrecisionInDecimalPlaces = latitudePrecision;
  var longitudePrecisionInDecimalPlaces = longitudePrecision;
  var altitudePrecisionInDecimalPlaces = altitudePrecision;
  var accuracyPrecisionInDecimalPlaces = accuracyPrecision;
  var altitudeAccuracyPrecisionInDecimalPlaces = altitudePrecision;
  var headingPrecisionInDecimalPlaces = headingPrecision;
  var speedPrecisionInDecimalPlaces = speedPrecision;
  var timestampPrecisionInDecimalPlaces = timestampPrecision;

  var javaScriptCodeString = "\
  (function() {\
  var setAllGPSDataToZero = " + setAllGPSDataToZero + ";\
  \
  var latitudePrecisionInDecimalPlaces = " + latitudePrecisionInDecimalPlaces + ";\
  var longitudePrecisionInDecimalPlaces = " + longitudePrecisionInDecimalPlaces + ";\
  var altitudePrecisionInDecimalPlaces = " + altitudePrecisionInDecimalPlaces + ";\
  var accuracyPrecisionInDecimalPlaces = " + accuracyPrecisionInDecimalPlaces + ";\
  var altitudeAccuracyPrecisionInDecimalPlaces = " + altitudeAccuracyPrecisionInDecimalPlaces + ";\
  var headingPrecisionInDecimalPlaces = " + headingPrecisionInDecimalPlaces + ";\
  var speedPrecisionInDecimalPlaces = " + speedPrecisionInDecimalPlaces + ";\
  var timestampPrecisionInDecimalPlaces = " + timestampPrecisionInDecimalPlaces + ";\
  \
  var originalGetCurrentPositionFunction = navigator.geolocation.getCurrentPosition;\
  navigator.geolocation.getCurrentPosition = function(functionName) {\
  \
    originalGetCurrentPositionFunction.call(navigator.geolocation, processOriginalGPSDataObject);\
  \
    function processOriginalGPSDataObject(originalPositionObject) {\
      var newLatitude = 0;\
      var newLongitude = 0;\
      var newAltitude = 0;\
      var newAccuracy = 0;\
      var newAltitudeAccuracy = 0;\
      var newHeading = 0;\
      var newSpeed = 0;\
      var newTimestamp = 0;\
  \
      if (!setAllGPSDataToZero) {\
        if (originalPositionObject.coords.latitude != null && originalPositionObject.coords.latitude != Infinity && originalPositionObject.coords.latitude >= 0) {\
            newLatitude = roundToPrecision(originalPositionObject.coords.latitude, latitudePrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.longitude != null && originalPositionObject.coords.longitude != Infinity && originalPositionObject.coords.longitude >= 0) {\
          newLongitude = roundToPrecision(originalPositionObject.coords.longitude, longitudePrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.altitude != null && originalPositionObject.coords.altitude != Infinity && originalPositionObject.coords.altitude >= 0) {\
          newAltitude = roundToPrecision(originalPositionObject.coords.altitude, altitudePrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.accuracy != null && originalPositionObject.coords.accuracy != Infinity && originalPositionObject.coords.accuracy >= 0) {\
          newAccuracy = roundToPrecision(originalPositionObject.coords.accuracy, accuracyPrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.altitudeAccuracy != null && originalPositionObject.coords.altitudeAccuracy != Infinity && originalPositionObject.coords.altitudeAccuracy >= 0) {\
          newAltitudeAccuracy = roundToPrecision(originalPositionObject.coords.altitudeAccuracy, altitudeAccuracyPrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.heading != null && originalPositionObject.coords.heading != Infinity && originalPositionObject.coords.heading >= 0) {\
          newHeading = roundToPrecision(originalPositionObject.coords.heading, headingPrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.coords.speed != null && originalPositionObject.coords.speed != Infinity && originalPositionObject.coords.speed >= 0) {\
          newSpeed = roundToPrecision(originalPositionObject.coords.speed, speedPrecisionInDecimalPlaces);\
        }\
        if (originalPositionObject.timestamp != null && originalPositionObject.timestamp != Infinity && originalPositionObject.timestamp >= 0) {\
          newTimestamp = roundToPrecision(originalPositionObject.timestamp, timestampPrecisionInDecimalPlaces);\
        }\
      }\
  \
      const editedPositionObject = {\
        coords: {\
          latitude: newLatitude,\
          longitude: newLongitude,\
          altitude: newAltitude,\
          accuracy: newAccuracy,\
          altitudeAccuracy: newAltitudeAccuracy,\
          heading: newHeading,\
          speed: newSpeed,\
          __proto__: originalPositionObject.coords.__proto__\
        },\
        timestamp: newTimestamp,\
        __proto__: originalPositionObject.__proto__\
      };\
  \
      functionName.call(this, editedPositionObject);\
      return true;\
    }\
    return undefined;\
  };\
  \
  function roundToPrecision(numberToRound, precision) {\
    var moveDecimalDot = Math.pow(10, precision);\
    return Math.round(numberToRound * moveDecimalDot) / moveDecimalDot;\
  }\
  }) ();\
  ";

  return javaScriptCodeString;
}

function createXMLHttpRequestWrappingFunctionString(selectOption) {
  var blockEveryXMLHttpRequest = false;
  if (selectOption == "b") {
    blockEveryXMLHttpRequest = true;
  }

  var javaScriptCodeString = "\
  (function() {\
    var blockEveryXMLHttpRequest = " + blockEveryXMLHttpRequest + ";\
    var originalXMLHttpRequest = window.XMLHttpRequest;\
    window.XMLHttpRequest = function() {\
      var currentXMLHttpRequestObject = new originalXMLHttpRequest();\
      var originalXMLHttpRequestOpenFunction = currentXMLHttpRequestObject.open;\
      currentXMLHttpRequestObject.open = function(requestMethod, requestURL, requestParameterAsync, requestUsername, requestPassword) {\
        if (blockEveryXMLHttpRequest || !confirm('There is a XMLHttpRequest on URL \"' + requestURL + '\". Do you want to continue?')) {\
          return undefined;\
        }\
        if (requestParameterAsync == undefined) {\
          return originalXMLHttpRequestOpenFunction.call(currentXMLHttpRequestObject, requestMethod, requestURL);\
        }\
        else if (requestUsername == undefined) {\
          return originalXMLHttpRequestOpenFunction.call(currentXMLHttpRequestObject, requestMethod, requestURL, requestParameterAsync);\
        }\
        else if (requestPassword == undefined) {\
          return originalXMLHttpRequestOpenFunction.call(currentXMLHttpRequestObject, requestMethod, requestURL, requestParameterAsync, requestUsername);\
        }\
        else {\
          return originalXMLHttpRequestOpenFunction.call(currentXMLHttpRequestObject, requestMethod, requestURL, requestParameterAsync, requestUsername, requestPassword);\
        }\
      };\
      return currentXMLHttpRequestObject;\
    };\
  }) ();\
  ";

  return javaScriptCodeString;
}

// other functions
function isJavaScriptObjectEmpty(object) {
  for(var property in object) {
    if(object.hasOwnProperty(property))
      return false;
  }
  return true;
}
