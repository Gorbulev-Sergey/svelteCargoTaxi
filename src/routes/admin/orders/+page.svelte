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

	$: orders = new Map();
	$: selectedDate = new Date();
	$: ordersFiltered = () => {};

	$: selectedOneManyDays = 0;
	$: ordersOneManyDays = () => {
		switch (selectedOneManyDays) {
			case 0:
				return Object.fromEntries(
					Object.entries(orders).filter(
						([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() == new Date(v.whenGive).toDateString()
					)
				);
			case 1:
				return Object.fromEntries(
					Object.entries(orders).filter(
						([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() != new Date(v.whenGive).toDateString()
					)
				);
		}
	};

	$: selectedTakeGive = 0;
	$: ordersTakeGive = () => {
		switch (selectedTakeGive) {
			case 0:
				return Object.fromEntries(
					Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenTake).toDateString() == selectedDate.toDateString())
				);
			case 1:
				return Object.fromEntries(
					Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenGive).toDateString() == selectedDate.toDateString())
				);
		}
	};

	$: selectedPrevTodayNext = 3;
	$: ordersPrevTodayNext = () => {
		switch (selectedPrevTodayNext) {
			case 0:
				// Прошлый месяц
				return Object.fromEntries(
					Object.entries(ordersTakeGive()).filter(
						([k, v]) => new Date(selectedTakeGive == 0 ? v.whenTake : v.whenGive).getMonth() == new Date().getMonth() - 1
					)
				);
			case 1:
				return ordersOneManyDays();
			case 2:
				// Вчера
				selectedDate.setDate(new Date().getDate()-1);
				return Object.fromEntries(
					Object.entries(ordersTakeGive()).filter(
						([k, v]) => new Date(selectedTakeGive == 0 ? v.whenTake : v.whenGive).getDate() == new Date().getDate() - 1
					)
				);
			case 3:
				// Сегодня
				selectedDate.setDate(new Date().getDate());
				return Object.fromEntries(
					Object.entries(ordersTakeGive()).filter(
						([k, v]) => new Date(selectedTakeGive == 0 ? v.whenTake : v.whenGive).toDateString() == new Date().toDateString()
					)
				);
			case 4:
				// Завтра
				selectedDate.setDate(new Date().getDate()+1);
				return Object.fromEntries(
					Object.entries(ordersTakeGive()).filter(
						([k, v]) => new Date(selectedTakeGive == 0 ? v.whenTake : v.whenGive).getDate() == new Date().getDate() + 1
					)
				);
			case 5:
				return ordersOneManyDays();
			case 6:
				// Этот месяц
				return Object.fromEntries(
					Object.entries(ordersTakeGive()).filter(
						([k, v]) => new Date(selectedTakeGive == 0 ? v.whenTake : v.whenGive).getMonth() == new Date().getMonth()
					)
				);
		}
	};

	onMount(async () => {
		onValue(ref(db, '/orders'), s => {
			if (s.exists()) {
				orders = s.val();
				$ordersCount = Object.keys(orders).length.toString();
			}
		});
	});
</script>

<PageLayout title="Заказы">
	<div class=" text-center" slot="center">
		<ButtonSelector titles={['Однодневные', 'Многодневные']} bind:selected={selectedOneManyDays} />
		<ButtonSelector titles={['забрать', 'доставить']} bind:selected={selectedTakeGive} />
		<ButtonSelector
			titles={['прошлый месяц', 'прошлая неделя', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц']}
			bind:selected={selectedPrevTodayNext} />
	</div>
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
	</div>

	{#each Object.entries(ordersPrevTodayNext())
		.filter(v => v[1].product)
		.sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)) as [uid, order], i}
		<Order i={Object.keys(ordersPrevTodayNext()).length - i} {uid} {order}>
			<div slot="nav" class="d-flex gap-1 flex-column">
				<button class="btn btn-sm btn-light text-dark" title="редактировать" on:click={() => goto(`/admin/orders/edit/${uid}`)}>
					<i class="fa-regular fa-pen-to-square" />
				</button>
				<ConfirmDialog title="Удалить этот заказ?" onDelete={async () => remove(ref(db, `/orders/${uid}`))} />
			</div>
		</Order>
	{/each}
</PageLayout>
