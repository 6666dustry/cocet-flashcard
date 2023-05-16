<script lang="ts">
	import { onDestroy } from 'svelte';
	import { words as to200 } from '../../static/words/1-200.json';
	import { readable } from 'svelte/store';
	let min = 1,
		max = 200,
		prev: [min: number, max: number] = [min, max];
	const division = 200;
	let setter: (value: Word[]) => void;
	export const currentWords = readable(to200 as Word[], (set) => {
		setter = set;
	});
	let loaded = true;
	async function load() {
		try {
			let load = await import(`../../static/words/${min}-${max}.json`);
			loaded = true;
			setter(load.words);
			return true;
		} catch (error) {
			loaded = false;
			return false;
		}
	}

	function minus() {
		if (min <= 1) {
			//元素記号モードを用意するかも？
		} else {
			prev = [min, max];
			min -= division;
			max -= division;
			load();
		}
	}
	function plus() {
		if (max + division > 2600) {
			return;
		}
		prev = [min, max];
		min += division;
		max += division;
		load();
	}
	const shortcut = (k: KeyboardEvent) => {
		if (k.key === 'ArrowLeft') {
			minus();
		}
		if (k.key === 'ArrowRight') {
			plus();
		}
	};
	document.addEventListener('keydown', shortcut);
	onDestroy(() => {
		document.removeEventListener('keydown', shortcut);
	});
</script>

<div
	class:error={!loaded}
	on:keydown={(k) => {
		if (k.key === 'ArrowLeft') {
			minus();
		}
		if (k.key === 'ArrowRight') {
			plus();
		}
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span class="left" on:click={minus} />
	{min}-{max}
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span class="right" on:click={plus} />
</div>

<style>
	div {
		font-size: 37.5px;
	}
	span {
		cursor: pointer;
		margin: auto;
		padding: 0;
		background: none;
		display: inline-block;
		width: 0;
		height: 0;
		border-right: 15px solid transparent;
		border-left: 15px solid transparent;
		border-top: 15px solid transparent;
		border-bottom: 15px solid transparent;
		border-image: none;
		box-sizing: content-box;
		align-items: unset;
	}
	.left {
		border-right-color: black;
	}
	.right {
		border-left-color: black;
	}
	.error {
		color: crimson;
	}
</style>
