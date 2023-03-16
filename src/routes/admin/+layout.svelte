<script>
	import { goto } from '$app/navigation';
	import { ordersCount } from '$lib/scripts/storage';

	let sidbarWidth = '14em';
	$: menu = [
		{ title: 'Заказы', url: '/admin/orders', pin: $ordersCount },
		{ title: 'Водители', url: '', pin: '20' },
		{ title: 'Автомобили', url: '', pin: '12' },
		{ title: 'Статистика', url: '', pin: '' }
	];
</script>

<div class="d-flex">
	<div class="fixed-top bg-light" style="width:{sidbarWidth}; height: 100vh;">
		<img class="w-100" src="https://sun9-68.userapi.com/JMNL26HgHKZeSqtog_oujmPQwE1glD6Njf02_g/mdS7yp5Eq9o.jpg" alt="" />
		<div class="mt-4">
			{#each menu as item}
				<button class="btn btn-light text-dark rounded-0 mb-1 text-start w-100" on:click={() => goto(item.url)}>
					<div class="d-flex justify-content-between align-items-end">
						{item.title}
						{#if item.pin != ''}
							<div class="badge bg-dark">{item.pin}</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex-grow-1" style="margin-left: {sidbarWidth};">
		<slot />
	</div>
</div>
