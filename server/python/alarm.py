#! /usr/bin/python
import serial
port = serial.Serial('/dev/ttyACM0', 9600)
port.write('a')
