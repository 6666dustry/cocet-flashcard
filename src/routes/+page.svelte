<script lang="ts">
	import Words from './Words.svelte';
	import Short from './Short.svelte';
	import Radio from './Radio.svelte';
</script>

<svelte:head>
	<style>
		html {
			background-image: linear-gradient(0deg, rgb(76, 76, 196), rgb(177, 255, 177));
			overflow-x: hidden;
		}
		* {
			font-family: Impact, 'Dela Gothic One', Haettenschweiler, 'Arial Narrow Bold', sans-serif;
			text-align: center;
			font-size: xx-large;
		}
	</style>
</svelte:head>
<Short />
<Radio />
<Words />
<div id="description">
	<h2>使い方</h2>
	<p>ただ英単語を入力するだけです。</p>
	<p>
		ちょっと上の数字が書かれているところの左右をクリックする事で出題範囲を変えれます。(ショートカットは左右矢印キー)
	</p>
</div>

<style>
	p {
		font-size: 40px;
	}
	#description * {
		font-size: 20px;
	}
</style>
