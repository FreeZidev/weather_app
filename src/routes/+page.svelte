<script lang="ts">
	import { weatherStore } from '$lib/stores/weather';
	import { languageStore } from '$lib/stores/language';
	import { fetchCurrentWeather, fetchForecast, fetchHourlyForecast } from '$lib/utils/weather';
	import { t } from '$lib/utils/i18n';
	import { env } from '$env/dynamic/public';
	import WeatherCard from '$lib/components/WeatherCard.svelte';
	import ForecastCard from '$lib/components/ForecastCard.svelte';

	let searchInput = $state('');
	
	const lang = $derived($languageStore);

	const unit = $derived($weatherStore.unit);
	const current = $derived($weatherStore.current);
	const forecast = $derived($weatherStore.forecast);
	const hourly = $derived($weatherStore.hourly);
	const loading = $derived($weatherStore.loading);
	const error = $derived($weatherStore.error);

	async function handleSearch() {
		if (!searchInput.trim()) return;

		const city = searchInput.trim();
		weatherStore.setLoading(true);
		weatherStore.setError(null);

		try {
			const [currentData, forecastData, hourlyData] = await Promise.all([
				fetchCurrentWeather(city, unit),
				fetchForecast(city, unit),
				fetchHourlyForecast(city, unit)
			]);

			weatherStore.setWeather(currentData, forecastData, hourlyData);
		} catch (err) {
			weatherStore.setError(err instanceof Error ? err.message : 'Failed to fetch weather');
		} finally {
			weatherStore.setLoading(false);
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSearch();
		}
	}

	function toggleUnit() {
		const newUnit = unit === 'metric' ? 'imperial' : 'metric';
		weatherStore.setUnit(newUnit);
		
		// Re-fetch data with new unit
		if (current) {
			handleSearch();
		}
	}

	function toggleLanguage() {
		languageStore.toggle();
	}

	async function getCurrentLocation() {
		if (!navigator.geolocation) {
			weatherStore.setError('Geolocation is not supported by your browser');
			return;
		}

		weatherStore.setLoading(true);
		weatherStore.setError(null);

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				try {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;
					
					// Použiť reverse geocoding na získanie názvu mesta
					const apiKey = env.PUBLIC_OPENWEATHER_API_KEY || '';
					const geoResponse = await fetch(
						`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
					);
					
					if (!geoResponse.ok) {
						throw new Error('Failed to get location name');
					}
					
					const geoData = await geoResponse.json();
					const cityName = geoData[0]?.name || `${lat}, ${lon}`;
					
					searchInput = cityName;
					await handleSearch();
				} catch (err) {
					weatherStore.setError(err instanceof Error ? err.message : 'Failed to get location');
					weatherStore.setLoading(false);
				}
			},
			(error) => {
				weatherStore.setError('Failed to get your location. Please allow location access.');
				weatherStore.setLoading(false);
			}
		);
	}

	// Uložiť posledné vyhľadávanie
	$effect(() => {
		if (current && typeof window !== 'undefined') {
			localStorage.setItem('last-weather-city', current.name);
		}
	});
</script>

<svelte:head>
	<title>Weather App - SvelteKit</title>
</svelte:head>

<div class="container">
	<div class="content-wrapper">
		<header>
			<h1>🌤️ {t('appTitle', lang)}</h1>
			<div class="header-controls">
				<button class="lang-btn" onclick={toggleLanguage} title={lang === 'sk' ? 'English' : 'Slovenčina'}>
					{lang === 'sk' ? '🇬🇧' : '🇸🇰'}
				</button>
				<button class="unit-btn" onclick={toggleUnit}>
					{unit === 'metric' ? '°C' : '°F'}
				</button>
			</div>
		</header>

		<div class="search-section">
			<div class="search-box">
				<input
					type="text"
					placeholder={t('searchPlaceholder', lang)}
					bind:value={searchInput}
					onkeypress={handleKeyPress}
					disabled={loading}
				/>
				<button onclick={handleSearch} disabled={loading || !searchInput.trim()}>
					{loading ? '⏳' : '🔍'} {t('search', lang)}
				</button>
				<button class="location-btn" onclick={getCurrentLocation} disabled={loading} title={t('getLocation', lang)}>
					📍
				</button>
			</div>
		</div>

		{#if error}
			<div class="error-message">
				❌ {error}
			</div>
		{/if}

		{#if current}
			<div class="weather-card-wrapper">
				<WeatherCard 
					weather={current} 
					unit={unit}
					{hourly}
				/>
			</div>
		{/if}

		{#if forecast && forecast.length > 0}
			<div class="forecast-section">
				<h2>{t('forecast', lang)}</h2>
				<div class="forecast-grid">
					{#each forecast as day (day.date)}
						<ForecastCard forecast={day} {unit} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.content-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0;
	}

	.header-controls {
		display: flex;
		gap: 10px;
	}

	.lang-btn, .unit-btn {
		background: rgba(102, 126, 234, 0.1);
		border: 2px solid rgba(102, 126, 234, 0.3);
		padding: 10px 15px;
		border-radius: 12px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.lang-btn:hover, .unit-btn:hover {
		background: rgba(102, 126, 234, 0.2);
		transform: translateY(-2px);
	}

	.unit-btn {
		font-weight: 600;
		color: #667eea;
	}

	.search-section {
		margin-bottom: 30px;
	}

	.search-box {
		display: flex;
		gap: 10px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.location-btn {
		background: rgba(102, 126, 234, 0.1);
		border: 2px solid rgba(102, 126, 234, 0.3);
		padding: 15px;
		border-radius: 12px;
		cursor: pointer;
		font-size: 1.3rem;
		transition: all 0.3s ease;
		box-shadow: none;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 50px;
	}

	.location-btn:hover:not(:disabled) {
		background: rgba(102, 126, 234, 0.2);
		border-color: rgba(102, 126, 234, 0.5);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
	}

	.location-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	input {
		flex: 1;
		padding: 15px 20px;
		border: 2px solid #e1e5e9;
		border-radius: 12px;
		font-size: 16px;
		transition: all 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	button {
		background: linear-gradient(135deg, #667eea, #764ba2);
		color: white;
		border: none;
		padding: 15px 30px;
		border-radius: 12px;
		cursor: pointer;
		font-size: 16px;
		font-weight: 600;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.weather-card-wrapper {
		margin-bottom: 20px;
	}

	.error-message {
		padding: 15px 20px;
		background: rgba(239, 68, 68, 0.1);
		border: 2px solid rgba(239, 68, 68, 0.3);
		border-radius: 12px;
		color: #dc2626;
		margin-bottom: 20px;
		font-weight: 500;
	}

	.forecast-section {
		margin-top: 30px;
		padding: 20px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.forecast-section h2 {
		margin: 0 0 20px 0;
		color: #2d3748;
		font-size: 1.8rem;
	}

	.forecast-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 15px;
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			gap: 15px;
		}

		.search-box {
			flex-direction: column;
		}

		.forecast-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
