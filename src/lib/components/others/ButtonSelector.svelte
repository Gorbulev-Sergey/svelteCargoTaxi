<script>
	export let placeholder = '';
	export let titles = new Array();
	export let selected = 0;
    export let _class="";
</script>

<div class="d-inline-flex align-items-center {_class}">
	<i class="btn btn-sm border-0" style="cursor:default">{placeholder}{placeholder?":":""}</i>
	<div class="btn-group btn-group-sm">
		{#each titles as title, i}
			<button class="btn btn-{i == selected ? 'dark' : 'light'}" on:click={() => (selected = i)}>{title}</button>
		{/each}
	</div>
</div>
