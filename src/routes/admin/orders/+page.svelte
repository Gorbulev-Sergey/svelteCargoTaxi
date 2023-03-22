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
	import DropdownSelector from '$lib/components/others/DropdownSelector.svelte';

	$: orders = new Map();
	Date.prototype.getWeek = function () {
		let date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
		let week1 = new Date(date.getFullYear(), 0, 4);
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
	};

	let hasWeek = false;
	let hasDate = true;
	let selectedDate = new Date();

	$: selectedOneManyDays = 0;
	$: selectedPrevTodayNext = 2;
	$: selectedTakeGive = 0;
	$: selectedNewOld = 0;
	$: ordersOneManyDays = () => {
		let ordersSorted = Object.assign(orders);
		switch (selectedNewOld) {
			case 0:
				ordersSorted = Object.fromEntries(
					Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)),
				);
				break;
			case 1:
				ordersSorted = Object.fromEntries(
					Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v1.created) - new Date(v2.created)),
				);
				break;
		}
		switch (selectedOneManyDays) {
			case 0:
				return Object.fromEntries(
					Object.entries(ordersSorted).filter(
						([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() == new Date(v.whenGive).toDateString(),
					),
				);
			case 1:
				return Object.fromEntries(
					Object.entries(ordersSorted).filter(
						([k, v]) => v.whenTake && v.whenGive && new Date(v.whenTake).toDateString() != new Date(v.whenGive).toDateString(),
					),
				);
		}
	};

	$: ordersFiltered = () => {
		switch (selectedPrevTodayNext) {
			case 0:
				// Прошлый месяц
				selectedDate.setMonth(new Date().getMonth() - 1);
				hasWeek = false;
				hasDate = false;
				break;
			case 1:
				// Вчера
				selectedDate.setMonth(new Date().getMonth());
				selectedDate.setDate(new Date().getDate() - 1);
				hasWeek = false;
				hasDate = true;
				break;
			case 2:
				// Сегодня
				selectedDate.setMonth(new Date().getMonth());
				selectedDate.setDate(new Date().getDate());
				hasWeek = false;
				hasDate = true;
				break;
			case 3:
				// Завтра
				selectedDate.setMonth(new Date().getMonth());
				selectedDate.setDate(new Date().getDate() + 1);
				hasWeek = false;
				hasDate = true;
				break;
			case 4:
				// Эта неделя
				hasWeek = true;
				hasDate = false;
				break;
			case 5:
				// Этот месяц
				selectedDate.setMonth(new Date().getMonth());
				hasWeek = false;
				hasDate = false;
				break;
			case 6:
				// Следующий месяц
				selectedDate.setMonth(new Date().getMonth() + 1);
				hasWeek = false;
				hasDate = false;
				break;
		}
		switch (selectedTakeGive) {
			case 0:
				if (hasWeek) {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenTake).getWeek() == new Date().getWeek()),
					);
				}
				switch (hasDate) {
					case true:
						return Object.fromEntries(
							Object.entries(ordersOneManyDays()).filter(
								([k, v]) => new Date(v.whenTake).toDateString() == selectedDate.toDateString(),
							),
						);
					case false:
						return Object.fromEntries(
							Object.entries(ordersOneManyDays()).filter(
								([k, v]) =>
									new Date(v.whenTake).getFullYear() == selectedDate.getFullYear() &&
									new Date(v.whenTake).getMonth() == selectedDate.getMonth(),
							),
						);
				}
			case 1:
				if (hasWeek) {
					return Object.fromEntries(
						Object.entries(ordersOneManyDays()).filter(([k, v]) => new Date(v.whenGive).getWeek() == new Date().getWeek()),
					);
				}
				switch (hasDate) {
					case true:
						return Object.fromEntries(
							Object.entries(ordersOneManyDays()).filter(
								([k, v]) => new Date(v.whenGive).toDateString() == selectedDate.toDateString(),
							),
						);
					case false:
						return Object.fromEntries(
							Object.entries(ordersOneManyDays()).filter(
								([k, v]) =>
									new Date(v.whenGive).getFullYear() == selectedDate.getFullYear() &&
									new Date(v.whenGive).getMonth() == selectedDate.getMonth(),
							),
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
	<div class="d-flex flex-wrap align-items-center gap-2 text-center px-2" slot="center">
		<ButtonSelector titles={['Однодневные', 'Многодневные']} bind:selected={selectedOneManyDays} />
		<ButtonSelector titles={['забрать', 'доставить']} bind:selected={selectedTakeGive} />
		<DropdownSelector
			titles={['прошлый месяц', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц', 'следующий месяц']}
			bind:selected={selectedPrevTodayNext} />
		<DropdownSelector titles={['сначала новые', 'сначала старые']} bind:selected={selectedNewOld} />
	</div>
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
	</div>

	{#each Object.entries(ordersFiltered()).filter(v => v[1].product) as [uid, order], i}
		<Order i={Object.keys(ordersFiltered()).length - i} {uid} {order}>
			<div slot="nav" class="d-flex gap-1 flex-column">
				<button class="btn btn-sm btn-light text-dark" title="редактировать" on:click={() => goto(`/admin/orders/edit/${uid}`)}>
					<i class="fa-regular fa-pen-to-square" />
				</button>
				<ConfirmDialog title="Удалить этот заказ?" onDelete={async () => remove(ref(db, `/orders/${uid}`))} />
			</div>
		</Order>
	{/each}
</PageLayout>
