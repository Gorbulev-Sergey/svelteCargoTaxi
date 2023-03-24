<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let title = 'Панель управления';
	export let routes;
</script>

<div class="position-sticky sticky-top bg-light p-2">
	<div class="container-fluid d-flex justify-content-between align-items-center">
		<div class="flex-grow-1 d-flex justify-content-start align-items-center">
			<button
				class="btn btn-light bg-transparent text-dark border-0 text-uppercase text-start me-2"
				on:click={() => goto(routes[0].url)}><b class="text-nowrap">{@html title}</b></button>
			<div>
				{#each routes as item}
					<a class="btn btn-light text-dark border-0 me-1 {$page.route.id == item.route ? 'fw-bold' : ''}" href={item.url}
						>{item.title}
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="container">
	<slot />
</div>
