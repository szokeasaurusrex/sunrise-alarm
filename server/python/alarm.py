#! /usr/bin/python3
import serial
port = serial.Serial('/dev/ttyACM0', 9600)
port.write('a')
