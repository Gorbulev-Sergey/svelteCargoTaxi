<script>
	export let placeholder = '';
	export let titles = new Array();
	export let selected = 0;
	export let isLast = false;
	export let _class = '';
	export let onSelected = (/** @type {number} */ selected) => {};
</script>

<div class="d-inline-flex align-items-center {_class}">
	{#if placeholder.trim() != ''}
		<small class="me-1">{placeholder}:</small>
	{/if}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<small
		style="cursor: pointer; user-select:none;"
		on:click={() => {
			selected == 0 ? (selected = 1) : (selected = 0);
			onSelected(selected);
		}}>
		<span>{selected == 0 ? titles[0] : titles[1]}</span>
		<span>{!isLast ? '|' : ''}</span>
	</small>
</div>
