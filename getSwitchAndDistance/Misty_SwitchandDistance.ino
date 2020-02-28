/*
 Misty II Backpack - Switch and Distance Sensor

 Set up board as: Arduino Pro Mini 328 -3.3V/8MHz
 https://www.sparkfun.com/products/11114

 External switch state read on DI2 - High=pressed, Low=released
 MaxBotics LV-MAXSonar - EZ Series MB1010 at ANA0, run off 3.3V

 Both Distance and Switched are sent over Serial in JSON format.
 Example: {"distance_cm": 26.73, "distance_in": 10.52, "switchstate": "released"}

*/

//Constants
const int switchPin = 2;  //The pin the pushbutton is connected to
const int anaPin = 0;     //The pin the MaxSonar is connected to

//Calibrations
float sensor_cal = 1.10;                // Empirically measure and calibrate the MaxBotixs 

// variables will change:
int switchState = 0;                    // variable for reading the pushbutton status
long anaVolt; 
float mv, cm, inches;                   // variables for sonar reading
String switchString = "not available";  //initialize to not available

// the setup function runs once when you press reset or power the board
void setup() {
  
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(switchPin, INPUT);

  //initialize Serial
  Serial.begin(9600);
}


//FUNCTION: read sensor function takes analog input voltage from sonar and converts to distance
void read_sensor (){
  anaVolt = analogRead(anaPin);

  mv = (anaVolt/1024.0)*3300.0*sensor_cal;
  inches = mv/6.4; // for 3.3V, 6.4 mv per inch 
  cm = inches*2.54;
    
}// end read_sensor

//FUNCTION: Print the data to Misty in json format
void print_to_Misty(){
  
    //Example: {"distance_cm": 26.73, "distance_in": 10.52, "switchstate": "released"}
    Serial.println("{\"distance_cm\": "+String(cm)+", \"distance_in\": "+String(inches)+", \"switchstate\": \""+switchString+"\"}");

}// end print_to_Misty

  
//MAIN LOOP: loop function runs over and over again forever
void loop() {
  // read state of the pushbutton value:
  switchState = digitalRead(switchPin);

  // check if the switch is pressed. If pressed, the state is HIGH:
  if (switchState == HIGH) {
    // turn LED on when pressed:
    digitalWrite(LED_BUILTIN, HIGH);
    switchString = "pressed";
    delay(1000); //Add a delay to keep the message "Pressed" for longer
    
  } else {
    // turn LED off:
    digitalWrite(LED_BUILTIN, LOW);
    switchString = "released";
  }

  read_sensor();
  print_to_Misty();
  delay(500); 

}//End of main loop
