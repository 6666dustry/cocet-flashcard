<script lang="ts">
	import { playSound } from '$lib/sounds.js';
	import { elements, choice } from './elements.js';
	const families = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	let answer = choice();
	let value = '';
	let skipped = false;
	function check() {
		if (value === answer) {
			answer = choice();
			value = '';
			playSound(true);
		} else {
			playSound(false);
		}
	}
	function skip() {
		skipped = true;
		value = answer;
		setTimeout(() => {
			answer = choice();
			value = '';
			skipped = false;
		}, 750);
	}
</script>

<svelte:window
	on:keydown={(v) => {
		if (v.key == 'ArrowRight') {
			skip();
		}
	}}
/>
<div id="horizontal"><span id="vertical" /></div>
<table>
	<thead>
		<tr>
			{#each families as family}
				{#if family !== 0}
					<th>{family}族</th>
				{:else}
					<th />
				{/if}
			{/each}
		</tr>
		<tr />
	</thead>
	<tbody>
		{#each elements as dataColumn, i}
			<tr>
				<th scope="row">{i + 1}周期</th>
				<!-- svelte-ignore a11y-click-events-have-key-events-->
				{#each dataColumn as symbol}<td
						class:none={!symbol.symbol}
						class:show={symbol.name === answer || symbol.symbol === answer}
						on:click={() => (symbol.name === answer || symbol.symbol === answer) && skip()}
					>
						<span>{(symbol.symbol && symbol.number) ?? ''}</span>
						<br />
						{#if symbol.symbol === answer}
							<!-- svelte-ignore a11y-autofocus-->
							<input class:highlight={skipped} autofocus type="text" on:change={check} bind:value />
						{:else}
							<span id="symbol">{symbol.symbol ?? ''}</span>
						{/if}

						<br />
						{#if symbol.name === answer}
							<!-- svelte-ignore a11y-autofocus-->
							<input class:highlight={skipped} autofocus type="text" on:change={check} bind:value />
						{:else}
							<span id="name">{symbol.name ?? ''}</span>
						{/if}
					</td>{/each}</tr
			>
		{/each}
	</tbody>
</table>
<div>
	<h2>使い方</h2>
	<p>元素記号、元素のどれか一つが消されるので後は答えるだけです。もちろん答えられますよね？？</p>
	<p>
		キーボードの右矢印かポップアップをクリックで問題をスキップできます。でももちろんあなたは使いませんよね？？
	</p>
</div>

<style lang="scss">
	table {
		margin: auto;
		table-layout: fixed;
	}
	span {
		display: inline-block;
	}
	:where(td) {
		transition: scale 0.3s cubic-bezier(0.18, 1.35, 0.67, 1.59) 0s;
		min-width: 3em;
		border: 3px solid gray;
		text-align: center;
		background-color: lavender;
	}
	.none {
		border: 1px dashed gray;
		background: none;
	}
	.show {
		scale: 1.25 1.25;
		box-shadow: 0 0 5px 1px var(--shadow-color, black), inset 0 0 5px 0px var(--shadow-color, black);
	}

	#symbol {
		font-weight: bold;
	}
	#name {
		max-width: 4em;
	}
	#horizontal {
		position: relative;
		border-bottom: 7.5px solid darkgreen;
	}
	#vertical {
		position: absolute;
		top: -40vh;
		left: 100px;
		display: inline-block;
		border-left: 7.5px solid darkblue;
		width: 10px;
		height: 120vh;
	}
	td:nth-child(2) {
		--shadow-color: orange;
		border-color: var(--shadow-color);
	}
	td:nth-child(3) {
		--shadow-color: limegreen;
		border-color: var(--shadow-color);
	}
	td:nth-child(n + 4) {
		--shadow-color: blue;
		border-color: var(--shadow-color);
	}
	td:nth-child(n + 14) {
		--shadow-color: gold;
		border-color: var(--shadow-color);
	}
	@for $i from 1 through 5 {
		:where(tr:nth-child(#{$i})) > td:nth-child(n + #{max($i + 11,14)}) {
			--shadow-color: gray;
			border-color: var(--shadow-color);
		}
	}
	@for $i from 2 through 6 {
		:where(tr:nth-child(#{$i})) > td:nth-child(#{$i + 12}) {
			background-color: lightcyan;
		}
	}
	@for $i from 4 through 6 {
		:where(tr:nth-child(#{$i})) > td:nth-child(#{$i + 11}) {
			background-color: lightcyan;
		}
	}
	@for $i from 1 through 6 {
		:where(tr:nth-child(#{$i})) > td:nth-child(n + #{$i + 13}) {
			background-color: white;
		}
	}
	td:nth-child(18) {
		--shadow-color: dodgerblue;
		border-color: var(--shadow-color);
	}
	td:nth-child(19) {
		--shadow-color: lime;
		border-color: var(--shadow-color);
	}
	tr:first-child > td:nth-child(2) {
		background-color: white;
		--shadow-color: gray;
		border-color: var(--shadow-color);
	}
	tr:nth-child(6) > td:nth-child(4) {
		--shadow-color: magenta;
		border-color: var(--shadow-color);
	}
	tr:nth-child(7) > {
		td:nth-child(4) {
			--shadow-color: plum;
			border-color: var(--shadow-color);
		}
		td:nth-child(n + 5) {
			border-style: dotted;
		}
		td:nth-child(14),
		td:nth-child(n + 16) {
			background-color: cornsilk;
		}
	}
</style>
