/**********************************************************************
getSwitchAndDistance - obtain switch status and ultrasonic distance through serial port

This is experimental CODE, used for my learning.
*********************************************************************************/

/* Copyright 2019 Aaron Rues

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

//NOTE: Use the below code to test javascript code logic without the backpack installed 
/*
const json_test = '{"distance_cm": 32, "distance_in": 12.44, "switchstate": "released" }';
const obj = JSON.parse(json_test);

misty.Debug(obj.distance_cm); // expected output: 32
misty.Debug(obj.distance_in); // expected output: 12.44
misty.Debug(obj.switchstate); //expected output: released
*/



// Initialize LED to white, a do short head move to indicate the start of program
misty.ChangeLED(0, 0, 255);
misty.Pause(1000);
misty.MoveHead(-20, 0, 0); 
misty.Pause(1000);
misty.MoveHead(-10, 0, 0); //Misty Looks up slightly
misty.Pause(1000);
misty.MoveHead(-20, 0, 0);
//misty.DriveTime(20,0, 5000); 

//Ref: Misty BackPack Documentation and API? in community forum
misty.AddReturnProperty("backpackMessage", "SerialMessage");
misty.RegisterEvent("backpackMessage", "SerialMessage", 100, true);

function _backpackMessage(data) {

    //misty.Debug("In backpack message");

    if(data !== undefined && data !== null) {

        var obj = JSON.parse(data.AdditionalResults[0].Message);
        var dist_cm = obj.distance_cm; //Distance in centimeters
        var dist_in = obj.distance_in; //Distance in Inches
        var handSwitch = obj.switchstate;  //Status of the wand switch
    }

    if (handSwitch == "pressed")
     {
 
         misty.Debug("The hand switch has been PRESSED!!!");
         misty.ChangeLED(255, 0, 0); //change the LED to red
         misty.DisplayText("Pressed"); //display message on Misty Screen
         misty.DriveTime(-20,0, 1000); //Drive backwards
         misty.Pause(3000);
 
     } //end if pressed
     else
     {
        //Change LED to blueish
        misty.ChangeLED(0, 120, 100);
        misty.Pause(3000);    
     }

     misty.Debug("dist_cm: " + dist_cm + " dist_in: " + dist_in +" Switch: " + handSwitch);
     
     misty.DisplayText(dist_in+" in"); //display the distance in inches on Misty Screen
     //misty.DisplayText(dist_cm+" cm"); //display the distance in centimenters on Misty Screen

} //End Function backpackMessage
