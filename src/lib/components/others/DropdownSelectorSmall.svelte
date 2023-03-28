<script>
	export let titles = new Array();
	export let selected = 0;
	export let onSelected = () => {};
</script>

<div class="d-inline-flex">
	<div class="text-nowrap" style="cursor: pointer; user-select:none;" data-bs-toggle="dropdown">
		<span>{titles[selected]}</span>
		<i class="fa-solid fa-angle-down" />
	</div>
	<div class="dropdown-menu bg-light border-0 shadow-sm">
		<div class="d-flex flex-column w-100">
			{#each titles as title, i}
				<button
					class="btn btn-light text-start rounded-0"
					on:click={() => {
						selected = i;
						onSelected();
					}}>{title}</button>
			{/each}
		</div>
	</div>
</div>
