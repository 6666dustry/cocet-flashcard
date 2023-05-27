<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import speak from '$lib/utils/speak.js';
	import { fly, scale } from 'svelte/transition';
	import { words } from './words.js';
	import { createEventDispatcher } from 'svelte';
	const delay = 500;
	let currentIndex = 0;
	let startTime = 0;
	let missCount = 0;
	let show = false;
	let perKey = 0;
	export let word = '',
		answer = '';
	const dispatcher = createEventDispatcher();

	const startGame = () => {
		currentIndex = 0;
		startTime = Date.now();
		missCount = 0;
		dispatcher('startGame');
	};
	words.subscribe(() => {
		startGame();
	});

	const endGame = () => {
		const elapsedTime = Date.now() - startTime;
		perKey = Math.ceil((answer.length / (elapsedTime / 1000)) * 100) / 100;
		speak(answer);
		playSound(true);
		dispatcher('endGame');
	};

	const handleInput = (key: string) => {
		if (key === answer[currentIndex]) {
			currentIndex = currentIndex + 1;
			if (currentIndex + 1 > answer.length) {
				endGame();
				setTimeout(() => {
					startGame();
				}, delay);
			}
		} else {
			if (key === 'shift') {
				return;
			}

			missCount = missCount + 1;
			show = true;
			setTimeout(() => {
				show = false;
			}, delay);
		}
	};
	const call = (event: KeyboardEvent) => {
		const key = event.key.toLowerCase();
		if (key === ' ') {
			event.preventDefault();
		}
		handleInput(key);
	};
</script>

<svelte:window on:keydown={call} />
<div>
	<p id="time">
		{perKey}{' '}key/s {missCount}
		{missCount <= 1 ? 'miss' : 'misses'}
	</p>
	{#key word}
		<p in:fly={{ delay: delay + 1, x: 200 }} out:fly={{ x: -200 }} id="word">
			{word}
		</p>
		<p id="input" out:scale={{}}>
			{answer.slice(0, currentIndex)}
			{#if show}
				<span class="highlight">{answer.slice(currentIndex)}</span>
			{/if}
		</p>
	{/key}
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
</style>
