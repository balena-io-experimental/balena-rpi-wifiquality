var iwconfig = require('wireless-tools/iwconfig');

var interface = process.env.INTERFACE || 'wlan0',
    update_period = process.env.PERIOD || 1000;


var get_wifi_status = function(interface) {
  iwconfig.status(interface, function(err, status) {
    console.log(status);
  });
};

// Run first then repeat
get_wifi_status(interface);
var scan = setInterval(get_wifi_status, update_period, interface);

// Check example
var pitft = require("pitft");

var fb = pitft("/dev/fb1"); // Returns a framebuffer in direct mode.  See the clock.js example for double buffering mode

// Clear the screen buffer
fb.clear();

var xMax = fb.size().width;
var yMax = fb.size().height;

for (var n=0; n<250; n++) {
    var x, y, radius, r, g, b;

    x = parseInt(Math.random() * xMax, 10);
    y = parseInt(Math.random() * yMax, 10);
    radius = parseInt(Math.random() * yMax / 2, 10);

    // Create a random color
    r = Math.random();
    g = Math.random();
    b = Math.random();

    fb.color(r, g, b);
    fb.circle(x, y, radius, false, 1); // Draw an outlined circle with a 1 pixel wide border
}

fb.clear();

for (var n=0; n<250; n++) {
    var x, y, radius, r, g, b;

    x = parseInt(Math.random() * xMax, 10);
    y = parseInt(Math.random() * yMax, 10);
    radius = parseInt(Math.random() * yMax / 2, 10);

    r = Math.random();
    g = Math.random();
    b = Math.random();

    fb.color(r, g, b);
    fb.circle(x, y, radius, true); // Draw a filled circle
}
