#! /usr/bin/python3
import serial
import os
import requests

start alarm
port = serial.Serial('/dev/ttyACM0', 9600)
port.write('a')
