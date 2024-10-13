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

const input = document.getElementById("city-input");
input.addEventListener("input", handleInputChange);

document.addEventListener("click", (event) => {
  const isClickingInsideInput = input.contains(event.target);
  const suggestionsList = document.getElementById("suggestion-list");
  const isClickInsideSuggestions = suggestionsList.contains(event.target);

  if (!isClickingInsideInput && !isClickInsideSuggestions) {
    suggestionsList.style.display = "none";
  }
});

function handleInputChange(event) {
  const query = event.target.value;

  hideList(query);

  if (query.trim() === "") {
    clearSuggestions();
    return;
  }

  getCitySuggestions(query);
}

function getCitySuggestions(query) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=856ccddf81c793a208c47d6b692bedb8`
  )
    .then((response) => response.json())
    .then((data) => {
      let cityNames = data
        .filter((city) => city.name && city.lat && city.lon && city.country)
        .map((city) => city.name);
      cityNames = [...new Set(cityNames)];
      cityNames.sort((a, b) => a.localeCompare(b));
      showSuggestions(cityNames);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des suggestions :", error);
    });
}

function showSuggestions(cityNames) {
  const suggestionsList = document.getElementById("suggestion-list");
  clearSuggestions();

  cityNames.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      selectCity(city);
    });

    suggestionsList.appendChild(li);
  });
}

function selectCity(city) {
  const input = document.getElementById("city-input");
  input.value = city;
  clearSuggestions();
}

function clearSuggestions() {
  const suggestionsList = document.getElementById("suggestion-list");
  suggestionsList.innerHTML = "";
}

function hideList(query) {
  const suggestionsList = document.getElementById("suggestion-list");
  if (typeof query === "string" && query.trim() === "") {
    suggestionsList.style.display = "none";
    clearSuggestions();
  } else {
    suggestionsList.style.display = "flex";
  }
}
