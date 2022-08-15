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
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let currentDateAndTime = document.querySelector("#current-date-and-time");
currentDateAndTime.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;

let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=5796366da8b0eaaaecd41b58c7a56fa1";

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let displayedCity = document.querySelector("#city");
  displayedCity.innerHTML = `${searchInput.value}`;
  let apiURLSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=5796366da8b0eaaaecd41b58c7a56fa1`;
  axios.get(apiURLSearch).then(showSearchTemp);
  function showSearchTemp(response) {
    let searchTemperature = Math.round(response.data.main.temp);
    let displayedSearchTemp = document.querySelector("#actual-temp");
    displayedSearchTemp.innerHTML = `${searchTemperature}`;
    let windStrength = Math.round(response.data.wind.speed);
    let displayedWindStrength = document.querySelector("#wind-speed");
    displayedWindStrength.innerHTML = `${windStrength}`;
    let humidity = Math.round(response.data.main.humidity);
    let displayedHumidity = document.querySelector("#humidity-number");
    displayedHumidity.innerHTML = `${humidity}`;
  }
}

function convertToC() {
  let convertedToC = document.querySelector("#actual-temp");
  convertedToC.innerHTML = celsius;
}

function convertToF() {
  let convertedToF = document.querySelector("#actual-temp");
  convertedToF.innerHTML = farenheit;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5796366da8b0eaaaecd41b58c7a56fa1`;
  axios.get(apiUrlTemp).then(showTemperature);
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#actual-temp");
    currentTemp.innerHTML = `${temperature}`;
    let currentCity = response.data.name;
    let displayedCurrentCity = document.querySelector("#city");
    displayedCurrentCity.innerHTML = `${currentCity}`;
  }
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);

let celsius = 18;
//celsius to farenheit: F * (5 / 9) - 32);

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", convertToC);

let farenheit = Math.round(celsius * (9 / 5) + 32);

let farenheitClick = document.querySelector("#farenheit");
farenheitClick.addEventListener("click", convertToF);
