const int gate_pin = 5;
String light_state;

void serialEvent();
void alarm();

void alarm() {
  boolean alarm_stopped = false;
  for (int i = 1; i < 256; i++) {
    if (light_state != "alarm") {
      boolean alarm_stopped = true;
      break;
    }
    analogWrite(gate_pin, i);
    for (int j = 0; j < 7059; j++) {
      if (Serial.available() > 0) {
        serialEvent();
      }
      delay(1);
    }
  }
  if (!(alarm_stopped)) {
    light_state = "on";
  }
}

void serialEvent() {
  String serial_data = Serial.readString();
  Serial.flush();
  if (serial_data == "i") {
    Serial.println(light_state);
  } else if (light_state != "on" && serial_data == "o") {
    analogWrite(gate_pin, 255);
    light_state = "on";
    Serial.println(light_state);
  } else if (serial_data == "o") {
    analogWrite(gate_pin, 0);
    light_state = "off";
    Serial.println(light_state);
  } else if (serial_data == "a" && light_state == "off") {
    light_state = "alarm";
    alarm();
  } //else {
  //   return false;
  // }
  // return true;
}

void setup() {
  pinMode(gate_pin, OUTPUT);
  analogWrite(gate_pin, 0);
  light_state = "off";
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    serialEvent();
  }
}
