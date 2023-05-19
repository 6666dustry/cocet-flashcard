<script lang="ts">
	import { mode, modes, links } from '../lib/modes.js';
	import { goto } from '$app/navigation';
	import '../common.css';
	let text: string;
	$: text = Math.random() < 0.1 ? modes[$mode].toLowerCase() : modes[$mode];
	let version = '1.0.2';
</script>

<header>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span
		class:none={!($mode >= 1)}
		class="top"
		on:click={() => {
			if ($mode >= 1) {
				$mode--;
				goto(links[$mode]);
			}
		}}
	/>
	<h1>{text}</h1>
	<!-- svelte-ignore a11y-click-events-have-key-events-->
	<span
		class:none={!(links.length > $mode + 1)}
		class="bottom"
		on:click={() => {
			if (links.length > $mode + 1) {
				$mode++;
				goto(links[$mode]);
			}
		}}
	/>
</header>

<slot />
<footer>
	<p><a target="_blank" href="https://otologic.jp/">効果音:OtoLogic</a></p>
	<p id="version">version:{version}</p>
</footer>

<style>
	h1 {
		font-size: 100px;
	}
	#version {
		font-size: 15px;
	}
	span {
		cursor: pointer;
		margin: auto;
		padding: 0;
		background: none;
		display: inline-block;
		width: 0;
		height: 0;
		border-right: 25px solid transparent;
		border-left: 25px solid transparent;
		border-top: 25px solid transparent;
		border-bottom: 25px solid transparent;
		border-image: none;
		box-sizing: content-box;
		align-items: unset;
	}
	span:active {
		animation: shake 333ms;
		animation-iteration-count: infinite;
	}
	.top {
		border-bottom-color: black;
	}
	.bottom {
		border-top-color: black;
	}
	.none.top {
		border-bottom-color: gray;
	}
	.none.bottom {
		border-top-color: gray;
	}
</style>
