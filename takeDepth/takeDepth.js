/**********************************************************************
takeDepth picture using the Occipital Sensor

Testing on Misty II obstacle detection - See objects off the ground 

Date First Written: 12/17/2019
Date Last Update: 1/10/2019 
Date Last Tested: 1/10/2019

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


//Uncomment this to get Misty to take a Depth Picture
misty.Pause(5000);
misty.TakeDepthPicture();
misty.Pause(5000);

//Take Depth Picture function is not used yet for obstacle avoidance, just trying to get good information from it. This function uses the
//Occipital sensor and Takes a picture, then filters the result into ONE average value. 


function _TakeDepthPicture(data)
{
    misty.Debug(JSON.stringify(data));
    
    var myWidth = data.Result.Width; //What does this need to be?
    var myHeight = data.Result.Height; //What does this need to be?
    
    var myStatus = data.Status;
    var myDepthImage = data.Result.Image;
    
    misty.Debug('The height, width are '+ myHeight +", "+ myWidth);
    misty.Debug('The status is '+ myStatus); 
    misty.Debug('The first Image value is '+ myDepthImage[1] + " and the Image Array length is " + myDepthImage.length); //Arrays are 0-based
    
    //If there is data in the Image
    if (myDepthImage.length > 0){
        
        var nCounter; //a counter
        var testDepth; //a Depth variable for populating
        var depthCount = 0;
        var depthSum = 0.01;
        var columnDepthSum = zeroFilledArray(320);
        var columnDepthCnt = zeroFilledArray(320);
        var columnDepth = zeroFilledArray(320);
        var arvar = 0;


        //testDepth = myDepthImage[15];  //Pick a random element to make sure it is working
        //misty.Debug("This is the selected array element depth: " + testDepth );
        misty.Debug("This is the check on column depth: " + columnDepth.length);

        //Find one values
        for (nCounter = 0; nCounter < myDepthImage.length; nCounter+=1){

             //misty.Debug(nCounter + " Means the counter is working!");
            
            if (myDepthImage[nCounter] !== "NaN"){

                testDepth = myDepthImage[nCounter]; 
                depthCount = depthCount + 1; //Add one to the count
                depthSum = depthSum + testDepth; //add the measured depth to the sum
                aveDepth = depthSum/depthCount;  //Get the average of all the measured

                arvar = nCounter%320; //There are 320 rows - the remainder is the row column
                //misty.Debug("This is the check on arvar: " + arvar);

                columnDepthSum[arvar] = columnDepthSum[arvar] + myDepthImage[nCounter];
                columnDepthCnt[arvar] = columnDepthCnt[arvar] + 1;

                //TODO: If it is <80*320 then top, if >160*80 then bottom, else mid

                //Top leftmost 0 to 80 and 0 to 80 rows    

                //TODO: In the future, get the min and max
            
                
            }//End If Depth is NaN
      
        }//End For counter to loop through all 76800 values

        for (nCounter = 0; nCounter < columnDepthCnt.length; nCounter+=1){

            if(columnDepthCnt[nCounter] !==0){
            columnDepth[nCounter] = columnDepthSum[nCounter]/columnDepthCnt[nCounter];
            }
        }


        misty.Debug("With a count " + depthCount + " the average depth is " + aveDepth);
        misty.Pause(200);

        //misty.Debug("The column depth is " + columnDepth.toFixed(2)); //cant be more than 240
        misty.Debug("The column depth is " + columnDepth); //cant be more than 240

        //This works to limit to two decimal places
        misty.Debug("The third column depth is " + columnDepth[3].toFixed(2)); //cant be more than 240
    
    }//End If depthImage length check

    Depth12pts(data);
    //To Investigate: 
    //Get the average? This is way off - brief investigation
    //Get one in each quadrant? 
    //get one in the center?

}//Endtake depth



//Depth12pts function
//TakeDepthPicture array and calculate averages over 3 rows of 4 squares = 12 total. 
//Each block is the average of 80x80 = 6400 measurements

// The 12 points cover teh field of view like this:
// TOP:    TopFarLeft - TopNearLeft - TopNearRight - TopFarRight
// MIDDLE: MidFarLeft - MidNearLeft - MidNearRight - MidFarRight
// BOTTOM: BtmFarLeft - BtmNearLeft - BtmNearRight - BtmFarRight

//The names of the variables: 
//TFL - TNL - TNR - TFR
//MFL - MNL - MNR - MFR
//BFL - BNL - BNR - BFR

//The final array is in the form:
//Depth12pts = [TFL, TNL, TNR, TFR, MFL, MNL, MNR, MFR, BFL, BNL, BNR, BFR]

function Depth12pts(data)
{
    //misty.Debug(JSON.stringify(data));
    
    var myWidth = data.Result.Width; //What does this need to be?
    var myHeight = data.Result.Height; //What does this need to be?
    
    var myStatus = data.Status;
    var myDepthImage = data.Result.Image;

    var cnt = 0; //Counter variable
    var NaNcount = 0;
    var indes = 0;
    var depthCount = 0;
    var depthSum = 0;
    var TakeDepth12pts = zeroFilledArray(12);

    misty.Debug('Running the Depth 12 points function');

    //Declare variables for the 12 points
    var TFL = 0;
    var TNL = 0;
    var TNR = 0;
    var TFR = 0;
    var MFL = 0;
    var MNL = 0;
    var MNR = 0;
    var MFR = 0;
    var BFL = 0;
    var BNL = 0;
    var BNR = 0;
    var BFR = 0;

    //Declare the count variables
    var TFL_cnt = 0;
    var TNL_cnt = 0;
    var TNR_cnt = 0;
    var TFR_cnt = 0;
    var MFL_cnt = 0;
    var MNL_cnt = 0;
    var MNR_cnt = 0;
    var MFR_cnt = 0;
    var BFL_cnt = 0;
    var BNL_cnt = 0;
    var BNR_cnt = 0;
    var BFR_cnt = 0;
    
    //Declare total sum variables for the 12 points
    var TFL_sum = 0;
    var TNL_sum = 0;
    var TNR_sum = 0;
    var TFR_sum = 0;
    var MFL_sum = 0;
    var MNL_sum = 0;
    var MNR_sum = 0;
    var MFR_sum = 0;
    var BFL_sum = 0;
    var BNL_sum = 0;
    var BNR_sum = 0;
    var BFR_sum = 0;

    //set all NaN values to zero
    for (cnt = 0; cnt < myDepthImage.length; cnt+=1){
        if (myDepthImage[cnt] == "NaN"){
            //myDepthImage[cnt] = 0;
            NaNcount = NaNcount +1;
        }
    }

    //misty.Debug(NaNcount + ' is the NaN count' + (NaNcount/76800).toFixed(2));

    //set all NaN values to zero
    for (cnt = 0; cnt < myDepthImage.length; cnt+=1){
        if (myDepthImage[cnt] != "NaN"){
            depthCount = depthCount + 1;
            depthSum = depthSum + myDepthImage[cnt];

            indes = cnt%320; //

            if (indes <=80) {  
                if (cnt <=25600){
                    TFL_sum = TFL_sum + myDepthImage[cnt];
                    TFL_cnt = TFL_cnt + 1;
                }
                else if(cnt<= 51200){
                    MFL_sum = MFL_sum + myDepthImage[cnt];
                    MFL_cnt = MFL_cnt + 1;
                }
                else{
                    BFL_sum = BFL_sum + myDepthImage[cnt];
                    BFL_cnt = BFL_cnt + 1;
                }

            } //End Far Left Check  
            else if(indes <=160) {
                if (cnt <=25600){
                    TNL_sum = TNL_sum + myDepthImage[cnt];
                    TNL_cnt = TNL_cnt + 1;
                }
                else if(cnt<= 51200){
                    MNL_sum = MNL_sum + myDepthImage[cnt];
                    MNL_cnt = MNL_cnt + 1;
                }
                else{
                    BNL_sum = BNL_sum + myDepthImage[cnt];
                    BNL_cnt = BNL_cnt + 1;
                }
            } // End Near Left Check 
            
            else if(indes <=240) { 
                if (cnt <=25600){
                    TNR_sum = TNR_sum + myDepthImage[cnt];
                    TNR_cnt = TNR_cnt + 1;
                }
                else if(cnt<= 51200){
                    MNR_sum = MNR_sum + myDepthImage[cnt];
                    MNR_cnt = MNR_cnt + 1;
                }
                else{
                    BNR_sum = BNR_sum + myDepthImage[cnt];
                    BNR_cnt = BNR_cnt + 1;
                }
            } // End Near Right Check

            else {
                if (cnt <=25600){
                    TFR_sum = TFR_sum + myDepthImage[cnt];
                    TFR_cnt = TFR_cnt + 1;
                }
                else if(cnt<= 51200){
                    MFR_sum = MFR_sum + myDepthImage[cnt];
                    MFR_cnt = MFR_cnt + 1;
                }
                else{
                    BFR_sum = BFR_sum + myDepthImage[cnt];
                    BFR_cnt = BFR_cnt + 1;
                }
            } // End Far Right Check
        } //End If NaN
    } //End For

    //Leftmost Column - FarLeft
    TFL = TFL_sum/TFL_cnt;
    MFL = MFL_sum/MFL_cnt;
    BFL = BFL_sum/BFL_cnt;

    //Next Column - NearLeft
    TNL = TNL_sum/TNL_cnt;
    MNL = MNL_sum/MNL_cnt;
    BNL = BNL_sum/BNL_cnt;

    //Next Column - NearRight
    TNR = TNR_sum/TNR_cnt;
    MNR = MNR_sum/MNR_cnt;
    BNR = BNR_sum/BNR_cnt;

    //RightMost Column - FarRight
    TFR = TFR_sum/TFR_cnt;
    MFR = MFR_sum/MFR_cnt;
    BFR = BFR_sum/BFR_cnt;

    TakeDepth12pts = [TFL, TNL, TNR, TFL, MFL, MNL, MNR, MFR, BFL, BNL, BNR, BFR];

     //Print outall of the depth points
    misty.Debug('The 12 depth points: ' + TakeDepth12pts);
    
} //End take depth 12 pts


function zeroFilledArray(size){
    var x = [];
    for (var i = 0; i < size; i++) x[i] = 0;
    return x;

}
