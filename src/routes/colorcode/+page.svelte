<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import { object_without_properties } from 'svelte/internal';
	import { makeCode } from './makecode.js';
	import 'svelte/motion';
	let { colors, value, values } = makeCode();
	let section: HTMLElement;
	let numbers = [NaN, NaN, NaN];
	let index = 0;
	let minus = false;
	let skipped = false;
	function ifNaN(v: number) {
		return isNaN(v) ? '□' : v.toString();
	}
	function skip() {
		skipped = true;
		setTimeout(() => {
			({ colors, value, values } = makeCode());
			numbers = [NaN, NaN, NaN];
			index = 0;
			skipped = false;
		}, 750);
	}
</script>

<svelte:window
	on:keydown={(v) => {
		if (v.key.match(/\d/)) {
			if (index >= 3) {
				index = 2;
			}
			numbers[index++] = minus ? -Number(v.key) : Number(v.key);
			minus = false;
		}
		if (v.key === '-') {
			minus = true;
		}
		if (!(index <= 0) && v.key === 'Backspace') {
			numbers[--index] = NaN;
		}
		if (v.key === 'ArrowRight') {
			skip();
			return;
		}
		if ((numbers[0] * 10 + numbers[1]) * 10 ** numbers[2] === value) {
			playSound(true);
			setTimeout(() => {
				({ colors, value, values } = makeCode());
				numbers = [NaN, NaN, NaN];
				index = 0;
			}, 500);
			section.animate(
				[
					{
						opacity: 1,
						rotate: '-5deg'
					},
					{
						rotate: '85deg'
					},
					{
						opacity: 0,
						rotate: '175deg'
					},
					{
						rotate: '265deg'
					},
					{
						opacity: 1,
						rotate: '355deg'
					}
				],
				{ duration: 500, easing: 'ease' }
			);
		} else {
			if (!isNaN(numbers[0]) && !isNaN(numbers[1]) && !isNaN(numbers[2])) {
				playSound(false);
			}
		}
	}}
/>
<div id="line">
	<span id="title"
		>{['COOL CODE', 'COLOR CODE', 'カラーコード', 'RESISTANCE', 'TEIKOU', 'COROL CDOE'][
			Math.floor(Math.random() * 6)
		]}</span
	>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events-->
<section bind:this={section} on:click={skip}>
	<div id="rotate">
		<div />
		<div id="resister">
			<span class="code" />
			<span
				class="code"
				class:white={colors[0].search(/(black)|(purple)|(brown)|(gray)|(blue)/) !== -1}
				style="background-color:{colors[0]}">{skipped ? values[0] : ''}</span
			>
			<span class="code" />
			<span
				class="code"
				class:white={colors[1].search(/(black)|(purple)|(brown)|(gray)|(blue)/) !== -1}
				style="background-color:{colors[1]}">{skipped ? values[1] : ''}</span
			>
			<span class="code" />
			<span
				class="code"
				class:white={colors[2].search(/(black)|(purple)|(brown)|(gray)|(blue)/) !== -1}
				style="background-color:{colors[2]}"
				>{#if skipped}
					10<sup>{values[2].toExponential().slice(2).replace('+', '')}</sup>
				{/if}</span
			>
			<span class="code" />
			<span class="code" style="background-color:{colors[3]}" />
			<span class="code" />
		</div>
		<p id="display">
			<span class:highlight={index === 0}>{ifNaN(numbers[0])}</span><span
				class:highlight={index === 1}>{ifNaN(numbers[1])}</span
			>×10
			<sup class:highlight={index === 2}>{minus ? '-' : ''}{ifNaN(numbers[2])} </sup>
		</p>
	</div>
</section>
<div>
	<h2>使い方</h2>
	<p>カラーコードを読むのだ。</p>
	<p>
		もし読めなかったら中央のなんか傾いている四角を左クリックか、キーボードの右矢印を押せば問題をスキップできるぞい！
	</p>
</div>

<style>
	section {
		background-image: linear-gradient(225deg, yellow, navy);
		aspect-ratio: 1/1;
		height: min(60vh, 60vw);
		margin: auto;
		rotate: -5deg;
	}
	.code {
		display: inline-block;
		background-color: bisque;
		text-align: center;
	}
	.white {
		color: white;
	}
	#display {
		font-size: min(7.5vh, 7.5vw);
		font-weight: bold;
	}
	#rotate {
		rotate: 5deg;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
	}
	#resister {
		display: grid;
		width: 80%;
		margin: auto;
		border-radius: 12.5px;
		overflow: hidden;
		grid-template-columns: repeat(4, 1.5fr 1fr) 1.5fr;
		height: 90%;
	}
	#line {
		border-bottom: 3px solid black;
		margin-bottom: 10vh;
		text-align: center;
	}
	#title {
		display: inline-block;
		font-size: 30px;
		font-weight: bold;
		border-radius: 2em;
		padding: 0.5em;
		background-color: red;
		translate: 0 1.25em;
		margin-bottom: 0;
	}
</style>
