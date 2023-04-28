const container = document.querySelector(".container");
const search = document.querySelector(".search");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".location-not-found");

search.addEventListener("click", () => {
  const APIkey = "be76e3838685072f9333dd196c16bd50";
  const location = document.querySelector(".search-box input").value;

  if (location === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");
    });
});
