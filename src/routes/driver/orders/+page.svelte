<script>
	// @ts-nocheck
	import Order from '$lib/components/driver/Order.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref, update } from 'firebase/database';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { orderSelected, user } from '$lib/scripts/storage';
	import PageTitle from '$lib/components/driver/PageTitle.svelte';
	import ButtonToggle from '$lib/components/others/ButtonToggle.svelte';
	import {
		selectedNewOldDriver as selectedNewOld,
		selectedPrevTodayNextDriver as selectedPrevTodayNext,
		selectedTakeGiveDriver as selectedTakeGive,
		selectedOneManyDaysDriver as selectedOneManyDays,
	} from '$lib/scripts/storage';
	import DropdownSelector from '$lib/components/others/DropdownSelector.svelte';
	import ButtonToggleSmall from '$lib/components/others/ButtonToggleSmall.svelte';
	import DropdownSelectorSmall from '$lib/components/others/DropdownSelectorSmall.svelte';

	Date.prototype.getWeek = function () {
		let date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
		let week1 = new Date(date.getFullYear(), 0, 4);
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
	};

	$: orders = new Object();

	let hasWeek = false;
	let hasDate = true;
	let selectedDate = new Date();

	$: iForOrders = (/** @type {number} */ i) => ($selectedNewOld == 0 ? Object.keys(ordersFiltered()).length - i : i + 1);

	$: ordersOneManyDays = () => {
		let ordersSorted = Object.fromEntries(Object.entries(orders).filter(o => o[1].driver == $user));
		switch ($selectedNewOld) {
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
		switch ($selectedOneManyDays) {
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
		switch ($selectedPrevTodayNext) {
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
		switch ($selectedTakeGive) {
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

	let orders = new Object();
	onMount(async () => {
		onValue(ref(db, '/orders'), r => {
			if (r.exists()) {
				orders = r.val();
			}
		});
	});
</script>

<PageTitle>
	<div class="d-flex justify-content-center align-items-center gap-1 py-1">
		<ButtonToggleSmall titles={['сначала новые', 'сначала старые']} bind:selected={$selectedNewOld} />
		<ButtonToggleSmall titles={['однодневные', 'многодневные']} bind:selected={$selectedOneManyDays} />
		<ButtonToggleSmall titles={['забрать', 'доставить']} bind:selected={$selectedTakeGive} />
		<DropdownSelectorSmall
			isLast={true}
			titles={['прошлый месяц', 'вчера', 'сегодня', 'завтра', 'эта неделя', 'этот месяц', 'следующий месяц']}
			bind:selected={$selectedPrevTodayNext} />
	</div>
</PageTitle>

<div style="margin-bottom: 6em;">
	{#each Object.entries(ordersFiltered()).filter(v => v[1].product) as [uid, order], i}
		<Order
			i={iForOrders(i)}
			{uid}
			{order}
			_class="bg-light text-dark"
			_style="cursor:pointer"
			on:click={() => {
				$orderSelected = order;
				goto(`/driver/orders/${uid}`);
			}}>
			<div class="d-flex justify-content-end">
				<div class="mb-2">
					{#if !order.status}
						<button
							class="btn btn-sm btn-dark text-light"
							on:click|stopPropagation={async () => {
								order.driver = $user.uid;
								order.status = 'взят';
								update(ref(db, '/orders/' + uid), order);
							}}>Взять</button>
					{/if}
					{#if order.status == 'взят' && $user.uid == order.driver}
						<button
							class="btn btn-sm btn-dark text-light"
							on:click|stopPropagation={async () => {
								order.status = 'едет';
								update(ref(db, '/orders/' + uid), order);
							}}>Везти</button>
					{/if}
					{#if order.status == 'едет' && $user.uid == order.driver}
						<button
							class="btn btn-sm btn-success text-light"
							on:click|stopPropagation={async () => {
								order.status = 'завершён';
								update(ref(db, '/orders/' + uid), order);
							}}>Завершить</button>
					{/if}
				</div>
			</div>
		</Order>
	{/each}
</div>
