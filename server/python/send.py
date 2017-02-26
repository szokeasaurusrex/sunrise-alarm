#! /usr/bin/python3

import serial
import sys

data = sys.argv[1]
port = serial.Serial('/dev/ttyACM0', 9600)
port.write(data.encode())
