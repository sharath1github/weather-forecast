const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const API_KEY ='2d1cf84fd23b16414d4ca3959e4e8e63';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);



function searchBtn() {
  const enteredValue = document.querySelector(".searchbar").value;
  document.querySelector(".error").style.display = "none";
  console.log(enteredValue);
  weatherData(enteredValue);
}

async function weatherData(city) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=378603cebc014f298d5164956232702&q=${city}&days=7&aqi=no&alerts=no`
  ).then((response) => {
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
    }

    return response.json();
  });

  //   console.log(data);
  //setting up the city name

  document.querySelector(".city").innerHTML = `${data.location.name}`;
  // Code Snippet for setting the Temperature,Description,Humidity,Windspeed,Date,Icons
  for (let i = 1; i < 8; i++) {
    document.querySelector(`.t${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.avgtemp_c
    }°C`;
    let description = `${
      data.forecast.forecastday[`${i - 1}`].day.condition.text
    }`;
    document.querySelector(`.d${i}`).innerHTML = description;
    document.querySelector(`.h${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.avghumidity
    }%`;
    document.querySelector(`.w${i}`).innerHTML = `${
      data.forecast.forecastday[`${i - 1}`].day.maxwind_kph
    }km/h`;

    i > 1
      ? (document.querySelector(`.date${i}`).innerHTML = `${
          data.forecast.forecastday[`${i - 1}`].date
        }`)
      : null;

    if (
      description == "Patchy rain possible" ||
      description == "Moderate rain"
    ) {
      document.querySelector(`.i${i}`).src = "./assets/moderate rain.svg";
    } else if (description == "Partly cloudy") {
      document.querySelector(`.i${i}`).src = "./assets/partly cloudy.svg";
    } else if (description == "Sunny") {
      document.querySelector(`.i${i}`).src = "./assets/Sunny.svg";
    } else if (description == "Heavy rain") {
      document.querySelector(`.i${i}`).src = "./assets/heavy rain.svg";
    } else if (description == "Overcast") {
      document.querySelector(`.i${i}`).src = "./assets/Overcast.svg";
    }
  }
}

weatherData("Delhi");
