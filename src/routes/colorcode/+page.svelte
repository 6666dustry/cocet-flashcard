<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import { makeCode } from './makecode.js';
	import 'svelte/motion';
	let { colors, value, values } = makeCode();
	let section: HTMLElement;
	let numbers = [NaN, NaN, NaN];
	let index = 0;
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
			numbers[index++] = Number(v.key);
		}
		if (!(index <= 0) && v.key === 'Backspace') {
			numbers[--index] = NaN;
		}
		if ((numbers[0] * 10 + numbers[1]) * 10 ** numbers[2] === value) {
			playSound(true);
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
			setTimeout(() => {
				({ colors, value, values } = makeCode());
				numbers = [NaN, NaN, NaN];
				index = 0;
			}, 500);
		} else {
			if (!isNaN(numbers[0]) && !isNaN(numbers[1]) && !isNaN(numbers[2])) {
				playSound(false);
			}
		}
	}}
/>
<div id="line" />
<section bind:this={section}>
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
</section>

<style>
	section {
		background-image: linear-gradient(225deg, yellow, navy);
		aspect-ratio: 1/1;
		height: min(60vh, 60vw);
		margin: auto;
		rotate: -5deg;
		display: grid;
		place-items: center;
	}
	.code {
		display: inline-block;
		background-color: bisque;
	}
	#resister {
		rotate: 5deg;
		display: grid;
		width: 80%;
		margin: auto;
		border-radius: 12.5px;
		overflow: hidden;
		grid-template-columns: repeat(4, 1.5fr 1fr) 1.5fr;
		height: 60%;
	}
	#line {
		border-bottom: 3px solid black;
		margin-bottom: 10vh;
	}
</style>
