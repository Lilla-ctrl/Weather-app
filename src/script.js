let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDateAndTime = document.querySelector("#current-date-and-time");
currentDateAndTime.innerHTML = `${day}, ${hour}:${minute}`;

function displayForecast(response) {
  let forecastDayElementOne = document.querySelector("#day-one");
  forecastDayElementOne.innerHTML = `${formatDay(response.data.daily[1].time)}`;

  let forecastDayElementTwo = document.querySelector("#day-two");
  forecastDayElementTwo.innerHTML = `${formatDay(response.data.daily[2].time)}`;

  let forecastDayElementThree = document.querySelector("#day-three");
  forecastDayElementThree.innerHTML = `${formatDay(
    response.data.daily[3].time
  )}`;

  let forecastDayElementFour = document.querySelector("#day-four");
  forecastDayElementFour.innerHTML = `${formatDay(
    response.data.daily[4].time
  )}`;

  let forecastDayElementFive = document.querySelector("#day-five");
  forecastDayElementFive.innerHTML = `${formatDay(
    response.data.daily[5].time
  )}`;

  let forecastDayElementSix = document.querySelector("#day-six");
  forecastDayElementSix.innerHTML = `${formatDay(response.data.daily[6].time)}`;

  let iconElementOne = document.querySelector("#day-one-icon");
  iconElementOne.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[1].condition.icon}.png`
  );

  let iconElementTwo = document.querySelector("#day-two-icon");
  iconElementTwo.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[2].condition.icon}.png`
  );

  let iconElementThree = document.querySelector("#day-three-icon");
  iconElementThree.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[3].condition.icon}.png`
  );

  let iconElementFour = document.querySelector("#day-four-icon");
  iconElementFour.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[4].condition.icon}.png`
  );

  let iconElementFive = document.querySelector("#day-five-icon");
  iconElementFive.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[5].condition.icon}.png`
  );

  let iconElementSix = document.querySelector("#day-six-icon");
  iconElementSix.setAttribute(
    "src",
    `
    https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[6].condition.icon}.png`
  );

  let temperatureElementOne = document.querySelector("#day-one-temp");
  temperatureElementOne.innerHTML = `${Math.round(
    response.data.daily[1].temperature.day
  )}°`;

  let temperatureElementTwo = document.querySelector("#day-two-temp");
  temperatureElementTwo.innerHTML = `${Math.round(
    response.data.daily[2].temperature.day
  )}°`;

  let temperatureElementThree = document.querySelector("#day-three-temp");
  temperatureElementThree.innerHTML = `${Math.round(
    response.data.daily[3].temperature.day
  )}°`;

  let temperatureElementFour = document.querySelector("#day-four-temp");
  temperatureElementFour.innerHTML = `${Math.round(
    response.data.daily[4].temperature.day
  )}°`;

  let temperatureElementFive = document.querySelector("#day-five-temp");
  temperatureElementFive.innerHTML = `${Math.round(
    response.data.daily[5].temperature.day
  )}°`;

  let temperatureElementSix = document.querySelector("#day-six-temp");
  temperatureElementSix.innerHTML = `${Math.round(
    response.data.daily[6].temperature.day
  )}°`;
}

function getForecast(coordinates) {
  let apiKey = "3et61975bb6d4a4foabfddbded4a0a8e";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayTemperature(response) {
  celsiusTemp = response.data.temperature.current;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "3et61975bb6d4a4foabfddbded4a0a8e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-text-input");
  search(searchInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3et61975bb6d4a4foabfddbded4a0a8e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

window.onload = getCurrentLocation;

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocation);
