<script>
	export let titles = new Array();
	export let selected = 0;
	export let onSelected = () => {};
</script>

<div class="d-inline-flex">
	<small class="text-nowrap" style="cursor: pointer; user-select:none;" data-bs-toggle="dropdown">
		<span>{titles[selected]}</span>
		<i class="fa-solid fa-angle-down" />
	</small>
	<div class="dropdown-menu bg-light border-0">
		<div class="d-flex flex-column w-100">
			{#each titles as title, i}
				<button
					class="btn btn-sm btn-light text-start rounded-0"
					on:click={() => {
						selected = i;
						onSelected();
					}}>{title}</button>
			{/each}
		</div>
	</div>
</div>
