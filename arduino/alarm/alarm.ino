const int gate_pin = 5;
String light_state;
int light_brightness;

void serialEvent();
boolean dim(long);
void alarm(unsigned long);
void blink(unsigned long);

void alarm(unsigned long duration) {
  unsigned long startMillis = millis();
  unsigned long dimDuration = 2ul * duration / 3ul;
  if (dim(dimDuration)) {
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
  unsigned long previousMillis;
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

boolean dim(long duration) {
  boolean brighten;
  light_state = "dimming";
  if (duration > 0) {
    brighten = true;
  } else {
    brighten = false;
    duration = -(duration);
  }
  for (double i = 1; i < 256; i++) {
    if (light_state != "dimming") {
      return false;
    }
    unsigned long interval;
    if (brighten) {
      analogWrite(gate_pin, i);
      interval = (unsigned long) round(duration * (sqrt(i / 254) - sqrt((i - 1) / 254)));
    } else {
      double x = 256 - i;
      analogWrite(gate_pin, (int) x - 1);
      interval = (unsigned long) round(duration * (sqrt(x / 254) - sqrt((x - 1) / 254)));
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
  Serial.println(light_state);
  return true;
}

void serialEvent() {
  String serial_data = Serial.readString();
  long serial_num = serial_data.toInt();
  Serial.flush();
  if (serial_data == "i") {
    Serial.println(light_state);
  } else if (serial_num >= 300000l) {
    alarm(serial_num);
  } else if (serial_num != 0){
    dim(serial_num);
  }
}

void setup() {
  pinMode(gate_pin, OUTPUT);
  analogWrite(gate_pin, 0);
  light_state = "off";
  light_brightness = 0;
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    serialEvent();
  }
}
