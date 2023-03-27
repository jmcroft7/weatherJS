console.log("script running");
let apiKey = "";

// this function takes in a city and apiKey, and fetches the current weather from openWeatherApi
// this being async makes the background load faster?
async function fetchWeather(city, apiKey) {
    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + city + "')";
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey
    )
        .then((response) => {
            if (!response.ok) {
                document.querySelector(".city").innerText = "Minneapolis MN";
                document.querySelector(".weather").classList.remove("loading");
                alert("No weather data for " + city + "\n showing default data")
            }
            return response.json();
        })
}

// this function takes in a json object, and displays certain properties to the webpage
function displayWeather(data) {
    // deconstruct data
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    // map the data to the respective divs
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";

    // remove this class to show the weather div
    document.querySelector(".weather").classList.remove("loading");
}


// this function takes the text in the searchbar and puts it into the other functions
function search() {
    let city = document.querySelector(".search-bar").value
    let res = fetchWeather(city);
    displayWeather(res);
}

// this adds an onclick to the button in the .search div
document.querySelector(".search button").addEventListener("click", function () {
    search();
});

// adds a listener to the search-bar that runs the function on enter
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            search();
        }
    });