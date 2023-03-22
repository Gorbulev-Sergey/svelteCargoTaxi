<script>
	import { goto } from '$app/navigation';
	import Auth from '$lib/components/Auth.svelte';
</script>

<Auth signInUrl="/driver/authPhone">
	<div class="position-sticky sticky-top">
		<div class="btn-group w-100 rounded-0">
			<button class="btn btn-light text-dark w-100 rounded-0 active" on:click={() => goto('/driver/orders')}>
				<i class="fa-solid fa-layer-group me-1" />Заказы</button>
			<button class="btn btn-light text-dark w-100 rounded-0" on:click={() => goto('/driver/profile')}>
				<i class="fa-regular fa-id-card me-1" />Профиль</button>
		</div>
	</div>
	<div class="container-fluid mt-3">
		<slot />
	</div>
</Auth>
