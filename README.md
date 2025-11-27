# 🌤️ Weather App

Moderná weather aplikácia postavená na SvelteKit s krásnym UI a pokročilými funkciami.

## ✨ Funkcie

- 🌡️ **Aktuálne počasie** - Zobrazuje aktuálne počasie pre akékoľvek mesto
- 📅 **5-dňová predpoveď** - Predpoveď počasia na 5 dní dopredu
- ⏰ **Hodinová predpoveď** - 24-hodinová predpoveď s teplotou
- 📍 **Geolokácia** - Automatické zistenie polohy a zobrazenie počasia
- 🌡️ **Prepínanie jednotiek** - Prepínanie medzi Celsius (°C) a Fahrenheit (°F)
- 🌍 **Dvojjazyčnosť** - Podpora slovenčiny a angličtiny
- 💾 **LocalStorage** - Ukladanie preferencií (jazyk, jednotky)
- 📱 **Responsive dizajn** - Funguje perfektne na všetkých zariadeniach
- 🎨 **Moderný UI** - Glassmorphism dizajn s animáciami

## 🚀 Rýchly štart

### 1. Inštalácia

```bash
npm install
```

### 2. Nastavenie API kľúča

1. Skopírujte `.env.example` ako `.env`
2. Získajte API kľúč na [OpenWeatherMap](https://openweathermap.org/api) (zdarma)
3. Vložte kľúč do `.env`:
   ```
   PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

### 3. Spustenie

```bash
npm run dev
```

Aplikácia bude dostupná na `http://localhost:5173`

## 📦 Deploy

### Vercel / Netlify

1. Nastavte `PUBLIC_OPENWEATHER_API_KEY` v nastaveniach projektu
2. Pushnite kód do Git repozitára
3. Hotovo! Platforma automaticky detekuje SvelteKit

### Iné platformy

```bash
npm run build
npm run preview
```

## 📁 Štruktúra projektu

```
weather_app/
├── src/
│   ├── lib/
│   │   ├── components/          # Svelte komponenty
│   │   │   ├── WeatherCard.svelte
│   │   │   ├── ForecastCard.svelte
│   │   │   └── HourlyForecast.svelte
│   │   ├── stores/              # State management
│   │   │   ├── weather.ts
│   │   │   └── language.ts
│   │   └── utils/               # Utility funkcie
│   │       ├── weather.ts
│   │       └── i18n.ts
│   └── routes/
│       ├── +layout.svelte
│       └── +page.svelte
├── static/
├── .env.example
└── package.json
```

## 🛠️ Technológie

- **SvelteKit** - Moderný framework
- **TypeScript** - Type safety
- **OpenWeatherMap API** - Weather data
- **LocalStorage** - Ukladanie preferencií

## 🎯 Použitie

1. **Vyhľadávanie:** Zadajte názov mesta a stlačte Search
2. **Poloha:** Kliknite na 📍 pre automatické zistenie polohy
3. **Jednotky:** Prepínajte medzi °C a °F
4. **Jazyk:** Prepínajte medzi 🇸🇰 a 🇬🇧

## 🔐 Environment premenné

- `PUBLIC_OPENWEATHER_API_KEY` - **POVINNÉ** - OpenWeatherMap API kľúč
- `PUBLIC_OPENWEATHER_API_URL` - (voliteľné) - API URL

## 📝 Licencia

MIT

---

Vytvorené s ❤️ pomocou SvelteKit
