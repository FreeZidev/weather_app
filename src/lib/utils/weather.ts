import { env } from '$env/dynamic/public';
import type { WeatherData, ForecastData, HourlyData } from '$lib/stores/weather';

const API_KEY = env.PUBLIC_OPENWEATHER_API_KEY || '';
const API_URL = env.PUBLIC_OPENWEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

export function getWeatherIcon(weatherMain: string): string {
	const weatherIcons: Record<string, string> = {
		Clear: '☀️',
		Clouds: '☁️',
		Rain: '🌧️',
		Drizzle: '🌦️',
		Thunderstorm: '⛈️',
		Snow: '❄️',
		Mist: '🌫️',
		Fog: '🌫️',
		Haze: '🌫️',
		Dust: '🌪️',
		Sand: '🌪️',
		Ash: '🌋',
		Squall: '💨',
		Tornado: '🌪️'
	};

	return weatherIcons[weatherMain] || '🌤️';
}

export async function fetchCurrentWeather(
	city: string,
	unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> {
	if (!API_KEY) {
		throw new Error('API key is not configured. Please set PUBLIC_OPENWEATHER_API_KEY in environment variables.');
	}
	
	const response = await fetch(
		`${API_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch weather data');
	}

	const data = await response.json();

	return {
		name: data.name,
		temp: Math.round(data.main.temp),
		feelsLike: Math.round(data.main.feels_like),
		tempMin: Math.round(data.main.temp_min),
		tempMax: Math.round(data.main.temp_max),
		description: data.weather[0].description,
		icon: getWeatherIcon(data.weather[0].main),
		humidity: data.main.humidity,
		windSpeed: data.wind.speed,
		pressure: data.main.pressure,
		country: data.sys.country
	};
}

export async function fetchForecast(
	city: string,
	unit: 'metric' | 'imperial' = 'metric'
): Promise<ForecastData[]> {
	if (!API_KEY) {
		throw new Error('API key is not configured. Please set PUBLIC_OPENWEATHER_API_KEY in environment variables.');
	}
	
	const response = await fetch(
		`${API_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch forecast data');
	}

	const data = await response.json();

	// Zoskupiť podľa dní a vziať najlepšie reprezentatívne dáta
	const dailyForecasts: ForecastData[] = [];
	const dailyData: Record<string, any[]> = {};

	// Zoskupiť všetky záznamy podľa dní
	data.list.forEach((item: any) => {
		const date = new Date(item.dt * 1000);
		const dateKey = date.toDateString();
		
		if (!dailyData[dateKey]) {
			dailyData[dateKey] = [];
		}
		dailyData[dateKey].push(item);
	});

	// Pre každý deň vziať najlepšie dáta
	Object.keys(dailyData).forEach((dateKey) => {
		const dayItems = dailyData[dateKey];
		
		// Nájsť záznam okolo 12:00 (najlepšie reprezentatívne pre teplotu)
		const noonItem = dayItems.find((item: any) => {
			const hour = new Date(item.dt * 1000).getHours();
			return hour >= 11 && hour <= 13;
		}) || dayItems[Math.floor(dayItems.length / 2)]; // Fallback na stredný záznam
		
		dailyForecasts.push({
			date: dateKey,
			temp: Math.round(noonItem.main.temp),
			feelsLike: Math.round(noonItem.main.feels_like),
			description: noonItem.weather[0].description,
			icon: getWeatherIcon(noonItem.weather[0].main),
			humidity: noonItem.main.humidity,
			windSpeed: noonItem.wind.speed
		});
	});

	return dailyForecasts.slice(0, 5); // Max 5 dní
}

export async function fetchHourlyForecast(
	city: string,
	unit: 'metric' | 'imperial' = 'metric'
): Promise<HourlyData[]> {
	if (!API_KEY) {
		throw new Error('API key is not configured. Please set PUBLIC_OPENWEATHER_API_KEY in environment variables.');
	}
	
	const response = await fetch(
		`${API_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to fetch hourly forecast data');
	}

	const data = await response.json();

	// Vziať nasledujúcich 24 hodín (každé 3 hodiny = 8 záznamov)
	const hourly: HourlyData[] = data.list.slice(0, 8).map((item: any) => {
		const date = new Date(item.dt * 1000);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		
		return {
			time: timeString,
			temp: Math.round(item.main.temp),
			icon: getWeatherIcon(item.weather[0].main)
		};
	});

	return hourly;
}

