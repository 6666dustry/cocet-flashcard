<script lang="ts">
	import speak from '$lib/utils/speak.js';
	import { elements } from './elements.js';
</script>

<button
	on:click={() => {
		speak(
			elements
				.map((v) => {
					return v
						.map((value) => {
							if (!value.name) {
								return '';
							}
							return `${value.name}、${value.symbol}。`;
						})
						.join('');
				})
				.join(''),
			{ lang: 'ja-JP', loop: true }
		);
	}}
	>聞き流し
</button>
