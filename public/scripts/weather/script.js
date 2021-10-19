console.log("client side script is loaded");

let urla;
//getting form
const form = document.querySelector('#wform');

const cityInput = document.querySelector('#location');

const processInfo = document.querySelector('#process-info');

const linfo = document.querySelector('#linfo');
const cityDisplay = document.querySelector('#city');
const countryDisplay = document.querySelector('#country');

const infoSection = document.querySelector('#info-section');
const tempvalue = document.querySelector('#tempvalue');
const realvalue = document.querySelector('#realfeelvalue');


form.addEventListener('submit', (e) => {
  e.preventDefault();


  const city = cityInput.value;
  urla = '/weather?city=' +city;

  console.log('urla');
  fetch(urla).then((response)=>{
    response.json().then((data)=>{
      // console.log(data);
      if(data.error){
        processInfo.textContent = data.error;
        return console.log(data.error);
       
      }

      processInfo.textContent = '';
      
      tempvalue.textContent = data.temp;
      realvalue.textContent = data.feels_like;
      infoSection.style.display = 'inline-block';

      //location display
      cityDisplay.textContent = data.name;
      countryDisplay.textContent = data.country;
      linfo.style.display = 'inline-block';
    })
  })
})
