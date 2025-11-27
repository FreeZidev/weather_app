# 🌤️ Weather App

Jednoduchá weather appka ktorú som robil ako hobby projekt. Funguje to, ale nie je to nič extra fancy 

## Čo to robí
- Zadáš názov mesta
- Ukáže ti teplotu a počasie

## Ako to spustiť
1. Skopírujte `.env.example` ako `.env`
2. Choďte na [OpenWeatherMap](https://openweathermap.org/api) a zaregistrujte sa
3. Získajte svoj API kľúč a nahraďte `YOUR_API_KEY_HERE` v `.env` súbore
4. Spustite `node generate-config.js` na vygenerovanie `config.js` z `.env` súboru
5. Otvorte `index.html` v prehliadači
6. Napíšte názov mesta (napr. "Bratislava", "London")
7. Stlačte Search alebo Enter
8. A je to! 🎉

## Súbory
- `index.html` - Hlavná stránka
- `script.js` - JavaScript (logika)
- `styles.css` - CSS (vzhľad)
- `.env` - Environment premenné s API kľúčmi (NIE JE v git repozitári)
- `.env.example` - Príklad environment premenných
- `generate-config.js` - Skript na generovanie config.js z .env súboru
- `config.js` - Generovaný konfiguračný súbor (NIE JE v git repozitári)
- `config.example.js` - Príklad konfiguračného súboru (zastaraný, použite .env namiesto toho)
- `.gitignore` - Súbory ktoré sa ignorujú v git
- `README.md` - Tento súbor

## Technológie
- Čistý HTML/CSS/JavaScript
- OpenWeatherMap API
- Žiadne frameworky, len vanilla JS

## Environment premenné
Aplikácia používa environment premenné uložené v `.env` súbore:
- `OPENWEATHER_API_KEY` - Váš OpenWeatherMap API kľúč
- `OPENWEATHER_API_URL` - URL OpenWeatherMap API (predvolené: https://api.openweathermap.org/data/2.5/weather)
- `DEFAULT_UNITS` - Predvolené jednotky (predvolené: metric)
- `DEFAULT_LANGUAGE` - Predvolený jazyk (predvolené: en)

Po každej zmene v `.env` súbore spustite `node generate-config.js` na aktualizáciu `config.js`.
