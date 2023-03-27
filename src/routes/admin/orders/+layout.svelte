<script>
	import { goto } from '$app/navigation';
	import Auth from '$lib/components/Auth.svelte';
	import After from '$lib/components/others/breakepoints/After.svelte';
	import Before from '$lib/components/others/breakepoints/Before.svelte';
	import ButtonSelector from '$lib/components/others/ButtonSelector.svelte';
	import ButtonToggle from '$lib/components/others/ButtonToggle.svelte';
	import ButtonToggleSmall from '$lib/components/others/ButtonToggleSmall.svelte';
	import DropdownSelector from '$lib/components/others/DropdownSelector.svelte';
	import DropdownSelectorSmall from '$lib/components/others/DropdownSelectorSmall.svelte';
	import { selectedNewOld, selectedOneManyDays, selectedPrevTodayNext, selectedTakeGive } from '$lib/scripts/storage';

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
			<div class="d-flex justify-content-between align-items-center m-1">
				<button class="btn btn-light bg-light text-dark border-0">Заказы</button>
				<div class="d-flex align-items-center">
					<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>
						<i class="fa-solid fa-circle-plus" />
					</button>
					<div class="dropdown">
						<button class="btn btn-light" data-bs-toggle="dropdown"><i class="fa-solid fa-bars" /></button>
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
			</div>
			<div class="d-flex justify-content-between align-items-center bg-light p-2">
				<div class="d-flex flex-wrap align-items-center gap-1 text-center px-1">
					<ButtonToggleSmall titles={['сначала новые', 'сначала старые']} bind:selected={$selectedNewOld} />|
					<ButtonToggleSmall titles={['однодневные', 'многодневные']} bind:selected={$selectedOneManyDays} />|
					<ButtonToggleSmall titles={['забрать', 'доставить']} bind:selected={$selectedTakeGive} />|
					<DropdownSelectorSmall
						titles={['прошлый месяц', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц', 'следующий месяц']}
						bind:selected={$selectedPrevTodayNext} />
				</div>
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
					<h4 class="mx-2 my-0">Заказы</h4>
					<div class="d-flex flex-wrap align-items-center gap-2 text-center px-2">
						<ButtonToggle titles={['сначала новые', 'сначала старые']} bind:selected={$selectedNewOld} />
						<ButtonSelector titles={['однодневные', 'многодневные']} bind:selected={$selectedOneManyDays} />
						<ButtonSelector titles={['забрать', 'доставить']} bind:selected={$selectedTakeGive} />
						<DropdownSelector
							titles={['прошлый месяц', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц', 'следующий месяц']}
							bind:selected={$selectedPrevTodayNext} />
					</div>
					<div>
						<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
					</div>
				</div>
				<div class="px-3">
					<slot />
				</div>
			</div>
		</div>
	</After>
</Auth>
