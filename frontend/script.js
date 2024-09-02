document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
    
    if (response.ok) {
        const data = await response.json();
        displayWeather(data);
    } else {
        alert('City not found. Please try again.');
    }
});

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = ''; // Clear previous results

    const currentWeather = `
        <div class="current-weather">
            <h2>Current Weather in ${data.location.name}</h2>
            <p>Temperature: ${data.current.temp_c} °C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind Speed: ${data.current.wind_kph} kph</p>
            <p>Feels Like: ${data.current.feelslike_c} °C</p>
        </div>
    `;

    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');

    const forecast = data.forecast.forecastday.map(day => `
        <div class="weather-card">
            <h2>${day.date}</h2>
            <p>Max: ${day.day.maxtemp_c} °C</p>
            <p>Min: ${day.day.mintemp_c} °C</p>
            <p>Condition: ${day.day.condition.text}</p>
            <p>Precipitation: ${day.day.totalprecip_mm} mm</p>
        </div>
    `).join('');

    forecastContainer.innerHTML = forecast;

    weatherResult.innerHTML = currentWeather;
    weatherResult.appendChild(forecastContainer);
}