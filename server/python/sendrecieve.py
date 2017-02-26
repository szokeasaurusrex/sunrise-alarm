#! /usr/bin/python

import serial
import sys

data = sys.argv[1]
port = serial.Serial('/dev/ttyACM0', 9600)
port.write(data.encode())
light_state = port.readline()
sys.stdout.write(light_state.decode("utf-8"))
