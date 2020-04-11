const path=require('path') 
const express=require('express')
const app=express()
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocoding.js')
const port=process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'./templates/views')
const partialsPath=path.join(__dirname,'./templates/partials')


//setup handlebars engine
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static dir to server 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Akhil'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Akhil'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        helpTxt:'Random Content',
        name:'Akhil'
    })
})

app.get('/weather',(req,res)=>
{
    if(!req.query.address){
        return res.send(
            {
                error:"You must provide an address."
            }
        )
    }
    const location=req.query.address
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
        return res.send({error})
        }
        forecast(
            latitude,longitude,(error,forecastdata)=>{
                if(error){
                    return res.send({error})
                    }
            console.log(location)
            console.log(forecastdata)
            res.send({
                location:location,
                forecast:forecastdata
            })
        }
        )
    }
    )
    console.log(req.query)
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Akhil',
        errorMsg:'Help article not found.'

        

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Akhil',
        errorMsg:'Page not found.'

        

    })
})

//app.com
//app.com/help
//app.com/about
app.listen(port,()=>{
    console.log('server is up on '+port)
})