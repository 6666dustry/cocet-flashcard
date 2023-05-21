<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import { makeCode } from './makecode.js';
	import 'svelte/motion';
	let { colors, value, values } = makeCode();
	let section: HTMLElement;
	let numbers = [NaN, NaN, NaN];
	let index = 0;
	let minus = false;
	function ifNaN(v: number) {
		return isNaN(v) ? '□' : v.toString();
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
<section bind:this={section}>
	<div id="rotate">
		<div />
		<div id="resister">
			<span class="code" />
			<span class="code" style="background-color:{colors[0]}" />
			<span class="code" />
			<span class="code" style="background-color:{colors[1]}" />
			<span class="code" />
			<span class="code" style="background-color:{colors[2]}" />
			<span class="code" />
			<span class="code" style="background-color:{colors[3]}" />
			<span class="code" />
		</div>
		<p>{ifNaN(numbers[0])}{ifNaN(numbers[1])}×10<sup>{ifNaN(numbers[2])}</sup></p>
	</div>
</section>

<style>
	section {
		background-image: linear-gradient(225deg, yellow, navy);
		aspect-ratio: 1/1;
		height: min(60vh, 60vw);
		margin: auto;
		rotate: -5deg;
	}
	p {
		font-size: min(7.5vh, 7.5vw);
		font-weight: bold;
	}
	.code {
		display: inline-block;
		background-color: bisque;
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
