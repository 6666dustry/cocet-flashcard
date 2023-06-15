<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" version="1.1">
	<g transform="translate(100,100)">
		<circle cx="0" cy="0" r="40" fill="none" stroke="white" stroke-width="30" />
		<circle cx="0" cy="0" r="17.5" fill="none" stroke="white" stroke-width="10" />
		{#each Array(12) as _, i}
			<rect
				x="-10"
				y="-70"
				width="15"
				height="30"
				rx="2"
				ry="2"
				fill="white"
				transform={`rotate(${i * 30})`}
			/>
		{/each}
		<!-- 必要な数だけ歯を追加します-->
	</g>
	<animateTransform
		attributeName="transform"
		attributeType="XML"
		type="rotate"
		from="0"
		to="360"
		dur="5s"
		repeatCount="indefinite"
	/>
</svg>

<style>
	svg {
		position: relative;
		z-index: -100;
		margin: auto;
	}
</style>
