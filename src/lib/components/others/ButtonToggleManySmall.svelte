<script>
	export let placeholder = '';
	export let titles = new Array();
	export let selected = 0;
	export let _class = '';
	export let onSelected = (/** @type {number} */ selected) => {};
</script>

<div class="d-inline-flex align-items-center {_class}">
	{#if placeholder.trim() != ''}
		<small class="me-1">{placeholder}:</small>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="text-nowrap"
		style="cursor: pointer; user-select:none;"
		on:click={() => {
			if (titles.length <= selected + 1) {
				selected = 0;
			} else selected++;
			onSelected(selected);
		}}>
		<span>{titles[selected]}</span>
	</div>
</div>
