

//require modules
const weatherService = require('../utils/weather-service');
const path = require('path');
const express = require('express');
const hbs = require('hbs');


//setting paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");


//creating app instance
const app = express();

//setting port
const port = process.env.PORT||3000;

//making express js to use provided static content path
app.use(express.static(publicPath));


//setting templating engine in express
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setting template-engine to use partials
hbs.registerPartials(partialPath);


//using view engine to render pages dyamically
// app.get("/", (req, res)=>{
//   res.render('home', {title: "Home", page:"Home"});
// })

// app.get("/weather", (req, res)=>{
//   res.render('header', {title: "weather", page: "Weather"});
// })

app.get("/about", (req, res)=>{
  res.render('about', {title: "about", page:"about"});
})

app.get("/blogs", (req, res)=>{
  res.render('blogs', {title: "blog", page:"blog"});
})

//route for weather api
app.get("/weather", (req, res)=>{

  if(!req.query.city){
    return res.send({
      error: "you must provide a location"
    })
  }

  weatherService({
    city: req.query.city,
    state: req.query.state,
    country: req.query.state,
  }, (error, wdata)=>{
    if(error){
      return res.send(error);
    }
    res.send(wdata);
  });
  
})

//rout for weather info webpage
app.get('/', (req, res)=>{
  res.render('weatherinfo', {
    title: 'weather info',
    page:'Weather'
  })
})

//404 handeling

app.get('*', (req, res)=>{
  res.render('404');
})

//starting up server
app.listen(port, ()=>{
  console.log("Server started on http://localhost:3000");
})