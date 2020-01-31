// Sends a message to debug listeners
misty.Debug("The Weather skill is starting! - External Request")
misty.SetDefaultVolume(20);

misty.SendExternalRequest(
    "GET",
    "http://api.weatherstack.com/current?access_key="+_params.access_key+"&query="+_params.query
    );

function _SendExternalRequest(data) {

    _data = JSON.parse(data.Result.ResponseObject.Data)

    _temperature = _data.current.temperature
    _weather_descriptions = _data.current.weather_descriptions

    _name = _data.location.name

    misty.Debug("Misty here! Just letting you know it's " + _temperature + " and " + _weather_descriptions + " in " + _name);
   
    //Misty Speaks!!!
    misty.Speak("Misty here! Just letting you know it is " + _temperature + " and " + _weather_descriptions + " in " + _name);
    
    showOff_getWeather();
}


function showOff_getWeather() { 
    
    misty.Debug("Showing Off the getWeather Skill");
    misty.Speak("Showing Off the getWeather Skill");
    
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
