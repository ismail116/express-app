const express = require('express')
const path = require('path')

const publicDirectory= path.join(__dirname,'../public')

const app = express()


const port =  process.env.PORT ||3000

//localhost:3000
// app.get('/', (req, res) => {
//   res.send('<h1>header Home Page </h1>')
// })

// //localhost:3000/help
// app.get('/help', (req, res) => {
//   res.send({
//     name:'ismail',
//     age:23
//   })
// })

// //localhost:3000/about
// app.get('/about', (req, res) => {
//   res.send('Hello AboutPage!!')
// })

// //localhost:3000/weather
// app.get('/weather', (req, res) => {
//   res.send({
//     forcast:"sunny",
//     country:"egypt"
//   })
// })

////////////////////////////////////////////////////////////////

app.use(express.static(publicDirectory))
////////////////////////////////////////////////////////////////
app.set('view engine','hbs');

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'help page',
    name:'Helal',
    test:'new'
  })
})

app.get('/',(req,res)=>{
  res.render('index',{
    title:'Index Hbs page',
    name:'Mohamed',
    
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About page',
    Image:"img/onboarding.png",
    
  })
})

////////////////////////////////////////////////////////////////

const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
////////////////////////////////////////////////////////////////

const hbs = require('hbs')
const { hostname } = require('os')
const partialsPath = path.join(__dirname,'../templates/partials/')
hbs.registerPartials(partialsPath)

////////////////////////////////////////////////////////////////

// app.get('*',(req,res)=>{
//   res.send('404 not found')
// })


// localhost:3000/weather?forcast=egypt

const geocode= require('./tools/geocode')
const forcast= require('./tools/forcast')

app.get('/weather',(req,res)=>{

  if(!req.query.address){
    return res.send({error:"you must provide address"})
  }
  geocode(req.query.address,(error,data)=>{
    if(error){
      return res.send({error:error})
    }
    console.log(data)
    forcast(data.lat,data.long,(error,forcastdata)=>{

      if(error){
        //shorthand
        return res.send({error})
      }
      console.log(forcastdata)
    
      res.send({
        location: req.query.address,
        forcast:forcastdata
      })

    })
  })
  

})



app.get('*',(req,res)=>{
  res.render('error',{
    title:' Error Not Found',
    name:'Error.'
    
  })
})

////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})