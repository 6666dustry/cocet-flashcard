<script lang="ts">
	import { mode, modes, links } from '../lib/modes.js';
	import { goto } from '$app/navigation';
	import '../common.css';
	let text: string;
	$: text = Math.random() < 0.1 ? modes[$mode].toLowerCase() : modes[$mode];
	let version = '2.1.0';
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
	header,
	header * {
		text-align: center;
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
	@keyframes slide-top {
		0% {
			translate: 0px 0px;
			opacity: 0;
		}
		100% {
			translate: 0px -10px;
			opacity: 1;
		}
	}
	@keyframes slide-bottom {
		0% {
			translate: 0px 0px;
			opacity: 0;
		}
		100% {
			opacity: 1;
			translate: 0px 10px;
		}
	}
	.top {
		animation: slide-top 800ms;
		animation-iteration-count: infinite;
		border-bottom-color: black;
	}
	.bottom {
		animation: slide-bottom 800ms;
		animation-iteration-count: infinite;
		border-top-color: black;
	}
	.none.top {
		animation: none;
		border-bottom-color: gray;
	}
	.none.bottom {
		animation: none;
		border-top-color: gray;
	}
	span.none:active {
		animation: shake 222ms;
		animation-iteration-count: infinite;
	}
</style>
