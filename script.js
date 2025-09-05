// API nastavenia pre OpenWeatherMap
const apiKey = '886546614e055726ae6986547f2daa6e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Získanie referencií na HTML elementy
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const expandButton = document.getElementById('expandButton');
const expandText = document.getElementById('expandText');
const expandIcon = document.getElementById('expandIcon');
const weatherDetails = document.getElementById('weather-details');

// Detail elementy
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const pressureElement = document.getElementById('pressure');

// Event listener pre kliknutie na tlačidlo Search
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

// Event listener pre stlačenie Enter v input poli
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    }
});

// Event listener pre expand tlačidlo
expandButton.addEventListener('click', () => {
    toggleWeatherDetails();
});

// Hlavná funkcia pre získanie dát o počasí
function fetchWeather(location) {
    // Vytvorenie URL pre API request
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    // Zobrazenie loading stavu
    locationElement.textContent = 'Loading...';
    weatherIconElement.innerHTML = '';
    temperatureElement.innerHTML = '<div class="loading"></div>';
    descriptionElement.textContent = '';
    expandButton.style.display = 'none';
    weatherDetails.style.display = 'none';

    // API request pomocou fetch
    fetch(url)
        .then(response => {
            // Kontrola či je response OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Kontrola či API vrátilo úspešný výsledok
            if (data.cod === 200) {
                // Zobrazenie základných dát o počasí
                locationElement.textContent = data.name;
                weatherIconElement.innerHTML = getWeatherIcon(data.weather[0].main);
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = data.weather[0].description;
                
                // Zobrazenie detailov
                displayWeatherDetails(data);
                
                // Zobrazenie expand tlačidla
                expandButton.style.display = 'block';
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        })
        .catch(error => {
            // Spracovanie chýb
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error loading weather';
            weatherIconElement.innerHTML = '';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message;
            expandButton.style.display = 'none';
            weatherDetails.style.display = 'none';
        });
}

// Funkcia pre zobrazenie detailov o počasí
function displayWeatherDetails(data) {
    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} m/s`;
    pressureElement.textContent = `${data.main.pressure} hPa`;
}

// Funkcia pre prepínanie zobrazenia detailov
function toggleWeatherDetails() {
    if (weatherDetails.style.display === 'none') {
        weatherDetails.style.display = 'block';
        expandText.textContent = 'Hide Details';
        expandIcon.textContent = '▲';
    } else {
        weatherDetails.style.display = 'none';
        expandText.textContent = 'Show Details';
        expandIcon.textContent = '▼';
    }
}

// Funkcia pre získanie emoji ikony podľa typu počasia
function getWeatherIcon(weatherMain) {
    const weatherIcons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return weatherIcons[weatherMain] || '🌤️'; // Default ikona ak nie je rozpoznaný typ
}