const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const APL_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=podajSwojKlucz";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value;
  const URL = APL_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;

      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";
      warning.textContent = '';
      input.value = '';
      const status = Object.assign({}, ...res.data.weather);
      weather.textContent = status.main;
      if (status.id >= 200 && status.id <= 232) {
        photo.setAttribute("src", "./img/thunderstorm.png");
      } else if (status.id >= 300 && status.id <= 321) {
        photo.setAttribute("src", "./img/drizzle.png");
      } else if (status.id >= 500 && status.id <= 531) {
        photo.setAttribute("src", "./img/rain.png");
      } else if (status.id >= 600 && status.id <= 622) {
        photo.setAttribute("src", "./img/snow.png");
      } else if (status.id >= 700 && status.id <= 781) {
        photo.setAttribute("src", "./img/fog.png");
      } else if (status.id > 800 && status.id <= 804) {
        photo.setAttribute("src", "./img/cloud.png");
      } else if ((status.id = 800)) {
        photo.setAttribute("src", "./img/sun.png");
      } else {
        photo.setAttribute("src", "./img/unknown.png");
      }
    })
    .catch(() => {
      warning.textContent='Wpsiz poprawną nazwę miasta';
    });
};
button.addEventListener("click", getWeather);
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        getWeather();
    }
})
