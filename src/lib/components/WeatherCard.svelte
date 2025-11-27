<script lang="ts">
	import type { WeatherData, HourlyData } from '$lib/stores/weather';
	import { languageStore } from '$lib/stores/language';
	import { t } from '$lib/utils/i18n';
	import HourlyForecast from './HourlyForecast.svelte';

	interface Props {
		weather: WeatherData;
		unit: 'metric' | 'imperial';
		hourly?: HourlyData[];
	}

	let { weather, unit, hourly = [] }: Props = $props();

	const unitSymbol = unit === 'metric' ? '°C' : '°F';
	const windUnit = unit === 'metric' ? 'm/s' : 'mph';
	
	const lang = $derived($languageStore);
	
	let showDetails = $state(false);
	
	function toggleDetails() {
		showDetails = !showDetails;
	}
</script>

<div class="weather-card">
	<div class="weather-header">
		<div class="location-info">
			<h2>{weather.name}, {weather.country}</h2>
		</div>
	</div>

	<div class="weather-main">
		<div class="icon">{weather.icon}</div>
		<div class="temperature">{weather.temp}{unitSymbol}</div>
		<div class="description">{weather.description}</div>
		<div class="temp-range">
			<span class="temp-high">↑ {weather.tempMax}{unitSymbol}</span>
			<span class="temp-low">↓ {weather.tempMin}{unitSymbol}</span>
		</div>
	</div>

	<button class="details-btn" onclick={toggleDetails}>
		{showDetails ? t('hideDetails', lang) : t('showDetails', lang)}
	</button>

	{#if showDetails}
		<div class="weather-details">
			<div class="detail-grid">
				<div class="detail-item">
					<span class="label">{t('feelsLike', lang)}</span>
					<span class="value">{weather.feelsLike}{unitSymbol}</span>
				</div>
				<div class="detail-item">
					<span class="label">{t('humidity', lang)}</span>
					<span class="value">{weather.humidity}%</span>
				</div>
				<div class="detail-item">
					<span class="label">{t('windSpeed', lang)}</span>
					<span class="value">{weather.windSpeed} {windUnit}</span>
				</div>
				<div class="detail-item">
					<span class="label">{t('pressure', lang)}</span>
					<span class="value">{weather.pressure} hPa</span>
				</div>
			</div>
		</div>
	{/if}

	{#if hourly && hourly.length > 0}
		<div class="hourly-section-inline">
			<h3>{t('hourlyForecast', lang)}</h3>
			<HourlyForecast {hourly} {unit} />
		</div>
	{/if}
</div>

<style>
	.weather-card {
		padding: 30px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		animation: slideUp 0.6s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.weather-header {
		margin-bottom: 20px;
	}

	.location-info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	h2 {
		margin: 0;
		font-size: 1.8rem;
		color: #2d3748;
		font-weight: 600;
	}

	.weather-main {
		text-align: center;
		margin: 30px 0;
	}

	.icon {
		font-size: 5rem;
		margin-bottom: 15px;
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
		60% {
			transform: translateY(-5px);
		}
	}

	.temperature {
		font-size: 4rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 15px 0;
	}

	.description {
		font-size: 1.3rem;
		color: #4a5568;
		text-transform: capitalize;
		font-weight: 500;
		margin-bottom: 15px;
	}

	.temp-range {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 10px;
		font-size: 1rem;
	}

	.temp-high {
		color: #f59e0b;
		font-weight: 600;
	}

	.temp-low {
		color: #3b82f6;
		font-weight: 600;
	}

	.details-btn {
		width: 100%;
		background: rgba(102, 126, 234, 0.1);
		color: #667eea;
		border: 2px solid rgba(102, 126, 234, 0.3);
		padding: 12px 20px;
		border-radius: 12px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		margin-top: 20px;
		transition: all 0.3s ease;
		box-shadow: none;
	}

	.details-btn:hover {
		background: rgba(102, 126, 234, 0.2);
		border-color: rgba(102, 126, 234, 0.5);
		transform: translateY(-2px);
	}

	.weather-details {
		margin-top: 20px;
		padding: 20px;
		background: rgba(102, 126, 234, 0.05);
		border-radius: 15px;
		border: 1px solid rgba(102, 126, 234, 0.1);
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
	}

	.detail-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		border: 1px solid rgba(102, 126, 234, 0.1);
		transition: transform 0.2s ease;
	}

	.detail-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
	}

	.label {
		font-size: 0.9rem;
		color: #6b7280;
		font-weight: 500;
		margin-bottom: 5px;
		text-align: center;
	}

	.value {
		font-size: 1.3rem;
		font-weight: 600;
		color: #2d3748;
		text-align: center;
	}

	.hourly-section-inline {
		margin-top: 35px;
		padding-top: 30px;
		border-top: 2px solid rgba(102, 126, 234, 0.15);
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hourly-section-inline::before {
		content: '';
		position: absolute;
		top: -2px;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #667eea, transparent);
	}

	.hourly-section-inline h3 {
		margin: 0 0 25px 0;
		color: #2d3748;
		font-size: 1.6rem;
		font-weight: 700;
		text-align: center;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.5px;
		width: 100%;
	}
</style>

