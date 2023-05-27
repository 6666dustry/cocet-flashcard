<script lang="ts">
	import Checker from './Checker.svelte';
	import { getQuestion } from './words.js';
	let currentWord = getQuestion()[0];
	let answer = '',
		word = '';
	function set() {
		if (currentWord.example) {
			[answer, word] =
				currentWord.example[Math.floor(Math.random() * currentWord.example.length)].split(/（|\(/);
			answer = answer.toLowerCase();
			word = word.slice(0, word.length - 1);
		} else {
			currentWord = getQuestion()[0];
			set();
		}
	}
	set();
</script>

<Checker on:startGame={set} {answer} {word} />
