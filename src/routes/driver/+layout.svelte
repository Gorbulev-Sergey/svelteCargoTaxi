<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Auth from '$lib/components/Auth.svelte';
	import { returnUrl } from '$lib/scripts/storage';

	let routes = [
		{ route: '/driver/orders', title: 'Заказы', icon: 'fa-solid fa-layer-group' },
		{ route: '/driver/profile', title: 'Профиль', icon: 'fa-regular fa-id-card' },
	];
	$returnUrl = '/driver/orders';
</script>

<Auth signInUrl="/admin/authPhone">
	<slot />
	<div class="position-fixed fixed-bottom bottom-0 start-0 w-100">
		<div class="btn-group w-100 rounded-0">
			{#each routes as route}
				<button
					class="btn w-100 rounded-0 {$page.route.id == route.route ? ' btn-dark text-light' : ' btn-light text-dark'}"
					on:click={() => goto(route.route)}>
					<i class="{route.icon} me-1" />{route.title}</button>
			{/each}
		</div>
	</div>
</Auth>
