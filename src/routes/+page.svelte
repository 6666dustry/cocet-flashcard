<script lang="ts">
	import speak from '$lib/utils/speak.js';
	import Words from './Words.svelte';
	import { words } from './words.js';
	import Short from './Short.svelte';
</script>

<svelte:head>
	<style>
		html {
			background-image: linear-gradient(0deg, rgb(76, 76, 196), rgb(177, 255, 177));
			overflow-x: hidden;
		}
		* {
			font-family: Impact, 'Dela Gothic One', Haettenschweiler, 'Arial Narrow Bold', sans-serif;
			text-align: center;
			font-size: xx-large;
		}
	</style>
</svelte:head>
<button
	on:click={() => {
		let index = 0;
		let word = true;
		/**
		 * Infinity loop of speaking.
		 */
		function loop() {
			const uttr = speak($words[index][word ? 'word' : 'translation'], {
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
	}}>ラジオ(今の範囲だけ)</button
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
			const uttr = speak(allWords[index][word ? 'word' : 'translation'], {
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
	}}>ラジオ(全部)</button
>
<Short />
<Words />
<div id="description">
	<h2>使い方</h2>
	<p>ただ英単語を入力するだけです。</p>
	<p>
		ちょっと上の数字が書かれているところの左右をクリックする事で出題範囲を変えれます。(ショートカットは左右矢印キー)
	</p>
</div>

<style>
	p {
		font-size: 40px;
	}
	#description * {
		font-size: 20px;
	}
</style>
