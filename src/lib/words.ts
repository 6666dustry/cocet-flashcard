import { writable } from 'svelte/store';
import { words as to200 } from '../assets/words/1-200.json';
let results: Word[] = [];
let index = 0;
export const words = writable(to200);
words.subscribe((words) => {
	results = shuffle(words);
	index = 0;
});
export function shuffle<T extends unknown[]>(array: T): T {
	const result: T = [...array] as T;
	for (let i = 0; i < array.length; i++) {
		const j = Math.floor(Math.random() * array.length);
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export const getQuestion = (): [Word, number] => {
	if (index >= results.length) {
		index = 0;
		results = shuffle(results);
	}

	return [results[index] ?? { word: 'error', translation: 'エラー' }, index++];
};