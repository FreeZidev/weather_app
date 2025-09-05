const apiKey = '886546614e055726ae6986547f2daa6e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    // Show loading state
    locationElement.textContent = 'Loading...';
    temperatureElement.innerHTML = '<div class="loading"></div>';
    descriptionElement.textContent = '';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = data.weather[0].description;
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error loading weather';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message;
        });
}