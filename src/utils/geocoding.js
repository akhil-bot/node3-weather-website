const request=require('request')
const geocoding=((address,callback)=>{
    //console.log(address,'in geo locn')
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWtoaWwyMzAyIiwiYSI6ImNrN3JhemR5ZzBiaGszZ252eDM5dTBka2cifQ.XKQNIxCsA8_fKCI4PbmVhw&limit=1'
    request({url:geocodeurl,json:true},(error,{body})=>{
    if(error){
        console.log('address',address,response)
        callback('Unable to connect to geocoding service!',undefined)
    }else if(body.features.length===0){
        console.log('address###',address,body)
        callback('Unable to find location :( Please try again',undefined)
    }else{
        callback(undefined, {
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        })
    }
        
    }
    )

})
module.exports=geocoding