import type { Language } from '$lib/stores/language';

export const translations = {
	en: {
		appTitle: 'Weather App',
		searchPlaceholder: 'Enter a city name...',
		search: 'Search',
		showDetails: '▲ Show Details',
		hideDetails: '▼ Hide Details',
		feelsLike: 'Feels like',
		humidity: 'Humidity',
		windSpeed: 'Wind Speed',
		pressure: 'Pressure',
		forecast: '5-Day Forecast',
		hourlyForecast: 'Hourly Forecast',
		dayTemp: 'Day',
		nightTemp: 'Night',
		loading: 'Loading...',
		error: 'Error loading weather',
		getLocation: 'Get My Location'
	},
	sk: {
		appTitle: 'Aplikácia Počasie',
		searchPlaceholder: 'Zadajte názov mesta...',
		search: 'Hľadať',
		showDetails: '▲ Zobraziť detaily',
		hideDetails: '▼ Skryť detaily',
		feelsLike: 'Pocitová teplota',
		humidity: 'Vlhkosť',
		windSpeed: 'Rýchlosť vetra',
		pressure: 'Tlak',
		forecast: '5-dňová predpoveď',
		hourlyForecast: 'Hodinová predpoveď',
		dayTemp: 'Deň',
		nightTemp: 'Noc',
		loading: 'Načítava sa...',
		error: 'Chyba pri načítaní počasia',
		getLocation: 'Moja poloha'
	}
};

export function t(key: keyof typeof translations.en, lang: Language): string {
	return translations[lang][key] || translations.en[key];
}

