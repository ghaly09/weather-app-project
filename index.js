// Initialize the variabels according to html and css classes
const container = document.querySelector(".container");
const search = document.querySelector(".search");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".location-not-found");

// add event listerner for search while click event
search.addEventListener("click", () => {
  // Put the API key that you've gotten from openweather API
  const APIkey = "be76e3838685072f9333dd196c16bd50";
  // Get input value from page
  const location = document.querySelector(".search input").value;
  // Condition when location is fulfilled or empty
  if (location === "") return;
  // Fetching the API data from openweatherapi
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((result) => {
      // Condition when it's error 404
      console.log(result);
      if (result.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }
      // When it's not error give this styles and conditions
      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (result.weather[0].main) {
        case "Clear":
          image.src = "assets/images/clear.gif";
          break;

        case "Rain":
          image.src = "assets/images/rain.gif";
          break;

        case "Snow":
          image.src = "assets/images/snow.gif";
          break;

        case "Clouds":
          image.src = "assets/images/clouds.gif";
          break;

        case "Haze":
          image.src = "assets/images/haze.gif";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(result.main.temp)}<span>°C</span>`;
      description.innerHTML = `${result.weather[0].description}`;
      humidity.innerHTML = `${result.main.humidity}%`;
      wind.innerHTML = `${parseInt(result.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherDetails.classList.add("fadeIn");
      weatherBox.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
