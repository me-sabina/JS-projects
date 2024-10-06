const apiKey = '4d4e849eb028979a74adf6c3452ae0f8'; // Replace with your OpenWeatherMap API key

// Fetch weather data based on user input location
function getWeather() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location!");
    }
}

// Fetch weather data based on user's geolocation
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data from the OpenWeatherMap API
function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("City not found or API error!"));
}

// Fetch weather data based on coordinates
function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("Failed to fetch weather data!"));
}

// Display weather information
function displayWeather(data) {
    document.getElementById('city-name').innerText = `City: ${data.name}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}
