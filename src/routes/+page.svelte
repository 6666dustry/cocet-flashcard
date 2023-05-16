<script lang="ts">
	import { playSound } from '../lib/sounds.js';
	import speak from '../lib/utils/speak.js';
	import { fly, scale } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import Config from '$lib/Config.svelte';
	const delay = 500;

	let getRandomWord = () => [{ word: 'loading', translation: 'ローディング' }, 0] as [Word, number];
	let currentWord = getRandomWord()[0];
	let currentIndex = 0;
	let startTime = 0;
	let missCount = 0;
	let show = false;
	let perKey = 0;

	const startGame = () => {
		currentIndex = 0;
		startTime = Date.now();
		currentWord = getRandomWord()[0];
	};

	const endGame = () => {
		const elapsedTime = Date.now() - startTime;
		perKey = Math.ceil((currentWord.word.length / (elapsedTime / 1000)) * 100) / 100;
		missCount = 0;
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
	document.addEventListener('keydown', call);
	onDestroy(() => {
		document.removeEventListener('keydown', call);
	});
	onMount(() => {
		currentWord = getRandomWord()[0];
	});
</script>

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
<Config bind:getQuestion={getRandomWord} />

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
</style>
