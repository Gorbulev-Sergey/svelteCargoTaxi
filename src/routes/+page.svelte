<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => goto('/admin/orders'));
</script>

<div class="d-flex flex-column">
	<div class="sticky-top w-100 bg-light text-dark px-2 py-1">
		<button class="btn btn-light text-dark me-1" on:click={() => goto('/admin/orders')}>Заказы</button>
		<button class="btn btn-light text-dark me-1" on:click={() => goto('/messages')}>Сообщения</button>
	</div>
	<div class="w-100">
		<div class="container p-3" />
	</div>
</div>
