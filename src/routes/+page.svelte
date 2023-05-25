<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import speak from '$lib/utils/speak.js';
	import { fly, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Words from './Words.svelte';
	import { getQuestion, words } from './words.js';
	const delay = 500;
	let currentWord = getQuestion()[0];
	let currentIndex = 0;
	let startTime = 0;
	let missCount = 0;
	let show = false;
	let perKey = 0;

	const startGame = () => {
		currentIndex = 0;
		startTime = Date.now();
		currentWord = getQuestion()[0];
		missCount = 0;
	};
	words.subscribe(() => {
		startGame();
	});

	const endGame = () => {
		const elapsedTime = Date.now() - startTime;
		perKey = Math.ceil((currentWord.word.length / (elapsedTime / 1000)) * 100) / 100;
		speak(currentWord.word);
		playSound(true);
	};

	const handleInput = (key: string) => {
		if (key === currentWord.word[currentIndex]) {
			currentIndex = currentIndex + 1;
			if (currentIndex + 1 > currentWord.word.length) {
				endGame();
				setTimeout(() => {
					startGame();
				}, delay);
			}
		} else {
			missCount = missCount + 1;
			show = true;
			setTimeout(() => {
				show = false;
			}, delay);
		}
	};
	const call = (event: any) => {
		const key = event.key.toLowerCase();
		handleInput(key);
	};
	onMount(() => {
		currentWord = getQuestion()[0];
	});
</script>

<svelte:window on:keydown={call} />
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
		function loop() {
			const uttr = speak($words[index][word ? 'word' : 'translation'], {
				lang: word ? 'en-US' : 'ja-JP',
				pitch: 1.5
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
	}}>ラジオ</button
>
<div>
	<p id="time">
		{perKey}{' '}key/s {missCount}
		{missCount <= 1 ? 'miss' : 'misses'}
	</p>
	{#key currentWord}
		<p in:fly={{ delay: delay + 1, x: 200 }} out:fly={{ x: -200 }} id="word">
			{currentWord.translation}
		</p>
		<p id="input" out:scale={{}}>
			{currentWord.word.slice(0, currentIndex)}
			{#if show}
				<span class="highlight">{currentWord.word.slice(currentIndex)}</span>
			{/if}
		</p>
	{/key}
</div>
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

	span {
		font-size: 40px;
	}
	#word {
		font-family: 'Dela Gothic One';
		transition: all 500ms;
	}
	#input {
		min-height: 1em;
	}
	#description * {
		font-size: 20px;
	}
</style>
