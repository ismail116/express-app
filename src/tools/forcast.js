const request = require('request')

const forcast =(latitude,longitude,callback)=>{
 const url = "https://api.weatherapi.com/v1/current.json?key=78424c6517e14b9d98b72458220607&q=" + latitude+ "," +longitude

 request ({url,json:true},(error,response)=>{


     if(error){
        callback("unable to Connect to weather API",undefined)
     }
      // invalid data -- invalid Key -- invalid country
      else if(response.body.error) {
          callback("unable to find to Location",undefined)
     }
     // success
     else{
        callback(undefined," IN "+ response.body.location.country + " it is now "  + response.body.current.condition.text + " "+response.body.current.temp_c)
     }

})

}

module.exports=forcast
