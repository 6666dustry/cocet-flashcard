<script lang="ts">
	import { words } from './words.js';
	import 'svelte/easing';
	let min = 1,
		max = 200;
	let prev: {
		loaded: boolean;
		data: Word[];
	} = {
		loaded: false,
		data: []
	};
	let next: {
		loaded: boolean;
		data: Word[];
	} = {
		loaded: false,
		data: []
	};
	const division = 200;
	async function load() {
		try {
			next.data = (await import(`../assets/words/${min + division}-${max + division}.json`)).words;
			next.loaded = true;
		} catch (error) {
			next.loaded = false;
		}
		try {
			prev.data = (await import(`../assets/words/${min - division}-${max - division}.json`)).words;
			prev.loaded = true;
			return true;
		} catch (error) {
			prev.loaded = false;
		}
	}
	load();
	function change(mode: 'plus' | 'minus') {
		switch (mode) {
			case 'plus':
				if (!next.loaded) {
					return;
				}
				$words = next.data;
				min += division;
				max += division;
				break;
			case 'minus':
				if (!prev.loaded) {
					return;
				}
				$words = prev.data;
				min -= division;
				max -= division;
				break;
			default:
				break;
		}
		load();
	}
	const shortcut = (k: KeyboardEvent) => {
		if (k.key === 'ArrowLeft') {
			change('minus');
		}
		if (k.key === 'ArrowRight') {
			change('plus');
		}
	};
</script>

<svelte:window on:keydown={shortcut} />
<div>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span
		class:none={!prev.loaded}
		class:slide={prev.loaded}
		class="left"
		on:click={change.bind(null, 'minus')}
	/>
	{min}-{Math.min(max, min + $words.length)}
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span
		class:none={!next.loaded}
		class:slide={next.loaded}
		class="right"
		on:click={change.bind(null, 'plus')}
	/>
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
	@keyframes left {
		0% {
			translate: 0px;
		}
		100% {
			translate: -10px;
		}
	}
	@keyframes right {
		0% {
			translate: 0px;
		}
		100% {
			translate: 10px;
		}
	}
	.left {
		border-right-color: black;
	}
	.right {
		border-left-color: black;
	}
	.slide.left {
		animation: left 600ms;
		animation-iteration-count: infinite;
	}
	.slide.right {
		animation: right 600ms;
		animation-iteration-count: infinite;
	}
	.none.left {
		border-right-color: gray;
	}
	.none.right {
		border-left-color: gray;
	}
	.none:active {
		animation: shake 250ms;
		animation-iteration-count: infinite;
	}
</style>
