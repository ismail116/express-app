const request = require("request");

const mapp = (address, callback) => {
  const geocode =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw";

  request({ url: geocode, json: true }, (error, response) => {
    // console.log(response.body.error)

    //invalid link -- internet -- low level error
    if (error) {
      callback("unable to Connect to Map APi", undefined);
    }
    // invalid data -- invalid Key -- invalid country
    else if (response.body.message) {
      // console.log(response.body.message);
      callback("unable to Connect to services", undefined);
    }
    // invalid country name
    else if (response.body.features.length == 0) {
      // console.log(response.body.features);
      callback("Your search is wrong", undefined);
    }
    // success
    else {
      //    const long = response.body.features[0].center[0]
      //    const lat = response.body.features[0].center[1]
      //callback(undefined,long +" , "+lat)
      callback(undefined, {
        long: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
      });
    }
  });
};

module.exports = mapp

