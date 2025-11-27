import { writable } from 'svelte/store';

export interface WeatherData {
	name: string;
	temp: number;
	feelsLike: number;
	tempMin: number;
	tempMax: number;
	description: string;
	icon: string;
	humidity: number;
	windSpeed: number;
	pressure: number;
	country: string;
}

export interface HourlyData {
	time: string;
	temp: number;
	icon: string;
}

export interface ForecastData {
	date: string;
	temp: number;
	feelsLike: number;
	description: string;
	icon: string;
	humidity: number;
	windSpeed: number;
}

export interface WeatherState {
	current: WeatherData | null;
	forecast: ForecastData[];
	hourly: HourlyData[];
	loading: boolean;
	error: string | null;
	unit: 'metric' | 'imperial';
}

function createWeatherStore() {
	const { subscribe, set, update } = writable<WeatherState>({
		current: null,
		forecast: [],
		hourly: [],
		loading: false,
		error: null,
		unit: 'metric'
	});

	return {
		subscribe,
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading })),
		setError: (error: string | null) => update((state) => ({ ...state, error })),
		setWeather: (current: WeatherData, forecast: ForecastData[] = [], hourly: HourlyData[] = []) =>
			update((state) => ({ ...state, current, forecast, hourly, error: null })),
		setUnit: (unit: 'metric' | 'imperial') => update((state) => ({ ...state, unit })),
		clear: () => set({ current: null, forecast: [], hourly: [], loading: false, error: null, unit: 'metric' })
	};
}

export const weatherStore = createWeatherStore();

