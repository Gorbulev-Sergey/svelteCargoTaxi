<script>
	export let hide = true;
</script>

{#if !hide}
	<div class="alert alert-success alert-dismissible fade show">
		Сообщение отправлено.
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" on:click={() => (hide = true)} />
	</div>
{/if}
