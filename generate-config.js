#!/usr/bin/env node

/**
 * Skript na generovanie config.js z .env súboru
 * Spustite: node generate-config.js
 */

const fs = require('fs');
const path = require('path');

// Načítanie .env súboru
function loadEnvFile() {
    const envPath = path.join(__dirname, '.env');
    
    if (!fs.existsSync(envPath)) {
        console.error('Chyba: .env súbor neexistuje!');
        console.error('Skopírujte .env.example ako .env a vyplňte hodnoty.');
        process.exit(1);
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
        line = line.trim();
        // Ignorovať prázdne riadky a komentáre
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                env[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    
    return env;
}

// Generovanie config.js
function generateConfig() {
    const env = loadEnvFile();
    
    const configContent = `// Konfiguračný súbor generovaný z .env súboru
// Tento súbor NIE JE v git repozitári (je v .gitignore)
// Pre zmeny upravte .env súbor a spustite: node generate-config.js

const config = {
    // OpenWeatherMap API kľúč
    apiKey: '${env.OPENWEATHER_API_KEY || ''}',
    
    // API URL
    apiUrl: '${env.OPENWEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather'}',
    
    // Iné nastavenia
    defaultUnits: '${env.DEFAULT_UNITS || 'metric'}',
    defaultLanguage: '${env.DEFAULT_LANGUAGE || 'en'}'
};

// Export pre použitie v iných súboroch
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}
`;

    const configPath = path.join(__dirname, 'config.js');
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log('✓ config.js úspešne vygenerovaný z .env súboru');
}

// Spustenie
generateConfig();

