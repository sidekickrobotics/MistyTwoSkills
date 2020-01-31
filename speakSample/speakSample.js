
// Sends a message to debug listeners
misty.Debug("Hello, Misty Here! The speaking sample skill is starting!");

misty.SetDefaultVolume(10);
misty.Pause(1000);
misty.Speak("Hello, Misty Here! The speaking sample skill is starting!");


//showOff_getWeather();
//showOff_Speak();

//speakFrench();
//speakParagraph();
//speakSentence();
speakLegendary();
toTheMoon();

function showOff_getWeather() { 
    
    misty.Debug("Showing Off the getWeather Skill");
    misty.Speak("Misty here! Showing Off the getWeather Skill");
    
    //Set some fake variables to simulate the temperature and weather
    let showoff_temp = 72;
    let showoff_description = "Sunny and Nice";
    let showoff_city = "Chicago";


    //Debug message for console
    misty.Debug("Misty here! Just letting you know it's " + showoff_temp + " and " + showoff_description + " in " + showoff_city);

    //Misty Speaks!!!
    misty.Speak("Misty here! Just letting you know it is " + showoff_temp + " and " + showoff_description + " in " + showoff_city);
    
    misty.Pause(1000);
    misty.Debug("Ending Showing Off now");
    misty.Speak("Ending Showing Off now");
}

function showOff_Speak() {
    
    //Testing different volumes and strings to speak
    misty.SetDefaultVolume(20);
    misty.Pause(1000);
    misty.Speak("<speak> I can talk at different speeds. <prosody rate=\"fast\">I can talk really fast</prosody>. The weather is the weather - it will change </p> </speak>");
    misty.Pause(1000);
    misty.Speak("Saying 1 versus one, -1 versus minus one, 2 versus two, 34 versus thirty four, 4000000 versus four million");
    misty.Pause(1000);
    misty.Speak("Misty here! If you want to know the weather - GO outside!");
    misty.Pause(1000);
    misty.Speak("Saying -2 versus minus 2, -42 versus minus forty two");
    misty.Pause(1000);

    var myLongString ='<speak> \
                        this \
                        is \
                        a \
                        long string </speak> ';

    var myOtherLongString ='<speak> ' +
                        'this '+
                        'is ' +
                        'another ' +
                        'long string </speak> ';

    misty.Speak(myLongString);
    misty.Pause(1000);
    misty.Speak(myOtherLongString);
 


    misty.Pause(1000);
    misty.Speak("<speak>" +
                "I can talk at different speeds." +
                "<prosody rate=\"fast\">I can talk really fast</prosody>." +
                "<prosody rate=\"x-slow\">Or I can talk really slow</prosody>." +
                "I can talk at different volumes. " +
                "This is the default volume. " +
                "<prosody volume=\"x-low\">I can whisper.</prosody>."+
                "<prosody volume=\"x-loud\">Or I can yell!</prosody>" +
                "</speak>");

 


    misty.Speak("Ending Testing now");
    misty.Debug("Ending Testing now");


}


function speakFrench(){

    misty.Pause(1000);
    misty.Speak("<speak>" +
    "How do you say <lang xml:lang=\"fr-FR\">Bonjour le monde</lang> in English?"+
    "</speak>");
}


function speakParagraph(){
    misty.Pause(1000);
    misty.Speak("<speak>" +
    "<p>This is the first paragraph. There should be a pause after this text is spoken.</p> " +     
    "<p>This is the second paragraph.</p>" + 
    "</speak>");

}

function speakSentence(){
    misty.Pause(1000);
    misty.Speak("<speak>" +
    "<s>This is a sentence</s>" +
    "<s>There should be a short pause before this second sentence</s>" +
    "This sentence ends with a period and should have the same pause." +
    "</speak>");

}

function speakLegendary(){
    misty.Pause(1000);
    misty.Speak("<speak>" +
    "It is gonna be legen <break strength=\"x-strong\"/> wait for it <break strength=\"x-strong\"/> dary!" +
    "</speak>");

}

function toTheMoon(){
    //Famous JFK speech exerpt
    misty.Speak("...We choose to go to the moon. We choose to go to the moon in this decade and do the other things, " +
              " not because they are easy, but because they are hard, because that goal will serve to organize and "+ 
              " measure the best of our energies and skills, because that challenge is one that we are willing to accept,"+
              " one we are unwilling to postpone, and one which we intend to win");
}