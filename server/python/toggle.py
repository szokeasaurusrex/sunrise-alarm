#! /usr/bin/python

import serial
import sys

port = serial.Serial('/dev/ttyACM0', 9600)
port.write(b"o")
light_state = port.readline()
sys.stdout.write(light_state)
