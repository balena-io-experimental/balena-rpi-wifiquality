var iwconfig = require('wireless-tools/iwconfig'),
    pitft = require("pitft");

// Get variables
var interface = process.env.INTERFACE || 'wlan0',
    update_period = process.env.PERIOD || 1000;

if (process.env.DEBUG) {
  DEBUG = true;
} else {
  DEBUG = false;
}

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode
// Clear the screen buffer
fb.clear();
var xMax = fb.size().width;
var yMax = fb.size().height;

var getWifiStatus = function(interface) {
  iwconfig.status(interface, function(err, status) {
    if (err) {
      displayErr("Can't get wifi Q");
    } else {
      if (DEBUG) {
        console.log(status);
      }
      displayWifi(status);
    }
  });
};

var displayErr = function(message) {
  fb.font("fantasy", 24, true);
  fb.clear();
  fb.color(0, 0, 1);
  fb.rect(0, 0, xMax, yMax, true); // Draw a filled rectangle
  fb.color(0, 0, 0);
  fb.text(xMax/2, yMax/2, message, true, 0);
}

var displayWifi = function(status){
  fb.font("fantasy", 24, true); // Use the "fantasy" font with size 24, and font weight bold, if available
  fb.clear();
  var r = 1 - (status.quality / 70),
      g = status.quality / 70,
      b = 0;
  fb.color(r, g, b);
  fb.rect(0, 0, xMax, yMax, true); // Draw a filled rectangle
  fb.color(0, 0, 0);
  fb.text(xMax/2, yMax/2-24, status.ssid, true, 0);
  fb.text(xMax/2, yMax/2, "Q: "+status.quality+"/70", true, 0);
}

// Run first then repeat
getWifiStatus(interface);
var scan = setInterval(getWifiStatus, update_period, interface);
