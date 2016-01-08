#! /usr/bin/python
import serial
import time
port = serial.Serial('/dev/ttyACM0', 9600)
port.write("i")
time.sleep(0.1)
light_state = port.readline()
print light_state
