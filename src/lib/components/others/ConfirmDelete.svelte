<script>
	export let title = '';
	export let onDelete = () => {};
	export let onCansel = () => {};
</script>

<div style="display: contents">
	<button class="btn btn-sm btn-light text-dark" title="Удалить" data-bs-toggle="dropdown">
		<i class="fa-regular fa-trash-can text-danger" />
	</button>

	<div class="dropdown-menu text-center p-2">
		<div>{title}</div>
		<div class="d-flex justify-content-between align-items-center gap-1 mt-2">
			<button class="btn btn-sm btn-danger text-light" on:click={() => onDelete()}>Удалить</button>
			<button class="btn btn-sm btn-light text-dark" on:click={() => onCansel()}>Отмена</button>
		</div>
	</div>
</div>
