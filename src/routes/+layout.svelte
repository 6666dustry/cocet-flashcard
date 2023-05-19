<script lang="ts">
	import { mode, modes } from '../lib/modes.js';
	import '../common.css';
	let text = Math.random() < 0.1 ? $mode.toLowerCase() : $mode;
	let version = '1.0.2';
</script>

<header>
	<span class="top" />
	<h1>{text}</h1>
	<span class="bottom" />
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
</style>
