#! /usr/bin/python
import serial
port = serial.Serial('/dev/tty0', 9600)
port.write('a')
