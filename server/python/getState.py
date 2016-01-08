#! /usr/bin/python
import serial
import time
import sys
port = serial.Serial('/dev/ttyACM0', 9600)
port.write("i")
time.sleep(0.1)
light_state = port.readline()
sys.stdout.write(light_state)
