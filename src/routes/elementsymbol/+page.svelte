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
		<tr class="description">
			<td /><td id="alkali-metal">アルカリ金属</td><td id="alkali-earth-metal">アルカリ土類金属</td
			><td id="transition" colspan="10">遷移元素</td>
			<td id="base-metal" colspan="2">卑金属元素</td>
			<td id="nonmetal" colspan="2">非金属元素</td>
			<td id="halogen">ハロゲン</td><td id="gas">貴ガス</td>
		</tr>
		<tr class="description">
			<td class="transparent" />
			<td colspan="2" class="main-group">典型元素</td>
			<td colspan="10" class="transparent" />
			<td colspan="6" class="main-group">典型元素</td>
		</tr>
		<tr class="description">
			<td class="transparent" />
			<td colspan="13" id="metal">金属元素</td>
			<td colspan="4" id="metalloid">半金属元素</td><td id="unknown">不明</td>
		</tr>
	</tbody>
</table>
<div>
	<h2>使い方</h2>
	<p>
		元素記号、元素名の内どれか一つが消されるので後は答えるだけです。もちろん答えられますよね？？
	</p>
	<p>
		キーボードの右矢印かポップアップをクリックで問題をスキップできます。でももちろんあなたは使いませんよね？？
	</p>
</div>

<style lang="scss">
	@property --deg {
		syntax: '<angle>'; /* <- defined as type number for the transition to work */
		initial-value: 0deg;
		inherits: false;
	}
	table {
		margin: auto;
		table-layout: fixed;
	}
	span {
		display: inline-block;
	}
	:where(td),
	#metal {
		transition: scale 0.3s cubic-bezier(0.18, 1.35, 0.67, 1.59) 0s;
		min-width: 3em;
		border: 3px solid gray;
		text-align: center;
		background-color: lavender;
	}
	#metal {
		border: none;
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
	.transparent {
		background: none !important;
		border: none !important;
	}
	.description * {
		background: none;
		border-color: white;
	}
	@keyframes move {
		from {
			--deg: 0deg;
		}
		to {
			--deg: 360deg;
		}
	}
	.main-group {
		border-image: linear-gradient(
				var(--deg),
				hsl(0deg, 100%, 50%),
				hsl(60deg, 100%, 50%),
				hsl(120deg, 100%, 50%),
				hsl(180deg, 100%, 50%),
				hsl(240deg, 100%, 50%),
				hsl(3000deg, 100%, 50%)
			)
			10;
		animation: move 1.5s linear 0;
		animation-iteration-count: infinite;
	}
	tbody td {
		border-image: linear-gradient(
				var(--deg),
				var(--shadow-color) 40%,
				white 60%,
				var(--shadow-color)
			)
			10;
		animation: move 1s linear 0;
		animation-iteration-count: infinite;
	}
	td:nth-child(2),
	#alkali-metal {
		--shadow-color: orange;
		border-color: var(--shadow-color);
	}
	td:nth-child(3),
	#alkali-earth-metal {
		--shadow-color: limegreen;
		border-color: var(--shadow-color);
	}
	td:nth-child(n + 4),
	#transition {
		--shadow-color: blue;
		border-color: var(--shadow-color);
	}
	td:nth-child(n + 14),
	#base-metal {
		--shadow-color: gold;
		border-color: var(--shadow-color);
	}
	@for $i from 1 through 5 {
		:where(tr:nth-child(#{$i})) > td:nth-child(n + #{max($i + 12,14)}) {
			--shadow-color: gray;
			border-color: var(--shadow-color);
		}
	}
	#nonmetal {
		border-color: gray;
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
	#metalloid {
		background-color: lightcyan;
		border: none;
	}
	@for $i from 1 through 6 {
		:where(tr:nth-child(#{$i})) > td:nth-child(n + #{$i + 13}) {
			background-color: white;
		}
	}
	td:nth-child(18),
	#halogen {
		--shadow-color: dodgerblue;
		border-color: var(--shadow-color);
	}
	td:nth-child(19),
	#gas {
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
	#unknown {
		background-color: cornsilk;
		border: none;
	}
</style>
