import './index.css';

const app = document.querySelector('.app');
const search = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.error');

import rainIcon from './images/rain.png';
import cloudIcon from './images/cloud.png';
import clearIcon from './images/clear.png';
import stormIcon from './images/storm.png';
import snowIcon from './images/snow.png';
import mistIcon from './images/mist.png';

const searchWeather = () => {
  const city = searchInput.value;
  const APIKey ='YOUR_OPEN_WEATHER_API_KEY' //add your OpenWeatherAPI key here

  if (city != '') {

    app.style.height = '430px';
  }

    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then(response => 
     response.json())
  .then(data => {

    if (data.cod === '404') {

      error.style.display = 'block';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      app.style.height = '180px';
      return;
    }

    error.style.display = 'none';
    weatherBox.style.display = '';
    weatherDetails.style.display = '';

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humidity = document.querySelector('.humidity section');
    const wind = document.querySelector('.wind section');

    switch (data.weather[0].main) {
        case 'Clear':
          image.src = clearIcon;
          break;
        case 'Clouds':
          image.src = cloudIcon;
          break;
        case 'Rain':
          image.src = rainIcon;
          break;      
        case 'Thunderstorm':
          image.src = stormIcon;
          break;
        case 'Snow':
          image.src = snowIcon;
          break;
        case 'Mist':
          image.src = mistIcon;
          break;
        default:
          image.src = '';
      }

    temperature.innerHTML = `${data.main.temp}°C`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed}Km/h`;


  })
  .catch(error => {
    console.log("Error!");
    console.error(error);
  });  


}

search.addEventListener('click', searchWeather);

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchWeather();
  }
});