const int gatePin = 5;

void setup() {
  pinMode(gatePin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  for (int i = 1; i <= 255; i++) {
    analogWrite(gatePin, i);
    delay(20);
  }
}
