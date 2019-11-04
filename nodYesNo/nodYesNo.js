/**********************************************************************
Misty requests from yesno API and then nods yes or no
**********************************************************************/
misty.Debug("The nod Yes or No skill is starting! - External Request Tutorial")

let yesnoURL =  "https://yesno.wtf/api"

misty.SendExternalRequest("GET", yesnoURL);

//Function 
function _SendExternalRequest(data) {

    //Parse Data from API call
    _data = JSON.parse(data.Result.ResponseObject.Data);
    
    //put the answer in an answer variable
    _answer = _data.answer 
    
    misty.Debug("Misty here! The answer is " + _answer +" !");
    let MyYesNo = _answer;

    if(MyYesNo == "yes"){
        misty.Debug("Said Yes")
        nodHeadYes();

    }else if (MyYesNo == "no"){
        misty.Debug("Said No")
        nodHeadNo();
    }
}


// Nod Head affirmative
function nodHeadYes() {

    misty.ChangeLED(0,250,0); //Change LED to Green when saying Yes
    
    //move head up and down 3 times
    for (var i = 1; i <= 3; i=i+1){       
        
        misty.MoveHead(-10, 0, 0, 50, 50, 50); //Move head up
        misty.Pause(500);
        misty.MoveHead(10, 0, 0, 50, 10, 10);  //Move head down
        misty.Pause(500);

    } //End For
    
    misty.MoveHead(0, 0, 0, 90);   //Head at zero position
    misty.Pause(500);              //Pause  half a second
    
} //End NodHeadYes


// Nod Head affirmative - with no Pause
function nodHeadYes_noPause() {

    misty.ChangeLED(0,250,0); //Change LED to Green when saying Yes
    
    //move head up and down 3 times
    for (var i = 1; i <= 3; i=i+1){
       
        //misty.MoveHead(double pitch, double roll, double yaw, double velocity, [int prePauseMs], [int postPauseMs]);
        misty.MoveHead(-10, 0, 0, 50, 50, 50); //Move head up
        //misty.Pause(500);
        misty.MoveHead(10, 0, 0, 50, 510, 510);  //Move head down
        //misty.Pause(500);

    } //End For
    
    misty.MoveHead(0, 0, 0, 90);   //Head at zero position
    misty.Pause(500);              //Pause  half a second
    
} //End NodHeadYes


// Nod Head affirmative - level 2 more emphatically
function nodHeadYes2() {

    misty.ChangeLED(0,80,0); //Change LED to Green when saying Yes
    
    for (var i = 1; i <= 3; i=i+1){
        //move head up and down 3 times

        misty.MoveHead(-20, -2, 0, 90, 50, 50);  //Move head up
        misty.Pause(500);
        misty.MoveHead(15, 2, 0, 90, 10, 10);    //Move head down
        misty.Pause(500);

    } //End For
    
    misty.MoveHead(0, 0, 0, 90); //Head at zero position
    misty.Pause(500); // Pause  1/2 seconds
    
} //End NodHeadYes2


// Nod Head No
function nodHeadNo() {
    
    misty.ChangeLED(255, 0, 0); //Change LED to Red

    for (var i = 1; i <= 3; i=i+1){
        //move head side to side 3 times
        misty.MoveHead(0, 0, -20, 90, 50, 50);  //Move head right
        misty.Pause(500);
        misty.MoveHead(0, 0, 20, 90, 10, 10); //move head left
        misty.Pause(500);

    }

    misty.MoveHead(0, 0, 0, 90); //Head at zero position
    misty.Pause(500); // Pause  half second
    
} //End NodHeadNo


// Nod Head No - more emphatically 
function nodHeadNo2() {
    
    misty.ChangeLED(80, 0, 0); //Change LED to Red

    for (var i = 1; i <= 3; i=i+1){
        //move head side to side 3 times
        misty.MoveHead(0, 0, -50, 90, 50, 50);  //Move head right
        misty.Pause(500);
        misty.MoveHead(0, 0, 50, 90, 10, 10); //move head left
        misty.Pause(500);

    }

    misty.MoveHead(0, 0, 0, 90); //Head at zero position
    misty.Pause(500); // Pause  3 seconds
    
} //End NodHeadNo2


let showOffSkill = false; //Set to "true" to see the skill

if (showOffSkill){ 
    
    misty.Debug("Showing Off the Nod Yes or No Skill");


    for (var i = 1; i <= 3; i=i+1){
        //Run through the nods three times
        nodHeadYes();
        //nodHeadYes_noPause();
        //nodHeadYes2();
        nodHeadNo();
        //nodHeadNo2();
        misty.Pause(1000);    
        
    } //End For
    
    misty.Debug("Ending Showing-Off now");
    
}