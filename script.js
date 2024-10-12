document.getElementById("searchbutton").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;

  const apiKey = "856ccddf81c793a208c47d6b692bedb8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const weatherImages = {
    "clear sky": "/Site-prevision-meteo/images/clear-sky.jpg",
    "broken clouds": "/Site-prevision-meteo/images/broken-clouds.jpg",
    "few clouds": "/Site-prevision-meteo/images/few-clouds.jpg",
    "light rain": "/Site-prevision-meteo/images/light-rain.png",
    "moderate rain": "/Site-prevision-meteo/images/moderate-rain.jpg",
    "overcast clouds": "/Site-prevision-meteo/images/overcast-clouds.jpg",
    "scattered clouds": "/Site-prevision-meteo/images/scattered-clouds.jpg",
    haze: "/Site-prevision-meteo/images/haze.jpg",
  };

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        document.getElementById("weather-display").innerHTML = `
        <h2>Ville : Ville non trouvée</h2> `;
        throw new Error("Ville non trouvée");
      }
      return response.json();
    })

    .then((data) => {
      const température = data.main.temp;
      const description = data.weather[0].description;

      document.getElementById("weather-display").innerHTML = `
      <h2>Ville : ${city}</h2>
      <p >Température : ${température}°C</p>
      <p>Description : ${description} </p>
      <img id="image" src="">
       
    `;

      updateWeatherImage(description);
    });

  function updateWeatherImage(description) {
    const weatherImageElement = document.getElementById("image");
    const imageUrl =
      weatherImages[description.toLowerCase()] || "image/default.jpg";

    weatherImageElement.src = imageUrl;
  }
});
