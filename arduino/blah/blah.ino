const int gatePin = 5;

void setup() {
  pinMode(gatePin, OUTPUT);
  analogWrite(gatePin, 0);
}

void loop() {
  for (int i = 1; i <= 1023; i++) {
    analogWrite(gatePin, i);
    delay(5);
  }
  for (int i = 1022; i >= 0; i--) {
    analogWrite(gatePin, i);
    delay(5);
  }
}
