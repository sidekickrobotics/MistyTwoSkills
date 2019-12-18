
/**********************************************************************
paceDrive() - Misty paces back and forth

This program is a modification of the sample squareDrive and shows another
option for coding Misty to drive, but back and forth instead of in a square.

This code is meant to be helpful in speeding up testing for obstacles. Misty
drives in a straight path, turns around and drives back the same distance, 
then turns around to original position. Increase the paceCount for Misty
to perform the drive-turn-drive-turn action multiple times. 

Note: See notes in the squareDrive() example for more helpful notes. squareDrive is
found at MistyCommunity/SampleCode/Javascript SDK Code Samples/ in Github

Date First Written: 11/8/2019
Date Last Update: 12/13/2019
Date Last Tested: 12/13/2019

This is experimental CODE, used for my learning.
**********************************************************************/

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

//Initialize Variables
let paceDistance = 0.8; //meters - distance to pace
let paceTime = 8000;    //milliseconds - time to pace

let paceCount = 5; //set a number of times to pace. Min is 1.


// Return data when a bump sensor is pressed
misty.AddPropertyTest("BumpSensor", "isContacted", "==", true, "boolean");
// Return the sensorName property of BumpSensor events
misty.AddReturnProperty("BumpSensor", "sensorName");
// Register for BumpSensor events
misty.RegisterEvent("BumpSensor", "BumpSensor", 200, true);


// Rotates Misty back to an absolute heading of 0 over 4000ms
misty.DriveArc(0, 0.0, 4000, false);
// Pauses skill execution for 4000ms (when rotation is complete)
misty.Pause(4000);


function paceDrive() {
    var i;
    for (i = 0; i < paceCount; i+=1) {       

        misty.Debug("Beginning of For drives 0 heading");
        //Pace one direction - drive in heading 0 for paceDistance meters
        //misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
        misty.DriveHeading(0, paceDistance, 9000, false);   //velocity = distance / (timeMs/1000). Misty top speed is ~0.45m/sec
        // Pauses execution to prevent other commands from overriding
        // the misty.driveHeading() method. Adjust this timing to have Misty drive without stopping
        misty.Pause(10000); //Had to increase pause time to get Misty to go the full distance. 3000 does not work

        // Turns Misty completely around using two 90 degree arc turns.
        misty.DriveArc(90, 0.0, 3000, false);
        misty.Debug("after first quarter turn");
        misty.Pause(3500);
        misty.DriveArc(180, 0.0, 3000, false);
        misty.Debug("after second quarter turn");
        misty.Pause(3500);

        //Pace back the other direction - drive in heading 180 for paceDistance meters
        //misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])  
        misty.DriveHeading(180, paceDistance, 9000, false);   //velocity = distance / (timeMs/1000). Misty top speed is ~45 cm/sec 
        misty.Pause(10000); 

        // Turns Misty completely around using two 90 degree arc turns.
        misty.DriveArc(270, 0.0, 3000, false);
        misty.Debug("Misty turns to 270");
        misty.Pause(3500);
        misty.Debug("Misty turns to 360 or 0");
        misty.DriveArc(360, 0.0, 3000, false);
        misty.Pause(3500);
        //Misty should be facing original heading

        misty.Debug("Misty is on " + i + " of " + paceCount + " paces") ;
        
    }; //End For Loop

}//end paceDrive function

paceDrive();

// Handle BumpSensor event data
function _BumpSensor(data) {
    // Store the name of the touched sensor
    let sensorName = data.AdditionalResults[0];

    // Play a different audio clip when
    // each sensor is prssed
    switch (sensorName) {

        case "Bump_FrontRight":
            misty.Debug("front right bump sensor pressed");
            misty.ChangeLED(100,70,10);
            break

        case "Bump_FrontLeft":
            misty.Debug("front left bump sensor pressed");
            misty.ChangeLED(250,0,0);
            break

        case "Bump_RearRight":
            misty.Debug("rear right bump sensor pressed");
            misty.ChangeLED(128,128,0);
            break

        case "Bump_RearLeft":
            misty.Debug("rear left bump sensor pressed");
            misty.ChangeLED(0,128,128);          
            break
    }
}



