<script>
	export let placeholder = '';
	export let titles = new Array();
	export let selected = false;
	export let _class = '';
	export let onSelected = (/** @type {boolean} */ selected) => {};
</script>

<div class="d-inline-flex align-items-center {_class}">
	{#if placeholder.trim() != ''}
		<i class="btn btn-sm border-0" style="cursor:default">{placeholder}</i>
	{/if}
	<div class="btn-group btn-group-sm">
		<button
			class="btn btn-dark"
			on:click={() => {
				selected = !selected;
				onSelected(selected);
			}}>{!selected ? titles[0] : titles[1]}</button>
	</div>
</div>
