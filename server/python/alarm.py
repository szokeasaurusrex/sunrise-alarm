#! /usr/bin/python3
import serial
import os
import requests

# start alarm
# port = serial.Serial('/dev/ttyACM0', 9600)
# port.write('a')

#ifttt
ifttt_key = os.environ['IFTTT_KEY']
url = 'https://maker.ifttt.com/trigger/sunalarm/with/key/' + ifttt_key
requests.post(url)
