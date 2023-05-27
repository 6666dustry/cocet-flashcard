<script lang="ts">
	import Checker from './Checker.svelte';
	import { getQuestion } from './words.js';
	let currentWord = getQuestion()[0];
	let answer = '',
		word = '';
	function set() {
		if (currentWord.example) {
			word =
				currentWord.example[Math.floor(Math.random() * currentWord.example.length)].toLowerCase();
			answer = word.substring(0, word.search(/（|\(/));
		} else {
			currentWord = getQuestion()[0];
			set();
		}
	}
	set();
</script>

<Checker
	on:startGame={() => {
		currentWord = getQuestion()[0];
		set();
	}}
	{answer}
	{word}
/>
