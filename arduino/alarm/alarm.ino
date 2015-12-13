const int gate_pin = 5;
String light_state;

boolean serialEvent();
void alarm();

void alarm() {
  boolean stop_alarm = false;
  for (int i = 1; i < 256; i++) {
    if (stop_alarm) {
      break;
    }
    analogWrite(gate_pin, i);
    for (int j = 0; j < 7059; j++) {
      if (Serial.available() > 0) {
        stop_alarm = serialEvent();
      }
      delay(1);
    }
  }
  light_state = "on";
}

boolean serialEvent() {
  String serial_data = Serial.readString();
  Serial.flush();
  if (light_state != "on" && serial_data == "o") {
    analogWrite(gate_pin, 255);
    light_state = "on";
  } else if (serial_data == "o") {
    analogWrite(gate_pin, 0);
    light_state = "off";
  } else if (serial_data == "a" && light_state == "off") {
    light_state = "alarm";
    alarm();
  } else {
    return false;
  }
  return true;
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
