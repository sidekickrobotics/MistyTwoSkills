
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



// Toss a Coin and look at result in right hand
function CoinToss() {
    
    misty.ChangeLED(80, 80, 80); //Change LED to Yellow

    //Set Misty to an initial position for consistent starting        
    misty.MoveHead(0, 0, 0, 90);    // Move Head to zero position
    misty.Pause(1000);              // Pause to allow move to finish

    //misty.MoveArm(string arm (left, right, both), position, velocity, duration, [int prePauseMs], [int postPauseMs]);
    misty.MoveArm("both", 0, 60, 0, 50, 1000);  //Move arm straight - making both arms move to ensure movement
    misty.MoveArm("both", 45, 60, 0, 50, 1000);  //Move arm to normal 45 degree hang position
    misty.MoveArm("both", 25, 60, 0, 50, 1000);  //Move arms to 25 degree hang position
    //The above code was used to make sure that the arms were moving. Sometimes could not tell what
    //was happening with the commands, so put a little arm jig at the beginning to let me know
    //when the skill had started by looking at Misty and not console. 

    //Note: Move Arm range is 90 (fully down) to -29 (fully up). 0 Points the arms straight forward

    misty.Pause(2000);
    misty.MoveHead(22, 6, -45, 60);  //Move head right to look at hand
    misty.Pause(1500);

    //misty.MoveArm(string arm (left, right, both), position, velocity, duration, [int prePauseMs], [int postPauseMs]);       
    misty.MoveArm("right", -15, 90, 0, 1000, 100); // up like throwing
        
    //play the coin toss sound here
    misty.PlayAudio('s_CoinToss.wav', 90); //Try to play the coin toss at the exact time the arm moves up
    //Source http://freesoundstock.blogspot.com/2018/08/coin-toss-sound-effect.html
    
    misty.Pause(100);
    misty.MoveHead(-25, 5, -10, 60); //move head like looking up 
    misty.Pause(1500);

    //misty.MoveArmDegrees("right", 10, 60, 100, 500); //Move arm down like catching it
    misty.MoveArm("right", 10, 95, 0, 50, 1000);  //Move arm down like catching it
    misty.Pause(2000);        
    misty.MoveHead(20, 6, -42, 60);  //Move head right to look at hand
    misty.Pause(4000);   
    //misty.MoveArmDegrees("right", -5, 60, 100, 500); //Move arm up straight - like Misty is showing you the coin
    misty.MoveArm("right", -15, 90, 0, 100, 100);  //Move arm up straight - like Misty is showing you the coin
    misty.Pause(2000);   

    misty.MoveHead(-15, 0, 0, 90); //Head at zero position
    
    misty.Pause(500); // Pause 
    
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
        misty.MoveHead(smallestMove, smallestMove, smallestMove, moveSpeed);  //Move head positive direction
        misty.Pause(3000);
        misty.MoveHead(-smallestMove, -smallestMove, -smallestMove, moveSpeed); //move head negative direction
        misty.Pause(3000);

    }

    misty.MoveHead(0, 0, 0, 90); //Return Head to zero position
    misty.Pause(500); // Pause  3 seconds
    
} //End TestMove


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
