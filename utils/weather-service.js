const request = require('postman-request');

const weatherAPI = (addressObj, callback)=>{

  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${addressObj.city},${addressObj.state},${addressObj.Country}&units=metric&appid=472830c2dffc0ea6ba4f59e4aca7cdfe`;
  // console.log(url);

  request({url, json:true}, (error, {body}= {})=>{
    if(error){
      callback({error: "Could not connect to the weather services"}, undefined);
    }else if(body.cod >= 400){
      callback({error: body.message}, undefined);
      
    }else{
      callback(undefined, {name:body.name, country:body.sys.country, temp: body.main.temp, feels_like:body.main.feels_like});
    }
  })

}

module.exports = weatherAPI;  

// https://api.openweathermap.org/data/2.5/weather?q=kanpur,UP,INDIA&units=metric&appid=472830c2dffc0ea6ba4f59e4aca7cdfe