<script lang="ts">
	import type { HourlyData } from '$lib/stores/weather';
	import { languageStore } from '$lib/stores/language';
	import { t } from '$lib/utils/i18n';

	interface Props {
		hourly: HourlyData[];
		unit: 'metric' | 'imperial';
	}

	let { hourly, unit }: Props = $props();

	const unitSymbol = unit === 'metric' ? '°C' : '°F';
	const lang = $derived($languageStore);
</script>

<div class="hourly-container">
	<div class="hourly-scroll">
		{#each hourly as hour (hour.time)}
			<div class="hourly-item">
				<div class="hour-time">{hour.time}</div>
				<div class="hour-icon-wrapper">
					<div class="hour-icon">{hour.icon}</div>
				</div>
				<div class="hour-temp">{hour.temp}{unitSymbol}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.hourly-container {
		overflow-x: auto;
		padding: 15px 0;
		margin: 0 -10px;
		-webkit-overflow-scrolling: touch;
	}

	.hourly-container::-webkit-scrollbar {
		height: 6px;
	}

	.hourly-container::-webkit-scrollbar-track {
		background: rgba(102, 126, 234, 0.05);
		border-radius: 10px;
	}

	.hourly-container::-webkit-scrollbar-thumb {
		background: rgba(102, 126, 234, 0.3);
		border-radius: 10px;
	}

	.hourly-container::-webkit-scrollbar-thumb:hover {
		background: rgba(102, 126, 234, 0.5);
	}

	.hourly-scroll {
		display: flex;
		gap: 12px;
		min-width: min-content;
		padding: 0 10px;
		justify-content: center;
		align-items: stretch;
	}

	.hourly-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 18px 16px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
		border-radius: 16px;
		border: 2px solid rgba(102, 126, 234, 0.15);
		min-width: 110px;
		flex: 0 0 auto;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		position: relative;
		overflow: hidden;
	}

	.hourly-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #667eea, #764ba2);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.hourly-item:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%);
		transform: translateY(-5px) scale(1.02);
		box-shadow: 0 8px 24px rgba(102, 126, 234, 0.25);
		border-color: rgba(102, 126, 234, 0.3);
	}

	.hourly-item:hover::before {
		opacity: 1;
	}

	.hour-time {
		font-size: 0.9rem;
		color: #4a5568;
		font-weight: 600;
		margin-bottom: 12px;
		letter-spacing: 0.3px;
	}

	.hour-icon-wrapper {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 8px 0;
		background: rgba(102, 126, 234, 0.08);
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.hourly-item:hover .hour-icon-wrapper {
		background: rgba(102, 126, 234, 0.15);
		transform: scale(1.1);
	}

	.hour-icon {
		font-size: 2.5rem;
		line-height: 1;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.hour-temp {
		font-size: 1.4rem;
		font-weight: 700;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 12px 0;
		letter-spacing: -0.5px;
	}

	@media (max-width: 768px) {
		.hourly-item {
			min-width: 95px;
			padding: 16px 12px;
		}

		.hour-icon-wrapper {
			width: 50px;
			height: 50px;
		}

		.hour-icon {
			font-size: 2rem;
		}

		.hour-temp {
			font-size: 1.2rem;
		}
	}
</style>

