document.getElementById("searchbutton").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;

  const apiKey = "856ccddf81c793a208c47d6b692bedb8";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

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
    `;
    });
});
