<script>
	export let titles = new Array();
	export let selected = 0;
</script>

<div class="btn-group btn-group-sm">
	{#each titles as title, i}
		<button class="btn btn-{i == selected ? 'dark' : 'light'}" on:click={() => (selected = i)}>{title}</button>
	{/each}
</div>
