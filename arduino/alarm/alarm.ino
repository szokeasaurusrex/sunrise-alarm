const int gate_pin = 5;
String light_state;

void serialEvent();
boolean dim(unsigned long, boolean);
void alarm(unsigned long);
void blink(unsigned long);

void alarm(unsigned long duration) {
  unsigned long startMillis = millis();
  unsigned long dimDuration = 2ul * duration / 3ul;
  if (dim(dimDuration, true)) {
    light_state = "alarm";
    while (millis() - startMillis < duration) {
      loop();
      if (light_state != "alarm") {
        return;
      }
    }
    blink(500);
  }
}

void blink(unsigned long interval) {
  unsigned int previousMillis;
  light_state = "blink";
  while(light_state == "blink") {
    digitalWrite(gate_pin, LOW);
    previousMillis = millis();
    while(millis() - previousMillis < interval) {
      loop();
    }
    if (light_state != "blink") break;
    digitalWrite(gate_pin, HIGH);
    previousMillis = millis();
    while(millis() - previousMillis < interval) {
      loop();
    }
  }
}

// Returns false if was interrupted, otherwise returns true
boolean dim(unsigned long duration, boolean brighten) {
  double lnb = log(pow(256.0, 1.0 / (float) duration));
  for (int i = 1; i < 256; i++) {
    if (light_state != "dimming") {
      return false;
    }
    unsigned long interval;
    if (brighten) {
      analogWrite(gate_pin, i);
      interval = (unsigned long) round(log(((float) i + 1) / (float) i) / lnb);
    } else {
      int x = 256 - i;
      analogWrite(gate_pin, x - 1);
      interval = (unsigned long) round(log((float) x / ((float) x - 1)) / lnb);
    }
    unsigned long previousMillis = millis();
    if (i < 255) {
      while(millis() - previousMillis < interval) {
        loop();
      }
    }
  }
  if (brighten) {
    light_state = "on";
  } else {
    light_state = "off";
  }
  return true;
}

void serialEvent() {
  String serial_data = Serial.readString();
  Serial.flush();
  if (serial_data == "i") {
    Serial.println(light_state);
  } else if (light_state == "alarm" && serial_data == "o") {
    light_state = "on";
    Serial.println(light_state);
  } else if (light_state != "on" && serial_data == "o") {
    light_state = "dimming";
    dim(500, true);
    Serial.println(light_state);
  } else if (serial_data == "o") {
    light_state = "dimming";
    dim(500, false);
    Serial.println(light_state);
  } else if (serial_data == "a" && light_state == "off") {
    light_state = "dimming";
    //alarm(1800000);
    alarm(1800000);
  }
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
