<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Auth from '$lib/components/Auth.svelte';
	import After from '$lib/components/others/breakepoints/After.svelte';
	import Before from '$lib/components/others/breakepoints/Before.svelte';
	import { auth } from '$lib/scripts/firebase';
	import { driversCount, ordersCount, returnUrl } from '$lib/scripts/storage';
	import { signOut } from 'firebase/auth';

	let sidbarWidth = '14em';
	$: routes = [
		{ title: 'Заказы', url: '/admin/orders', pin: $ordersCount },
		{ title: 'Водители', url: '', pin: $driversCount },
		{ title: 'Автомобили', url: '', pin: '12' },
		{ title: 'Статистика', url: '', pin: '' },
	];
</script>

<Auth>
	<Before>
		<div class="sticky-top mb-3 bg-light">
			<div class="d-flex justify-content-between align-items-center">
				<button class="btn btn-light bg-light text-dark border-0">Заголовок</button>
				<div class="dropdown">
					<button class="btn btn-light m-1" data-bs-toggle="dropdown">Меню</button>
					<div class="dropdown-menu bg-light shadow-sm border-0">
						<div>
							{#each routes as route}
								<button class="btn btn-light text-dark text-start w-100 rounded-0" on:click={() => goto(route.url)}
									>{route.title}</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex justify-content-between align-items-center bg-light p-2">
				<button class="btn btn-sm btn-dark">1</button>
				<button class="btn btn-sm btn-dark">2</button>
			</div>
		</div>
		<slot />
	</Before>
	<After>
		<div class="d-flex align-items-start">
			<div class="sticky-top bg-light" style="width: 15em; min-height: 100vh;">
				<a href="/admin/orders"
					><img class="w-100" src="https://sun9-68.userapi.com/JMNL26HgHKZeSqtog_oujmPQwE1glD6Njf02_g/mdS7yp5Eq9o.jpg" alt="" />
				</a>
				<div>
					{#each routes as route}
						<button class="btn btn-light text-dark text-start w-100 rounded-0" on:click={() => goto(route.url)}
							>{route.title}</button>
					{/each}
				</div>
			</div>
			<div class="flex-grow-1 d-flex flex-column gap-3">
				<div class="sticky-top d-flex justify-content-between align-items-center bg-light p-2 mb3">
					<button class="btn btn-sm btn-dark">1</button>
					<button class="btn btn-sm btn-dark">2</button>
				</div>
				<div class="px-2">
					<slot />
				</div>
			</div>
		</div>
	</After>
</Auth>
