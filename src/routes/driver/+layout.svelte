<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Auth from '$lib/components/Auth.svelte';

	let routes = [
		{ route: '/driver/orders', title: 'Заказы', icon: 'fa-solid fa-layer-group' },
		{ route: '/driver/profile', title: 'Профиль', icon: 'fa-regular fa-id-card' },
	];
</script>

<Auth returnUrl="/driver/orders">
	<div class="fixed-bottom w-100 bg-light shadow-sm">
		<div class="d-flex align-items-center">
			{#each routes as route, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="btn w-100 border-0 rounded-0 text-dark {$page.route.id == route.route ? ' fw-bold' : ''}"
					style="padding-top: .58em; padding-bottom: .58em;"
					on:click={() => goto(route.route)}>
					<i class="{route.icon} me-1" />{route.title}
				</div>
				{#if i == 0}|{/if}
			{/each}
		</div>
	</div>
	<slot />
</Auth>
