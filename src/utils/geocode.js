const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoibWlkaS04MiIsImEiOiJjazBkY2l3Y2MwNjVuM21vNThvcnlqZTBpIn0._vIEv29pgQMlpO07vmn7jA'
    request({
        url,
        json: true
        },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                callback('No location found', undefined)
            } else {
                callback(undefined, {
                    longitude: body.features[0].geometry.coordinates[0],
                    latitude: body.features[0].geometry.coordinates[1],
                    location: body.features[0].text
                })
            }
        }
    )
}

module.exports = geocode