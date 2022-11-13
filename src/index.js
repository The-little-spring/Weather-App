//current date and time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector(".current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];
  return `&nbsp${day}/${month}`;
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7)
      forecastHTML =
        forecastHTML +
        `
      <div class="each-day">
        <div class="each-description">
          <p class="date">${formatDay(
            forecastDay.dt
          )}<span>${formatForecastDate(forecastDay.dt)}</span></p>
          <div class="temp-prediction"> <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° / </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° C</span></div>
        </div>
          <img src="images/${
            forecastDay.weather[0].icon
          }.png" alt="prediction-image" />
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

//current temperature, Geo

function showTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  roundTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${roundTemperature}°`;

  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/h`;

  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  weatherIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

//Search city

function search(event) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  search(searchInput.value);
}

//live location

function showPosition(position) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getLiveLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//C to F convertor

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = Math.round((roundTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(roundTemperature);
  temperatureElement.innerHTML = `${temperature}°`;
}

//calls

let form = document.querySelector(".input-container");
form.addEventListener("submit", getSubmit);

let searchIcon = document.querySelector("#search-btn");
searchIcon.addEventListener("click", getSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getLiveLocation);

let roundTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("Stuttgart");
