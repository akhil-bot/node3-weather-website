const request=require('request')
const forecast=((latitude,longitude,callback)=>{
    const forecasturl = 'https://api.darksky.net/forecast/a1a6f65edf68ac346cb76d82650b3918/'+latitude+','+longitude+'?units=si'
    request({url:forecasturl,json:true},(error,{body})=>{
    if(error){
        //console.log(error)
        callback('Unable to connect to forecast service!',undefined)
    }else if(body.error){
        //console.log(response,latitude,longitude)
        callback('Given address not found!!',undefined)
    }else{
        //console.log(response.body)
        callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.There is a ' + body.currently.precipProbability + '% chance of rain.')
        
    }
        
    }
    )

})
module.exports=forecast