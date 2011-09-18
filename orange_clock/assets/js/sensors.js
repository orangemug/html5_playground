// ### NOT YET USED ###
// Link: <http://www.html5rocks.com/en/tutorials/device/orientation>
// ####################
var rotation = 0;
var tiltLR = 0;
var acceleration = 0;

if(false) {
  function deviceMotionHandler(eventData) {
    // Grab the acceleration including gravity from the results
    acceleration = eventData.accelerationIncludingGravity;

    // Display the raw acceleration data
    var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " + 
      Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";

    // Z is the acceleration in the Z axis, and if the device is facing up or down
    var facingUp = -1;
    if (acceleration.z > 0) {
      facingUp = +1;
    }
    
    // Convert the value from acceleration to degrees acceleration.x|y is the 
    // acceleration according to gravity, we'll assume we're on Earth and divide 
    // by 9.81 (earth gravity) to get a percentage value, and then multiply that 
    // by 90 to convert to degrees.                                
    tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
    //var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);

    // Display the acceleration and calculated values
    //document.getElementById("moAccel").innerHTML = rawAcceleration;
    //document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
    //document.getElementById("moCalcTiltFB").innerHTML = tiltFB;
  }

  setInterval(function() {
    // Apply the 2D rotation and 3D rotation to the image
    //rotate(" + tiltLR + "deg) 
    if (acceleration.y > 0) {
      tiltLR = (180-tiltLR);
      //$('body').css('background-color', "blue")
    } else {
      //$('body').css('background-color', "red")
    }

    colVal = Math.floor(acceleration.y);
    if(colVal<0) colVal*=-1
    console.log("rgb("+colVal*50+", 0, 0)")
    //$('body').css({
    //  'background-color': "rgb("+colVal*50+", 0, 0)"
    //})

    rotation = tiltLR;
    document.getElementById("log").innerHTML = "rotation="+rotation+"   tiltLR="+tiltLR;
    document.getElementById("time").style.webkitTransform = "rotate(" + rotation + "deg)";
  },100)


  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false);
  } else {
    alert("Not supported on your device.")
  }
}
