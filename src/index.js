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

//current temperature, Geo

function showTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  roundTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${roundTemperature}°`;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
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

let form = document.querySelector(".input-container");
form.addEventListener("submit", getSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", getLiveLocation);

let roundTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("Stuttgart");
