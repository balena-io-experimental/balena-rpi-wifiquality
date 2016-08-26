#!/bin/bash

if [ -c /dev/fb1 ]; then
  rmmod fbtft_device | true
fi

modprobe fbtft_device name=pitft verbose=0 rotate=${ROTATE=0}
