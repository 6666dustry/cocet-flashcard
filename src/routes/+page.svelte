<script lang="ts">
	import Words from './Words.svelte';
	import Short from './Short.svelte';
	import Radio from './Radio.svelte';
	import LongHard from './LongHard.svelte';
	import Long from './Long.svelte';
	let elem = Short;
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
<svelte:component this={elem} />
<br />
<label for="mode">モード</label>
<select bind:value={elem} name="mode" id="mode">
	<option value={Short}>英単語</option>
	<option value={Long}>英文</option>
	<option value={LongHard}>英文(日本語訳のみ)</option>
</select>
<Words />
<Radio />
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
	select,
	label,
	select option {
		font-size: 20px;
		background: none;
	}
</style>
