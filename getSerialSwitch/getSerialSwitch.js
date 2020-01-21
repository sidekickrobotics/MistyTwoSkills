/**********************************************************************
getSerialSwitch - obtain switch status through Serial port 

Testing addition of an Arduino monitored switch

Date First Written: 1/14/2019
Date Last Update: 1/21/2020 
Date Last Tested: 1/21/2020

This is experimental CODE, used for my learning.
************************************************************************/

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

// Initialize LED to white, a do short move to singal the start of program
misty.ChangeLED(0, 0, 255);
misty.Pause(2000);
misty.MoveHead(10, 0, 0); //Misty Looks up slightly
//misty.DriveTime(20,0, 5000); 

//This is from Misty BackPack Documentation and API? in community forum
misty.AddReturnProperty("backpackSwitch", "SerialMessage");
misty.RegisterEvent("backpackSwitch", "SerialMessage", 50, true);


function _backpackSwitch(data) {

     var message = data.AdditionalResults[0].Message;
     
     misty.Debug("Message Received: " + message);

     misty.Debug(JSON.stringify(data.AdditionalResults[0].Message));

     if (message == "Pressed")
     {
 
         misty.Debug("The Arduino button has been PRESSED!!!");
         misty.ChangeLED(255, 0, 0);
         //misty.Stop();
         misty.DriveTime(-20,0, 1000); //Drive backwards
         misty.Pause(3000);
 
     } 
     else
     {
        //Change LED to Green
        misty.ChangeLED(0, 120, 100);
        misty.Pause(3000);    
     }
 
}