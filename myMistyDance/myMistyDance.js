/**********************************************************************
My Misty Dance submission 

Testing on Misty II with different arm and head movement combinations. 
This skill uses the magnetic prop arm. Not tested with Misty arms. 

Date First Written: 11/12/2019
Date Last Tested: 11/14/2019

This is experimental CODE, used for my learning
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

misty.Debug("The my Misty Dance skill is starting! - with Prop Arms");

//Misty needs to start with Default Misty Parameters
misty.Pause(3000);
misty.DisplayImage("e_DefaultContent.jpg");
misty.Pause(3000);
misty.ChangeLED(100,70,160,0,100); //Change to default Misty purple
misty.Pause(3000);


//Put the Dance Move to test here, or use the showOff function below
//playDanceMove("headbang");
//misty.Pause(3000);
//playDanceMove("simplewaltz");
//misty.Pause(3000);


function playDanceMove(danceMove){

    switch (danceMove){

        case "simplewaltz":
            //Misty moved in a square pattern, back and forth
            //TODO: Could add random small turns to the basic square
            misty.Debug("Misty does a simple waltz dance!");
            
            misty.MoveHead(0, 0, 0, 90, 50, 50);  //Move head looking straight
            misty.Pause(1000);

            misty.ChangeLED(100,70,160,0,100); //Change to default Misty purple
            misty.DisplayImage("e_SystemBlinkStandard.jpg"); //Misty close eyes

            misty.MoveHead(-15, 0, 0, 90, 50, 1000);  //Move head looking up more than normal
            
            //Move Arms like getting into ready position
            //misty.MoveArm(string arm ("left", right, both), position, velocity, duration, [int prePauseMs], [int postPauseMs]);   
            misty.MoveArm("both", 45, 60, 0, 50, 500);         //Move arm to normal 45 degree hang position to start
            misty.MoveArm("both", 15, 45, 0, 50, 50);          //arm move to indicate start step
            misty.MoveArm("both", 45, 60, 0, 50, 500);         //Move arm to normal 45 degree hang position to start

            for (var i = 1; i <= 3; i=i+1){
            
                waltzDrive("reverse");
                misty.MoveArm("both", 15, 45, 0, 50, 500); //move arms a bit
                misty.Pause(300);
                misty.MoveArm("both", 25, 45, 0, 50, 500); //move arms a bit
                waltzDrive("forward");
                misty.Pause(300);
            
            }//End for
            
            break //End simplewaltz

        case "groovy":

            //TODO: Change Misty LED to slowly pulse - perhaps eventually with sound of music
            misty.ChangeLED(100,70,160,0,100);
            //Change Display to closed eyes - like grooving
            misty.DisplayImage("e_SystemBlinkStandard.jpg"); 

            misty.MoveArm("both", 45, 60, 0, 50, 1000);        //Move arm to normal 45 degree hang position to start
            misty.MoveHead(-10, 0, 0, 50, 50, 50);             //Move head - to default start position
            let groovyPause = 1000;


            //move head slowly back and forth pattern and arms waving
            for (var i = 1; i <= 3; i=i+1){
                
                misty.MoveHead(10, 35, -10, 60, 50, 50); //Move head - groovy position 1               
                misty.MoveArm("right", 15, 60, 0, 50, 50); 
                misty.MoveArm("left", 25, 60, 0, 50, 50); 
                misty.DriveTime(5,5,1000); //Drive forward a little
                misty.Pause(groovyPause);

                misty.MoveHead(14, -27, -10, 50, 50, 50); //Move head - groovy position 2
                misty.MoveArm("right", 45, 30, 0, 50, 50);  
                misty.MoveArm("left", 35, 30, 0, 50, 50); 
                misty.DriveTime(-5,-5,1000);
                misty.Pause(groovyPause);
                
                misty.MoveHead(-13, -32, -2, 50, 50, 50); //Move head - groovy position 3
                misty.MoveArm("right", 35, 30, 0, 50, 50); 
                misty.MoveArm("left", 15, 30, 0, 50, 50); 
                misty.DriveTime(10,10,1000);
                misty.Pause(groovyPause);
                
                misty.MoveHead(-15, 35, -13, 50, 50, 50); //Move head - groovy position 4     
                misty.MoveArm("right", 0, 30, 0, 50, 50);     
                misty.MoveArm("left", 0, 30, 0, 50, 50);     
                misty.DriveTime(5,5,1000);
                misty.Pause(groovyPause);

                } //End For


            break //End Groovy

        case "headbang":
            //Misty nod YES vigourously back and forth - if only Misty had hair!

            misty.Pause(3000);
            misty.DisplayImage("e_DefaultContent.jpg");
            misty.Pause(3000);
            misty.ChangeLED(100,70,160,0,100); //Change to default Misty purple
            misty.Pause(3000);

            misty.ChangeLED(250,0,0); //Change LED to RED
            misty.MoveArm("both", 45, 60, 0, 50, 1000);         //Move arm to normal 45 degree hang position to start
            misty.MoveHead(-10, 0, 0, 50, 50, 50);              //Move head - to default start position           
                      
            let headbangPause = 1000;

            //These are closest eyes - closed with tears for straining
            misty.Pause(2000);
            misty.DisplayImage("e_EcstacyHilarious.jpg"); 
            misty.Pause(2000);

            //move head up and down 20 times - increase this if want Misty to headbang longer
            for (var i = 1; i <= 20; i=i+1){       
                
                misty.MoveHead(-20, 0, 0, 80, 10, 10); //Move head up
                misty.MoveArm("both", 0, 40, 0, 50, 50); 
                misty.Pause(headbangPause);
                
                misty.MoveHead(20, 0, 0, 80, 10, 10);  //Move head down
                misty.MoveArm("both", 45, 40, 0, 50, 50); 
                misty.Pause(headbangPause);
        
            } //End For
            
            misty.MoveHead(0, 0, 0, 90);   //Head at zero position
            misty.Pause(500);              //Pause  half a second

            misty.MoveArms(45, 45, 90, 90); //arms hanging down at side 45 degrees

            break //End Headbang

        case "moonwalk":

            //Moon walk does not work exactly right. In development
            misty.Debug("Misty does the moonwalk");
            misty.DisplayImage("e_DefaultContent.jpg");
            misty.MoveArm("both", 0, 60, 0, 50, 500);  

            //moonwalkDrive is another take on the squareDrive function
            moonwalkDrive();


            break; //End Moonwalk


        case "YourDanceHERE":
            misty.Debug("Have a dance idea - add it here");
            break; //End YourDanceHere
        

    } //End switch case Dance move

}//End playDanceMove function 




let showOffSkill = true; //Set to "true" to see the skill

if (showOffSkill){ 
    
    misty.Debug("Showing Off the Dance Skill");
    let myPauseTime = 2000;

    //Test out all of the dances once
    for (var i = 1; i <= 1; i=i+1){
        
        misty.Pause(myPauseTime);    
        playDanceMove("simplewaltz"); 
        misty.Pause(myPauseTime);    
        playDanceMove("groovy"); 
        misty.Pause(myPauseTime);    
        playDanceMove("headbang");
        misty.Pause(myPauseTime);     
        playDanceMove("moonwalk"); 
        misty.Pause(myPauseTime);   
        playDanceMove("YourDanceHERE"); //Test out your dance
        misty.Pause(myPauseTime); 
        
    } //End For
    
    misty.Debug("Ending Showing-Off now");
    
}




//---------------------Support Functions--------------------------------------------



// NOTICE: waltzDrive function was modified from the driveSquare function in the tutorials

function waltzDrive(direction) {
    
    var i;
    var fwdrev; //variable to keep track of direction

    if(direction == "forward"){
        fwdrev = false;
    }
    else if(direction == "reverse"){
        fwdrev = true; 
    }
    else {
        misty.Debug("Incorrect Direction in waltzDrive!")
    }    


    for (i = 0; i < 180; i+=90) { //Change to 180 to only do half a square
        // Drives the length of one side of the square
        misty.DriveHeading(i, 0.2, 3000, fwdrev);
        // Pauses execution to prevent other commands from overriding
        // the misty.driveHeading() method. Adjust this timing to have
        // Misty drive without stopping
        misty.Pause(3500);
        // Turns Misty in a 90 degree arc before driving the next length
        // of the square.
        misty.DriveArc(i+90, 0.0, 3000, fwdrev);
        // Pauses execution to prevent other commands from overriding
        // the misty.driveArc() method. Adjust this timing to have
        // Misty drive without stopping
        misty.Pause(3500);
    };

}


// NOTICE: moonwalkDrive function was modified from the driveSquare function in the Misty tutorials
function moonwalkDrive() {
    var i;
    let moonDistance = 0.8; //meters

    //Do the walk back and forth 3 times
    for (i = 0; i < 3; i+=1) {       

        //misty.MoveHeadDegrees(pitch, roll, yaw, velocity, [int prePauseMs], [int postPauseMs]);
        misty.MoveHead(0, 0, -85, 70);   //Head at look out of the stage - needs to align with direction of travel
        misty.MoveArm("both", 0, 60, 0, 50, 500);  

        misty.Debug("Beginning of moonwalk drive");
        //Go reverse in one direction 
        //misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])
        misty.DriveHeading(0, moonDistance, 9000, true);   //velocity = distance / (timeMs/1000). Misty top speed is ~0.45m/sec

        // Misty drive without stopping
        misty.Pause(10000); //Had to increase pause time to get Misty to go the full distance. 3000 does not work

        // Turns Misty completely around using two 90 degree arc turns.
        misty.DriveArc(90, 0.0, 3000, true);
        misty.Debug("after first quarter turn");
        misty.Pause(3500);
        misty.DriveArc(180, 0.0, 3000, true);
        misty.Debug("after second quarter turn");
        // Pauses execution to prevent other commands from overriding
        // the misty.driveArc() method. Adjust this timing to have
        // Misty drive without stopping
        misty.MoveHead(0, 0, 85, 70);   //Head at look out of the stage
        misty.MoveArm("both", 45, 60, 0, 50, 500); 
        misty.Pause(3500);

        //Go reverse in other direction
        //misty.DriveHeading(double heading, double distance, double timeMs, [bool reverse], [int prePauseMs], [int postPauseMs])  
        misty.DriveHeading(180, moonDistance, 9000, true);   //velocity = distance / (timeMs/1000). Misty top speed is ~45 cm/sec 
                       
        misty.Pause(10000); //Had to increase the Pause time to get Misty to go full distance

        // Turns Misty completely around using two 90 degree arc turns.
        misty.DriveArc(270, 0.0, 3000, true);
        misty.Debug("Misty turns to 270");
        misty.Pause(3500);
        misty.Debug("Misty turns to 360 or 0");
        misty.DriveArc(360, 0.0, 3000, true);
        //misty.DriveArc(360, 0.0, 3000, false);
        misty.Pause(3500);
        //Misty should be facing original direction     

    }; //End For Loop

}//end moonwalkDrive function
