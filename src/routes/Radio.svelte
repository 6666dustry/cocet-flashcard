<script lang="ts">
	import speak from '$lib/utils/speak.js';
	import { words } from './words.js';
</script>

<button
	on:click={() => {
		let index = 0;
		let word = true;
		/**
		 * Infinity loop of speaking.
		 */
		function loop() {
			const uttr = speak($words[index][word ? 'word' : 'translation'].replaceAll('、', ','), {
				lang: word ? 'en-US' : 'ja-JP',
				rate: 1.25
			});
			uttr.onend = () => {
				word = !word;
				if (word) {
					index++;
					if (index >= $words.length) {
						index = 0;
					}
				}
				loop();
			};
		}
		loop();
	}}>聞き流し(今の範囲だけ)</button
>
<button
	on:click={async () => {
		const allWords = (await import('../assets/words/1-200.json')).words;
		let min = 201,
			max = 400;
		let can = true;
		while (can) {
			try {
				allWords.concat((await import(`../assets/words/${min}-${max}.json`)).words);
				min += 200;
				max += 200;
			} catch (error) {
				can = false;
			}
		}

		let index = 0;
		let word = true;
		/**
		 * Infinity loop of speaking.
		 */
		function loop() {
			const uttr = speak(allWords[index][word ? 'word' : 'translation'].replaceAll('、', ','), {
				lang: word ? 'en-US' : 'ja-JP',
				rate: 1.75
			});
			uttr.onend = () => {
				word = !word;
				if (word) {
					index++;
					if (index >= allWords.length) {
						index = 0;
					}
				}
				loop();
			};
		}
		loop();
	}}>聞き流し(全部)</button
>

<style>
	button {
		font-size: 20px;
		background: none;
	}
</style>
