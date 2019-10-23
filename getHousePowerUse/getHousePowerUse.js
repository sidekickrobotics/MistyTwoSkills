/*
MIT License

Copyright (c) 2019 sidekickrobotics

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


// Descriiption: Misty Skill reads power consumption from a connected home power
// meter and conveys relative usage information
//  LED - red=hi, green=low, yellow=normal
//  Face Display red, yellow, green lightning bolt
//  Left Arm acts as dial - meant to be a higher resolution (Not yet implemented)

// Users should:
//  -Change ip address
//  -Change power level high and low thresholds in displayHousePower

//To Run without connecting to a power monitor, the script can be run by commeting


// Sends a message for debug 
misty.Debug("The Home Power Use Skill is starting!")

//pwrURL can be configured for either a local ip or API
let pwrURL ="http://<your power meter ip address here>/current-sample"

misty.SendExternalRequest("GET", pwrURL);

function _SendExternalRequest(data) {

    //Parse Data from API call
    _data = JSON.parse(data.Result.ResponseObject.Data)
    
    _type = _data.channels[2].type  //check that data.channels[2].type = "CONSUMPTION" to ensure correct channel
    _power = _data.channels[2].p_W  //get total power comsumption

    //_sensorId = _data.sensorId //This is debug to check correct sensor
    
    misty.Debug("Misty here! Just letting you know power " + _type +  " is " + _power + "W");
    
    displayHousePower(_power);
    
}


function displayHousePower(housePower){

    let powerThresholdHi = 2000; //Power in Watts 
    let powerThresholdLo = 1000;  //Power in Watts
    
    if (housePower > powerThresholdHi){
        displayPow = "red";
    }
    else if (housePower < powerThresholdLo){
        displayPow = "green"
    }
    else {
        displayPow = "yellow"
    }


    switch (displayPow){

        case "red":
            misty.Debug("Power consumption high" + housePower + "W");
            misty.ChangeLED(250, 0, 0); //Red LED 

            misty.MoveArmDegrees("left", -25, 60, 0); // left arm up to indicate high usage  
            misty.DisplayImage("e_RedBolt.jpg");

            break;//End High Case

        case "green":
            misty.Debug("Power consumption low: " + housePower + "W");
            misty.ChangeLED(0, 250, 0); //Green LED to indicate low

            misty.MoveArmDegrees("left", 80, 60, 0); // left arm point down to indicate low usage  
            misty.DisplayImage("e_GreenBolt.jpg");

            break; //End Low Case

        default:
            misty.Debug("Power consumption normal" + housePower + "W");
            misty.ChangeLED(250, 128, 0); //Yellow/Orange LED to indicate nominal

            misty.MoveArmDegrees("left", 45, 60, 0); // move arm normal level
            misty.DisplayImage("e_YellowBolt.jpg");

            break; //End the default case

    }
}

misty.DisplayImage("e_DefaultContent.jpg");
misty.SetBlinking(true);

// Testing and Showoff Purposes - confirm that correct levels and display

let showOffSkill = true; //Set to "false" to turn off showing-off the skill

if (showOffSkill){ 
    
    misty.Debug("Showing-Off the House Power Monitor Skill");
    
    misty.DisplayImage("e_DefaultContent.jpg"); //Start with default
    misty.SetBlinking(true);
    
    misty.Pause(3000);  
    displayHousePower(10); //Display if only using 10W - should be green
    misty.Pause(3000);
    displayHousePower(1500); //Display 1.5kW - should be yeller    
    misty.Pause(3000);
    displayHousePower(3000); //Display 3kw - should be red
    misty.Pause(3000);
    
    misty.DisplayImage("e_DefaultContent.jpg"); //Set back to default 
    misty.SetBlinking(true);
    misty.Debug("Ending Showing-Off now");
    
}
