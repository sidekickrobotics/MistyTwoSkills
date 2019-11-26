/**********************************************************************
My "Who for Halloween?" Misty skill"

\Misty II plays different characters for Halloween

Date First Written: 10/17/2019
Date Last Update: 11/26/2019
Date Last Tested: 11/26/2019

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

// Sends a message for debug 
misty.Debug("The Who for Halloween? Skill is starting!")

//Who should I dress up as for Halloween?

//TODO: Implement a random selection function here, either triggered off of a voice request or a button press

//For Right now - force a sequence of possible halloween costumes
playCharacter("DefaultMisty");

misty.Pause(3000); //Wait 3 seconds
playCharacter("Zombie");

misty.Pause(3000); //Wait 
playCharacter("DefaultMisty");

misty.Pause(3000); //Wait
playCharacter("R2D2");

misty.Pause(3000); //Wait
playCharacter("DefaultMisty");

misty.Pause(3000); //Wait
playCharacter("Chewbacca");

misty.Pause(3000); //Wait 5 seconds
playCharacter("DefaultMisty");


function playCharacter(characterName){

    switch (characterName){


        case "DefaultMisty":
            //Have Misty return to a Default Initial Position for Misty Head and Arms

            //misty.MoveArms(left position, right position, left speed, right speed)
            misty.MoveArms(45, 45, 90, 90); //arms hanging down at side 45 degrees
            
            //misty.MoveHeadDegrees(pitch, roll, yaw, velocity, [int prePauseMs], [int postPauseMs]);
            misty.MoveHead(-10, 0, 0, 90, 50, 50);  //Move head looking straight forward and slightly up
            misty.DisplayImage("e_DefaultContent.jpg"); //Default Misty eyes

            break //End DefaultMisty

        case "R2D2":
            //Misty is R2DR - plays wav file, and moves back and forth
            misty.Debug("R2D2 Selected");
            
            //change display and LED
            misty.ChangeLED(0,0,255,0,100); 
            misty.DisplayImage("e_R2D2_Robot.png");

            //https://www.thesoundarchive.com/starwars/R2D2-yeah.wav
            misty.PlayAudio("R2D2-yeah.wav", 70,0,10);
            misty.ChangeLED(255,255,255, 0,100); //Change LED to white

            //misty.DriveTime(double linearVelocity, double angularVelocity, int timeMs, [double degree], [int prePauseMs], [int postPauseMs]);
            misty.DriveTime(1, -70, 500, 50, 50); // Turns Misty to her right
            misty.ChangeLED(0,0,255,0,100);     // Change LED to blue
            misty.DriveTime(-1, 70, 500, 50, 50); // Turns Misty to her left
            misty.ChangeLED(255,255,255,0,100); //Change LED to white
            misty.DriveTime(1, -30, 500, 50, 50);// Turns Misty to her right
            misty.ChangeLED(0,0,255,0,100);     // Change LED to blue
            misty.DriveTime(-1, 30, 600, 50, 50); // Turns Misty to her left
            misty.PlayAudio("R2D2-yeah.wav", 70,0,10); //play again

            break //End R2D2


        case "Chewbacca":
            //Misty is Chewy - plays wav file, and raises arms
            misty.Debug("Chewbacca");

            //change display and LED
            misty.DisplayImage("e_Chewie.png");
            misty.ChangeLED(128,64,0,0,100); //Change LED to...maybe Brown 

            //MoveArms(left position, right position, left speed, right speed)
            misty.MoveArms(-25,-25, 80, 80); //move arms up like they are over head
            misty.MoveHead(-25, -2, 0, 90, 50, 50);  //Move head up

            //https://www.thesoundarchive.com/play-wav-files.asp?sound=starwars/chewy_roar.wav
            misty.PlayAudio("chewy_roar.wav", 99); //play at high volume

            break //End Chewbacca

        case "Zombie":
            //Misty is Zombie- plays wav file, and arms should move out in front
            misty.Debug("Zombie");
            
            misty.ChangeLED(128,128,0,0,100); //Change LED to sickly green
            misty.DisplayImage("e_Zombie.png");

            misty.Pause(500); 

            //Need to find a good zombie sound
            misty.PlayAudio("s_Fear.wav");

            //MoveArms(left position, right position, left speed, right speed)
            misty.MoveArms(0, 0, 70, 70); //start with both arms straight out            
            misty.MoveHead(-20, -5, 0, 90, 50, 50);  //Move head back and forth
            
            misty.MoveArms(-15, 18, 50, 50); //right arm slightly up and left slightly down, move slowly            
            misty.MoveHead(-20, 2, 0, 90, 50, 50);  //Move head back and forth
            
            misty.MoveArms(10, -18, 50, 50); //left arm slightly up and right slightly down, move slowly            
            misty.MoveHead(-20, -5, 0, 90, 50, 50);  //Move head back and forth
 
            //Need to find a good zombie sound
            misty.PlayAudio("s_Fear.wav");

            break //End Zombie


        
        case "ADD_ONE_HERE":
            //ADD MORE Halloween costumes here!
            //change display and LED
            //include a movement
            //include a sound
            break

    } //End switch case

}//End Play Character Function
