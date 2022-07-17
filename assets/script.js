
const apiID = "73838aafe41df1b61668dd1373936674"

const userInput = document.querySelector("#user-input");
const selectedCity = document.querySelector("#selected-city");
const cityDisplay = document.querySelector("#city-display");
const searchedCity = document.querySelector("#searched-city");
const currentWeather = document.querySelector("#current-weather");
const previousCity = document.getElementById("previous-search")

const cityArray = [];

const formSubmitHandler = function(event) {
    event.preventDefault();
    const city = selectedCity.value.trim();
    if (city) {
        getCurrentWeather(city);

        cityArray.push(city);
        localStorage.setItem("city", JSON.stringify(cityArray));

        selectedCity.value = "";

     } else {
        alert("Please enter a valid name");
    }
};

const clickHandler = function (event) {
    const clickCity = event.currentTarget.textContent;
    getCurrentWeather(clickCity);
};
const getCurrentWeather = function(city) {
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiID;

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCurrentWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })

}
const displayCurrentWeather = function(city, searchTerm) {
   cityDisplay.textContent = '';
    searchedCity.textContent = searchTerm;

    const currentDateDisplay = document.querySelector("#current-date");
    const currentDate = moment();
    currentDateDisplay.textContent = currentDate.format("(L)");

    const displayTemp = document.querySelector("#temp");
    const currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    const displayHumidity = document.querySelector("#humidity");
    const currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 
 
    const displayWind = document.querySelector("#wind");
    const currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    const newCity = document.createElement("ul");
    newCity.className = "prev-search-item";
    newCity.textContent = searchTerm;
    newCity.addEventListener("click", clickHandler);
    previousCity.appendChild(newCity);
};

userInput.addEventListener("submit", formSubmitHandler);