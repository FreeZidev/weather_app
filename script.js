// API nastavenia pre OpenWeatherMap
const apiKey = '886546614e055726ae6986547f2daa6e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Získanie referencií na HTML elementy
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

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

// Hlavná funkcia pre získanie dát o počasí
function fetchWeather(location) {
    // Vytvorenie URL pre API request
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    // Zobrazenie loading stavu
    locationElement.textContent = 'Loading...';
    temperatureElement.innerHTML = '<div class="loading"></div>';
    descriptionElement.textContent = '';

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
                // Zobrazenie dát o počasí
                locationElement.textContent = data.name;
                temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                descriptionElement.textContent = data.weather[0].description;
            } else {
                throw new Error(data.message || 'Unknown error');
            }
        })
        .catch(error => {
            // Spracovanie chýb
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error loading weather';
            temperatureElement.textContent = '';
            descriptionElement.textContent = error.message;
        });
}