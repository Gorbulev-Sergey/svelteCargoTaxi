<script>
	// @ts-nocheck
	import ButtonSelector from '$lib/components/others/ButtonSelector.svelte';
	import { goto } from '$app/navigation';
	import Order from '$lib/components/admin/Order.svelte';
	import ConfirmDialog from '$lib/components/others/ConfirmDelete.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { Order as _Order } from '$lib/models/Order';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref, remove } from 'firebase/database';
	import { onMount } from 'svelte';
	import { ordersCount } from '$lib/scripts/storage';

	let orders = new Map();
	$: ordersFiltered = new Map();

	$: selectedMachDays = 0;
	$: filterByMachDays = () => {
		if (selectedMachDays == 0)
			ordersFiltered = Object.fromEntries(
				Object.entries(orders).filter(
					([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() == new Date(v.whenGive).toDateString()
				)
			);
		else
			ordersFiltered = Object.fromEntries(
				Object.entries(orders).filter(
					([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() != new Date(v.whenGive).toDateString()
				)
			);
	};

	onMount(async () => {
		onValue(ref(db, '/orders'), s => {
			if (s.exists()) {
				orders = s.val();
				filterByMachDays();
				$ordersCount = Object.keys(orders).length.toString();
			}
		});
	});
</script>

<PageLayout title="Заказы">
	<div class=" text-center" slot="center">
		<ButtonSelector
			titles={['Однодневные', 'Многодневные']}
			bind:selected={selectedMachDays}
			onSelected={() => {
				filterByMachDays();
				console.log(orders);
				console.log(ordersFiltered);
			}} />
		<ButtonSelector titles={['Прошлый месяц', 'Прошлая неделя', 'Вчера', 'Сегодня', 'Завтра', 'Эта неделя', 'Этот месяц']} selected={3} />
	</div>
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
	</div>

	{#each Object.entries(ordersFiltered)
		.filter(v => v[1].product)
		.sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)) as [uid, order], i}
		<Order i={Object.keys(ordersFiltered).length - i} {uid} {order}>
			<div slot="nav" class="d-flex gap-1 flex-column">
				<button class="btn btn-sm btn-light text-dark" title="редактировать" on:click={() => goto(`/admin/orders/edit/${uid}`)}>
					<i class="fa-regular fa-pen-to-square" />
				</button>
				<ConfirmDialog title="Удалить этот заказ?" onDelete={async () => remove(ref(db, `/orders/${uid}`))} />
			</div>
		</Order>
	{/each}
</PageLayout>
