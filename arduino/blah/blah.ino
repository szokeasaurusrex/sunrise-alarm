const int gatePin = 5;

void setup() {
  pinMode(gatePin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  for (int i = 1; i <= 255; i++) {
    float j = (float) i;
    analogWrite(gatePin, (int)(0.003906 * j * j));
    delay(20);
  }
  for (int i = 255; i >= 0; i--) {
    float j = (float) i;
    analogWrite(gatePin, (int)(0.003906 * j * j));
    delay(20);
  }
}
