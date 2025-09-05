// Príklad konfiguračného súboru
// Skopírujte tento súbor ako config.js a vložte svoje API kľúče

const config = {
    // OpenWeatherMap API kľúč - získajte na https://openweathermap.org/api
    apiKey: 'YOUR_API_KEY_HERE',
    
    // API URL
    apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
    
    // Iné nastavenia
    defaultUnits: 'metric',
    defaultLanguage: 'en'
};

// Export pre použitie v iných súboroch
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}
