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
