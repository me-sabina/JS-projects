const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const weatherInfo = document.getElementById('weather-info');

const API_KEY = '7ac4f1e658b79f97d5b8651bc0e2fdf8'; 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const city = cityInput.value;
    getWeather(city);
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        const temp = data.main.temp;
        const weatherDesc = data.weather[0].description;
        const icon = data.weather[0].icon;

        cityName.innerText = data.name;
        temperature.innerText = `Temperature: ${temp} °C`;
        description.innerText = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
        weatherInfo.style.display = 'block';
    } catch (error) {
        console.error('Error fetching the weather data', error);
    }
}
