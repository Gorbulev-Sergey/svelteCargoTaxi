<script>
	import { goto } from '$app/navigation';
	import Auth from '$lib/components/Auth.svelte';
	import After from '$lib/components/others/breakepoints/After.svelte';
	import Before from '$lib/components/others/breakepoints/Before.svelte';

	export let pageTitle = '';
	$: routes = [
		{ title: 'Заказы', url: '/admin/orders', pin: '' },
		{ title: 'Водители', url: '', pin: '' },
		{ title: 'Автомобили', url: '', pin: '12' },
		{ title: 'Статистика', url: '', pin: '' },
	];
</script>

<Auth>
	<Before>
		<div class="sticky-top mb-3 bg-light">
			<div class="d-flex justify-content-between align-items-center px-1 py-2">
				<div class="btn btn-light bg-light text-nowrap text-dark border-0"><b>{@html pageTitle}</b></div>
				<div class="d-flex align-items-center gap-1">
					<slot name="nav" />
					<button class="btn btn-light" data-bs-toggle="dropdown"><i class="fa-solid fa-bars" /></button>
					<div class="dropdown-menu bg-light w-100 shadow-sm border-0">
						<div>
							{#each routes as route}
								<button class="btn btn-light text-dark text-start w-100 rounded-0" on:click={() => goto(route.url)}
									>{route.title}</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class=" pb-2">
				<slot name="center" />
			</div>
		</div>
		<slot />
	</Before>
	<After>
		<div class="d-flex align-items-start">
			<div class="sticky-top bg-light" style="width: 15em; min-height: 100vh;">
				<a href="/admin/orders">
					<img class="w-100" src="https://sun9-68.userapi.com/JMNL26HgHKZeSqtog_oujmPQwE1glD6Njf02_g/mdS7yp5Eq9o.jpg" alt="" />
				</a>
				<div class="mt-2">
					{#each routes as route}
						<button class="btn btn-light text-dark text-start w-100 rounded-0" on:click={() => goto(route.url)}
							>{route.title}</button>
					{/each}
				</div>
			</div>
			<div class="flex-grow-1 d-flex flex-column gap-3">
				<div class="sticky-top d-flex justify-content-between align-items-center bg-light p-2">
					<h4 class="mx-2 my-0">{@html pageTitle}</h4>
					<slot name="center" />
					<slot name="nav" />
				</div>
				<div class="px-3">
					<slot />
				</div>
			</div>
		</div>
	</After>
</Auth>
