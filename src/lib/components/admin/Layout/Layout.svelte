<script>
	import { goto } from '$app/navigation';
	import Auth from '$lib/components/Auth.svelte';
	import After from '$lib/components/others/breakepoints/After.svelte';
	import Before from '$lib/components/others/breakepoints/Before.svelte';

	export let pageTitle = '';
	$: routes = [
		{ title: 'Заказы', url: '/admin/orders', pin: '', icon: 'fa-solid fa-clipboard-list' },
		{ title: 'Водители', url: '/admin/drivers', pin: '', icon: 'fa-solid fa-users' },
		{ title: 'Автомобили', url: '', pin: '12', icon: 'fa-solid fa-truck' },
		{ title: 'Статистика', url: '', pin: '', icon: 'fa-solid fa-circle-info' },
	];
</script>

<Auth>
	<Before>
		<div class="sticky-top mb-3 bg-light shadow-sm">
			<div class="d-flex justify-content-between align-items-center px-1 py-2 ">
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
			<div class="pb-2">
				<slot name="center" />
			</div>
		</div>
		<slot />
	</Before>
	<After>
		<div class="d-flex align-items-start">
			<div class="sticky-top bg-light" style="width: 11em; min-height: 100vh;">
				<div class="d-flex w-100 justify-content-center">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<img
						class="m-2"
						style="filter: blur(.1px) contrast(145%); cursor:pointer; width: 90%"
						src="https://sun9-68.userapi.com/JMNL26HgHKZeSqtog_oujmPQwE1glD6Njf02_g/mdS7yp5Eq9o.jpg"
						alt=""
						on:click={() => goto('/admin/orders')} />
				</div>
				<div class="mt-2">
					{#each routes as route}
						<a href={route.url} class="btn btn-light text-dark text-start w-100 rounded-0">
							<div class="d-flex align-items-center gap-1">
								{#if route.icon}
									<i class="{route.icon} text-center" style="min-width:1.6em; font-size:1.1em" />
								{/if}
								{route.title}
							</div>
						</a>
					{/each}
				</div>
			</div>
			<div class="flex-grow-1 d-flex flex-column gap-3">
				<div class="sticky-top d-flex justify-content-between align-items-center bg-light p-2 shadow-sm">
					<h4 class="mx-2 py-1 my-0">{@html pageTitle}</h4>
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
