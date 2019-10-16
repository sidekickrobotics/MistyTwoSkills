// Sends a message to debug listeners
misty.Debug("The Weather skill is starting! - External Request")


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

}
