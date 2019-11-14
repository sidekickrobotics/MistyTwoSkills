
/**********************************************************************
Misty requests from yesno API and then pretends to flip a coin. 
Yes = Heads
No = Tails
Working with different ways to move the head, arms, in co-ordination with sounds

Experimental Code - Used for my learning 
**********************************************************************/
misty.Debug("The pretend coin flip skill is starting!")

let yesnoURL =  "https://yesno.wtf/api"

misty.SendExternalRequest("GET", yesnoURL);

function _SendExternalRequest(data) {

    //Parse Data from API call
    _data = JSON.parse(data.Result.ResponseObject.Data);
    
    //put the answer in an answer variable
    _answer = _data.answer;
    
    misty.Debug("Misty here! The answer is " + _answer +" !");
    let MyYesNo = _answer;

    if(MyYesNo == "yes")
    {
        misty.Debug("Pretend Coin is Heads!"); // Yes = Heads
          
        CoinToss(); //Call the CoinToss Function
        
        //misty.PlayAudio(string fileName, [int volume], [int prePauseMs], [int postPauseMs]);
        misty.PlayAudio("s_thePretendCoinCameUpHeads.wav", 20);
    }
    else if (MyYesNo == "no")
    {
        misty.Debug("Pretend Coin is Tails!"); // No = Tails
        CoinToss();

        //misty.PlayAudio(string fileName, [int volume], [int prePauseMs], [int postPauseMs]);
        misty.PlayAudio("s_thePretendCoinCameUpTails.wav", 20);
    }
    else if (MyYesNo == "maybe"){
        misty.Debug("Coin landed on edge!"); //API returns 'maybe' every 10,000 requests - tricky
        CoinToss();
        misty.PlayAudio("s_DisorientedConfused.wav", 20);
        //TODO: Put in a Misty shrug here to show inconclusive result     
    }
    else
    {
        misty.Debug("Something went wrong and there is no coinflip.");
    }

} //End _SendExternalRequest



// Toss a Coin and look at result and then say the result 
function CoinToss() {
    
    misty.ChangeLED(80, 80, 80); //Change LED to Yellow

    //misty.MoveHead(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
    //misty.MoveArm(arm(string), position, velocity, duration, prePause, PostPause)

    //Set Misty to an initial position for consistent starting        
    misty.MoveHead(0, 0, 0, 90);    // Move Head to zero position
    misty.Pause(1000);              // Pause ? seconds

    //Use misty.MoveArm to move only one arm or both at the same time 
    //misty.MoveArm(string arm (left, right, both), position, velocity, duration, [int prePauseMs], [int postPauseMs]);
    misty.MoveArm("both", 0, 60, 0, 50, 1000);  //Move arm straight - making both arms move to ensure movement
    misty.MoveArm("both", 45, 60, 0, 50, 1000);  //Move arm to normal 45 degree hang position
    misty.MoveArm("both", 25, 60, 0, 50, 1000);  //Move arms to 25 degree hang position
    //The above code was used to make sure that the arms were moving. Sometimes could not tell what
    //was happening with the commands, so put a little arm jig at the beginning to let me know
    //when the skill had started by looking at Misty and not console. 

    //Note: Move Arm range is 90 (fully down) to -29 (fully up). 0 Points the arms straight forward.

    //Use misty.MoveArms when you want to move arms at the same time, but the arms are to move at different speeds and positions 
    //misty.MoveArms(leftArmPosition , rightArmPosition, leftArmVelocity, rightArmVelocity. duration, [int prePauseMs], [int postPauseMs]);

    misty.Pause(2000);
    misty.MoveHead(22, 6, -45, 60, 50, 500);  //Move head right to look at hand
    misty.Pause(1000);

    //misty.MoveArmDegrees(string arm, double degrees, double velocity, [int prePauseMs], [int postPauseMs])
    //misty.MoveArmDegrees("right", -15, 90, 50, 1000); // up like throwing
    //misty.MoveArm(string arm (left, right, both), position, velocity, duration, [int prePauseMs], [int postPauseMs]);       
    misty.MoveArm("right", -15, 90, 0, 1000, 100); // up like throwing
        
    misty.PlayAudio('s_CoinToss.wav', 90); //Try to play the coin toss at the exact time the arm moves up
    //Source http://freesoundstock.blogspot.com/2018/08/coin-toss-sound-effect.html
    //play the coin toss sound here
    misty.Pause(100);
    misty.MoveHead(-25, 5, -10, 40, 50, 500); //move head like looking up 
    misty.Pause(1000);

    //misty.MoveArmDegrees("right", 10, 60, 100, 500); //Move arm down like catching it
    misty.MoveArm("right", 10, 95, 0, 50, 1000);  //Move arm down like catching it
    misty.Pause(2000);        
    misty.MoveHead(20, 6, -42, 40, 50, 1000);  //Move head right to look at hand
    misty.Pause(3000);   
    //misty.MoveArmDegrees("right", -5, 60, 100, 500); //Move arm up straight - like Misty is showing you the coin
    misty.MoveArm("right", -15, 90, 0, 100, 100);  //Move arm up straight - like Misty is showing you the coin
    misty.Pause(2000);   


    //misty.MoveHead(-25, 5, -10, 40, 10, 10); //move head left
    //misty.Pause(5000);
    misty.MoveHead(-15, 0, 0, 90); //Head at zero position
    //After teh coin has come back down, Misty looks at right hand and says
    
    misty.Pause(500); // Pause  3 seconds

    //misty.MoveArmDegrees("right", 120, 30, 0, 1500); // down

    
} //End Coin Toss  


// Function TestMove: Test Moves in smallest move increment and speeds.  
function TestMove() {
    
    misty.ChangeLED(250, 0, 0); //Change LED to Red to indicate Testing

    misty.MoveHead(0, 0, 0, 90); // Move Head to zero position - try to always start from 0
    misty.Pause(3000);           // Pause 3 seconds, to let head get there

    let smallestMove = 1.0; //Play with this in 0.1 to 1 increments [0.1 is barely noticeable, 0.5 is slightly noticeable, so chose 1.0]
    let moveSpeed = 60;     //Play with Speed from 1 to 100 - Zero Speed never moves!

    //misty.MoveHead(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
    for (var i = 1; i <= 2; i=i+1){
        //move head side to side 3 times
        misty.MoveHead(smallestMove, smallestMove, smallestMove, moveSpeed, 50, 50);  //Move head positive direction
        misty.Pause(3000);
        misty.MoveHead(-smallestMove, -smallestMove, -smallestMove, moveSpeed, 50, 50); //move head negative direction
        misty.Pause(3000);

    }

    misty.MoveHead(0, 0, 0, 90); //Return Head to zero position
    misty.Pause(500); // Pause  3 seconds
    
} //End TestMove


// Testing out smoother operation 
function CoinToss_Smooth() {
    
    misty.ChangeLED(255, 128, 80); //Change LED to Golden Color

    let myPrePause = 500;    //Prepause for time - tested in range of 50 to 1000 (1sec) - 500 seemed to be best for these steps
    let myPostPause = 500;   //Post Pause for a time - tested in range of 50 to 1000 (1sec) - 500 seemed to be best for these steps
    let myDefaultSpeed = 60; //Default speed, note >90 is to fast 

    let numTosses = 1;      //Number of tosses - make this 1 unles you want to do best of 3, 5, etc

    misty.MoveHead(0, 0, 0, 90); //Move Head to zero position
    misty.Pause(3000);      // Pause 3 seconds, to let head get there

 
    for (var i = 1; i <= numTosses; i=i+1){
        
        //misty.MoveHead(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
        //misty.MoveHead(pitch down(26) to up(-40), roll right(40) to left(-40), yaw right(-81) to left(81), velocity (0-100), [int prePauseMs], [int postPauseMs]);
        misty.MoveHead(0, 0, 0, 90,myPrePause, myPostPause); //Head should already be here, but move head to zero position

        //Start by looking down at a coin in the right hand - move from zero to lookRightHand pose
        misty.MoveHead(0, 0, 0, myDefaultSpeed, myPrePause, myPostPause); //Head should already be here, but move head to zero position
        misty.MoveHead(1, 1, -4, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(3, 1, -8, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(6, 1, -12, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(10, 2, -15, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(14, 2, -15, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(17, 3, -25, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(19, 3, -30, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(21, 4, -35, myDefaultSpeed, myPrePause, myPostPause); 
        misty.MoveHead(22, 5, -38, myDefaultSpeed, myPrePause, myPostPause); 

        misty.MoveHead(23, 6, -40, myDefaultSpeed, myPrePause, myPostPause); //This is the FINAL looking at Coin in Right Hand position       

        //Note: The above is very choppy
        
        misty.Pause(5000);
       // misty.MoveHead(-25, 5, -10, 60, 10, 10); //move head up position
        misty.Pause(5000);

    }

    misty.MoveHead(0, 0, 0, 90); //Head at zero position
    misty.Pause(500); // Pause  3 seconds
    
} //End Coin Toss Smoother


let showOffSkill = false; //Set to "true" to see the skill

if (showOffSkill){ 
    
    misty.Debug("Showing Off the Toss a Pretend Coin Skill");


    for (var i = 1; i <= 1; i=i+1){
        misty.Pause(5000);    
        CoinToss();
        //CoinToss_Smooth();
        //TestMove();
        misty.Pause(100);    
        
    } //End For
    
    misty.Debug("Ending Showing-Off now");
    
}
