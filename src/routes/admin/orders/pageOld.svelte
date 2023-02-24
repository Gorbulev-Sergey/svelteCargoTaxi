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

	class SelectedDate {
		constructor(year = new Date().getFullYear(), month = new Date().getMonth(), day = null) {
			this.year = year;
			this.month = month;
			this.day = day;
		}
		toDateString() {
			let date = new Date(this.year, this.month);
			if (this.day) date.setDate(this.day);
			return date.toDateString();
		}
	}

	let orders = new Map();

	let selectedDate = new SelectedDate();
	$: selectedOneManyDays = 0;
	$: selectedPrevTodayNext = 3;
	$: selectedTakeGive = 0;
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

	$: ordersFiltered = () => {
		switch (selectedPrevTodayNext) {
			case 0:
				// Прошлый месяц
				selectedDate = new SelectedDate(new Date().getFullYear(), new Date().getMonth() - 1);
				break;
			case 1:
				selectedDate = new SelectedDate(new Date().getFullYear(), new Date().getMonth());
				break;
			case 2:
				// Вчера
				selectedDate = new SelectedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
				break;
			case 3:
				// Сегодня
				selectedDate = new SelectedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
				break;
			case 4:
				// Завтра
				selectedDate = new SelectedDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
				break;
			case 5:
				selectedDate = new SelectedDate();
				break;
			case 6:
				// Этот месяц
				selectedDate = new SelectedDate();
				break;
		}
		switch (selectedTakeGive) {
			case 0:
				if (selectedDate.day) {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenTake).toDateString() == selectedDate.toDateString())
					);
				} else {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(
							([k, v]) => new Date(v.whenTake).getFullYear() === selectedDate.year && new Date(v.whenTake).getMonth() === selectedDate.month
						)
					);
				}
			case 1:
				if (selectedDate.day) {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenGive).toDateString() == selectedDate.toDateString())
					);
				} else {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(
							([k, v]) => new Date(v.whenGive).getFullYear() == selectedDate.year && new Date(v.whenGive).getMonth() == selectedDate.month
						)
					);
				}
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
	<div class="text-center" slot="center">
		<ButtonSelector titles={['Однодневные', 'Многодневные']} bind:selected={selectedOneManyDays} />
		<ButtonSelector titles={['забрать', 'доставить']} bind:selected={selectedTakeGive} />
		<ButtonSelector
			titles={['прошлый месяц', 'прошлая неделя', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц']}
			bind:selected={selectedPrevTodayNext} />
	</div>
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
	</div>

	{#each Object.entries(ordersOneManyDays())
		.filter(v => v[1].product)
		.sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)) as [uid, order], i}
		<Order i={Object.keys(ordersOneManyDays()).length - i} {uid} {order}>
			<div slot="nav" class="d-flex gap-1 flex-column">
				<button class="btn btn-sm btn-light text-dark" title="редактировать" on:click={() => goto(`/admin/orders/edit/${uid}`)}>
					<i class="fa-regular fa-pen-to-square" />
				</button>
				<ConfirmDialog title="Удалить этот заказ?" onDelete={async () => remove(ref(db, `/orders/${uid}`))} />
			</div>
		</Order>
	{/each}
</PageLayout>
