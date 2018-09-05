function pad(whatToPad, howManyDigits) {

  var inputString = whatToPad.toString();
  var zerosToAdd = howManyDigits - inputString.length;
  if (zerosToAdd > 0) {
      var zeros = "0".repeat(zerosToAdd);
      inputString = zeros + inputString;
  }

  return inputString;
}

function updateClock() {
  var now = new Date();

  var milliseconds = now.getMilliseconds();
  var seconds = now.getSeconds();
  var minutes = now.getMinutes();
  var hours = now.getHours();
  
  document.getElementById("hours").innerHTML = pad(hours, 2);
  document.getElementById("minutes").innerHTML = pad(minutes, 2); 
  document.getElementById("seconds").innerHTML = pad(seconds, 2);
  document.getElementById("milliseconds").innerHTML = pad(milliseconds, 3);
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}