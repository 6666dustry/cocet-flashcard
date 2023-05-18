<script>
	import '../common.css';
	let text = Math.random() < 0.2 ? 'cocet flash card' : 'COCET FLASH CARD';
	let version = '1.0.2';
</script>

<h1>{text}</h1>
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
</style>
