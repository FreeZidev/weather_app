<script lang="ts">
	import type { ForecastData } from '$lib/stores/weather';
	import { languageStore } from '$lib/stores/language';
	import { t } from '$lib/utils/i18n';

	interface Props {
		forecast: ForecastData;
		unit: 'metric' | 'imperial';
	}

	let { forecast, unit }: Props = $props();

	const unitSymbol = unit === 'metric' ? '°C' : '°F';
	const windUnit = unit === 'metric' ? 'm/s' : 'mph';
	
	const lang = $derived($languageStore);
	const date = $derived(new Date(forecast.date));
	const locale = $derived(lang === 'sk' ? 'sk-SK' : 'en-US');
	const dayName = $derived(date.toLocaleDateString(locale, { weekday: 'short' }));
	const dayNumber = $derived(date.getDate());
	const month = $derived(date.toLocaleDateString(locale, { month: 'short' }));
</script>

<div class="forecast-card">
	<div class="date-info">
		<div class="day">{dayName}</div>
		<div class="date">{dayNumber} {month}</div>
	</div>
	
	<div class="forecast-icon">{forecast.icon}</div>
	
	<div class="forecast-temp">{forecast.temp}{unitSymbol}</div>
	
	<div class="forecast-desc">{forecast.description}</div>
	
	<div class="forecast-details">
		<div class="detail">
			<span class="detail-label">{t('feelsLike', lang)}</span>
			<span class="detail-value">{forecast.feelsLike}{unitSymbol}</span>
		</div>
		<div class="detail">
			<span class="detail-label">{t('windSpeed', lang)}</span>
			<span class="detail-value">{forecast.windSpeed} {windUnit}</span>
		</div>
		<div class="detail">
			<span class="detail-label">{t('humidity', lang)}</span>
			<span class="detail-value">{forecast.humidity}%</span>
		</div>
	</div>
</div>

<style>
	.forecast-card {
		padding: 20px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 15px;
		border: 1px solid rgba(102, 126, 234, 0.1);
		transition: all 0.3s ease;
		text-align: center;
	}

	.forecast-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2);
		background: rgba(255, 255, 255, 0.95);
	}

	.date-info {
		margin-bottom: 15px;
	}

	.day {
		font-size: 1.1rem;
		font-weight: 600;
		color: #667eea;
		margin-bottom: 5px;
	}

	.date {
		font-size: 0.9rem;
		color: #6b7280;
	}

	.forecast-icon {
		font-size: 3rem;
		margin: 15px 0;
	}

	.forecast-temp {
		font-size: 2rem;
		font-weight: 700;
		color: #2d3748;
		margin: 10px 0;
	}

	.forecast-desc {
		font-size: 0.9rem;
		color: #4a5568;
		text-transform: capitalize;
		margin-bottom: 15px;
	}

	.forecast-details {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid rgba(102, 126, 234, 0.1);
	}

	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail-label {
		font-size: 0.85rem;
		color: #6b7280;
	}

	.detail-value {
		font-size: 0.9rem;
		font-weight: 600;
		color: #2d3748;
	}
</style>

