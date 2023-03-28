<script>
	export let titles = new Array();
	export let selected = 0;
	export let onSelected = () => {};
</script>

<div class="d-inline-flex">
	<button class="btn btn-sm btn-dark" data-bs-toggle="dropdown">
		<div class="d-flex align-items-center">
			{titles[selected]}
			<i class="fa-solid fa-angle-down ms-2" />
		</div>
	</button>
	<div class="dropdown-menu bg-light border-0 shadow-sm">
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
