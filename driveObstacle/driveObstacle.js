
/**********************************************************************
My Misty Obstacle submission 

Testing on Misty II obstacle detection - Football moves 

Date First Written: 10/21/2019
Date Last Update: 11/24/2019
Date Last Tested: 11/24/2019

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

// Initialize LED to white, a do short move to singal the start of program
misty.ChangeLED(255, 255, 255);
misty.Pause(2000);
misty.MoveHead(-10, 0, 0); //Misty Looks up slightly
misty.Pause(1000);
DriveForwardShort(); //Forward about a foot
misty.Pause(1000);
DriveBackwardShort(); //backwards about a foot
misty.Pause(1000);

//misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
misty.DriveTime(20, 0, 12000); // Misty to Drive to Score a Touchdown - Long move for 12 seconds 


// Notice: From TOF example in Misty Sample Code - Creates a property test for TOF event messages to check whether the
// value of the type property is "range". 
//misty.AddPropertyTest("TOF", "type", "==", "Range", "string"); 
//misty.AddPropertyTest("TOF", "DistanceInMeters", "<=", 0.20, "double"); 

// Registers a new event listener for TimeOfFlight events. 
//misty.RegisterEvent("TOF", "TimeOfFlight", 1000, false);

//First detection set at half a meter
misty.AddPropertyTest("LeftTOFNEAR", "SensorPosition", "==", "Left", "string");
misty.AddPropertyTest("LeftTOFNEAR", "DistanceInMeters", "<=", 0.5, "double");
misty.AddPropertyTest("LeftTOFNEAR", "status", "==", 0, "integer"); //Check that status is RangeValid
misty.RegisterEvent("LeftTOFNEAR", "TimeOfFlight", 100, false); //set to false to get message once

//Second detection at quarter of meter
misty.AddPropertyTest("LeftTOFMOVE", "SensorPosition", "==", "Left", "string");
misty.AddPropertyTest("LeftTOFMOVE", "DistanceInMeters", "<=", 0.25, "double");
misty.AddPropertyTest("LeftTOFNEAR", "status", "== ", 0, "integer"); //Check that status is RangeValid
misty.RegisterEvent("LeftTOFMOVE", "TimeOfFlight", 100, false); //set to false to get message once


function _LeftTOFNEAR(data){

    //Change LED, but do not take movement actions

    let distance = data.PropertyTestResults[0].PropertyParent.DistanceInMeters;

    misty.Debug("The TOF Left is NEAR: " + distance +"m");
    misty.ChangeLED(0, 0, 250); // Changes LED to Blue
    misty.Pause(100);
    
 }

 function _LeftTOFMOVE(data){

    //Object is close enough need to take action
    let distance = data.PropertyTestResults[0].PropertyParent.DistanceInMeters;

    misty.Debug("The TOF Left: " + distance + "m indicates Misty should MOVE");
   
    misty.ChangeLED(250, 0, 0); // Changes LED to RED

    misty.Pause(1000);//Pause
    misty.Debug("Drive Backwards away from obstacle");
    DriveBackwardShort();
    misty.Pause(1000);
    DriveBackwardShort();
    misty.Pause(1000);
    misty.ChangeLED(250, 0, 250); // Changes LED to Purple
    misty.Debug("Drive Around");
    misty.Pause(2000);  
    DriveForwardLeft90(); //Left first, can switch with right
    misty.Pause(2000);   
    DriveForwardRight90();
    misty.Pause(2000);  
    DriveForward();
    misty.Pause(2000);
    
    misty.ChangeLED(255, 255, 255); //Change LED to White at the end
 }
  


//NOTICE: This idea is from Phillip Vinhha in his Dance Move entry 
//Each of the following functions defines a small Misty move, 

function DriveForward()
{
    // DriveForward() = Drives forward straight about 1 meter
    misty.Debug("DriveForward");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.0; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 5000, null, 50, 50);
}

function DriveForwardShort()
{
    // DriveForwardShort() = Drives forward 1 sec - about a foot
    misty.Debug("DriveForwardShort");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.0; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 1000, null, 50, 50);
}


function DriveForwardLeft()
{
    misty.Debug("DriveForwardLeft");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.6*linearVelocity; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 3000, null, 50, 50);
}

function DriveForwardRight()
{
    misty.Debug("DriveForwardRight");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = -0.6*linearVelocity; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 3000, null, 50, 50);
}

function DriveBackward()
{
    misty.Debug("DriveBackward");
    let linearVelocity = -20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.0; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 3000, null, 50, 50); //Reduce time backwards to match forward
}

function DriveBackwardShort()
{
    misty.Debug("DriveBackward");
    let linearVelocity = -20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.0; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 1500, null, 50, 50); //Reduce time backwards to match forward
}

function DriveBackwardLeft()
{
    misty.Debug("DriveBackwardLeft");
    let linearVelocity = -20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 0.5*linearVelocity; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 5000, null, 50, 50);
}

function DriveBackwardRight()
{
    misty.Debug("DriveBackwardRight");
    let linearVelocity = -20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = -0.5*linearVelocity; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 5000, null, 50, 50);
}

function DriveForwardRight90()
{
    misty.Debug("DriveForwardRight90");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = -60; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 2000, null, 50, 50);
}

function DriveForwardLeft90()
{
    misty.Debug("DriveForwardLeft90");
    let linearVelocity = 20; //Linear Velocity from -100 (full reverse) to 100 (full forward)
    let angularVelocity = 60; //Angular Velocity -100 (full right) to 100 (full left): Use SMALL values 
    // Syntax misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
    misty.DriveTime(linearVelocity, angularVelocity, 2000, null, 50, 50);
}
