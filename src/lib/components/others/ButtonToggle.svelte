<script>
	export let placeholder = '';
	export let titles = new Array();
	export let selected = 0;
	export let _class = '';
	export let onSelected = (/** @type {number} */ selected) => {};
</script>

<div class="d-inline-flex align-items-center {_class}">
	{#if placeholder.trim() != ''}
		<i class="btn btn-sm border-0" style="cursor:default">{placeholder}</i>
	{/if}
	<div class="btn-group btn-group-sm">
		<button
			class="btn btn-dark"
			on:click={() => {
				selected == 0 ? (selected = 1) : (selected = 0);
				onSelected(selected);
			}}>{selected == 0 ? titles[0] : titles[1]}</button>
	</div>
</div>
