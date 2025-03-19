import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t<Key extends keyof typeof ui[typeof defaultLang]>(key: Key): typeof ui[typeof lang][Key] {
		return ui[lang][key] || ui[defaultLang][key];
	}
}
