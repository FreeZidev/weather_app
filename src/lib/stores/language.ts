import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'en' | 'sk';

function createLanguageStore() {
	const defaultValue: Language = 'sk';
	
	const { subscribe, set, update } = writable<Language>(defaultValue);

	// Načítanie z localStorage pri inicializácii
	if (browser) {
		const stored = localStorage.getItem('weather-language');
		if (stored === 'en' || stored === 'sk') {
			set(stored);
		}
	}

	return {
		subscribe,
		set: (lang: Language) => {
			set(lang);
			if (browser) {
				localStorage.setItem('weather-language', lang);
			}
		},
		toggle: () => {
			update((lang) => {
				const newLang = lang === 'en' ? 'sk' : 'en';
				if (browser) {
					localStorage.setItem('weather-language', newLang);
				}
				return newLang;
			});
		}
	};
}

export const languageStore = createLanguageStore();

