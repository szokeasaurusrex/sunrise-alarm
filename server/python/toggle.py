#! /usr/bin/python3
import serial
import sys
port = serial.Serial('/dev/ttyACM0', 9600)
port.write("o")
light_state = port.readline()
sys.stdout.write(light_state)
