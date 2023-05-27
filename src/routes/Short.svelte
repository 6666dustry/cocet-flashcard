<script lang="ts">
	import Checker from './Checker.svelte';
	import { getQuestion } from './words.js';
	let currentWord = getQuestion()[0];
</script>

<Checker
	on:startGame={() => {
		currentWord = getQuestion()[0];
	}}
	answer={currentWord.word}
	word={currentWord.translation}
/>
