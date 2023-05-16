<script>
	import '../common.css';
	import Config from '../lib/Config.svelte';
	let text = Math.random() < 0.2 ? 'cocet' : 'COCET';
</script>

<h1>{text}</h1>
<slot />
<footer>
	<p><a target="_blank" href="https://otologic.jp/">効果音:OtoLogic</a></p>
</footer>

<style>
	h1 {
		font-size: 100px;
	}
</style>
