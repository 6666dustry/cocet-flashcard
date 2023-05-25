import { writable } from 'svelte/store';
import { words as to200 } from '../assets/words/1-200.json';
import { shuffle } from '$lib/utils/shuffle.js';
let results: Word[] = [];
let index = 0;
export const words = writable(to200 as Word[]);
words.subscribe((words) => {
	results = shuffle(words);
	index = 0;
});

export const getQuestion = (): [Word, number] => {
	if (index >= results.length) {
		index = 0;
		results = shuffle(results);
	}

	return [results[index] ?? { word: 'error', translation: 'エラー' }, index++];
};