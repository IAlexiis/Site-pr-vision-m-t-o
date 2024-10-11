document.getElementById("searchbutton").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;

  const apiKey = "856ccddf81c793a208c47d6b692bedb8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  const weatherImages = {
    "clear sky": "images/clear-sky.jpg",
    "broken clouds": "images/broken-clouds.jpg",
    "few clouds": "images/few-clouds.jpg",
    "light rain": "images/light-rain.png",
    "moderate rain": "images/moderate-rain.jpg",
    "overcast clouds": "images/overcast-clouds.jpg",
    "scattered clouds": "images/scattered-clouds.jpg",
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
