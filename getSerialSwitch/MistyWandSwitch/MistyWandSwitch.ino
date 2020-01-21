/*
Send Misty Switch Status
*/

//variables that stay the same:
const int buttonPin = 2; //The pin the pushbutton is connected to

// variables that will change:
int buttonState = 0;         // variable for reading the pushbutton status

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(buttonPin, INPUT);

  //initialize Serial
  Serial.begin(9600);
}


  
// the loop function runs over and over again forever
void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    digitalWrite(LED_BUILTIN, HIGH);
    // print "Pressed" message to Misty
    Serial.println("Pressed");
    // Add delay to keep the LED on for min time
    delay(1000);
  } else {
    // turn LED off:
    digitalWrite(LED_BUILTIN, LOW);
    Serial.println("Not Pressed");
  }

  // Test Code that writes out Misty message every 1 second - Heartbeat
  delay(500);                       // wait for a second
  //Serial.println("Misty Message - beat"); // Send message to Misty
  
}
