const request = require('request');


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/baa95ac3534c7a81fd988cd2878e6f0f/'+ latitude +',' + longitude + '?units=ca&exclude=minutely,hourly';

    request(
        {url,
        json: true},
        (error, {body}) => {
           if(error) {
               callback('Unable to connect to weather network service', undefined);
           } else if (body.error) {
               callback('Unable to find weather data for given location.', undefined);
           }  else {
           const temperature = body.currently.temperature;
           const rainProb = body.currently.precipProbability;
           const summary = body.daily.summary;

           const result = 'Summary of weather conditions: ' + summary + ' It is currently '+ temperature + ' degrees. There is a probability of ' + rainProb + ' % of rain.';
           
           callback(undefined, result);
           }
        }
    )

}

module.exports = forecast;


