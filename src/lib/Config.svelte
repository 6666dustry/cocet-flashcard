<script lang="ts">
	import Words from './Words.svelte';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	let words: Readable<Word[]>;
	function shuffle<T extends unknown[]>(array: T): T {
		const result: T = [...array] as T;
		for (let i = 0; i < array.length; i++) {
			const j = Math.floor(Math.random() * array.length);
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	}
	let results: Word[];
	let index = 0;
	export const getQuestion = () => {
		if (index >= results.length) {
			index = 0;
			results = shuffle(results);
		}

		return [results[index] ?? { word: 'error', translation: 'エラー' }, index++];
	};
	onMount(() => {
		words.subscribe((w) => {
			results = shuffle(w);
		});
	});
</script>

<Words bind:currentWords={words} />
