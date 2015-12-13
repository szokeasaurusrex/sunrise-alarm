#! /bin/python3
import serial
port = serial.Serial('/dev/tty0', 9600)
port.write(b'a')
