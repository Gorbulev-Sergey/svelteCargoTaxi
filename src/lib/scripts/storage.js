// @ts-nocheck
import { Order } from '$lib/models/Order';
import { writable } from 'svelte/store';

export let user = writable();

// Количество заказов и водителей
export let ordersCount = writable(0);
export let driversCount = writable(0);

// Выбранный заказ
export let orderSelected = writable(new Order());

// Url для возврата
export let returnUrl = writable('/');

// Страница заказы (раздел администратора)
export let selectedNewOld = writable(0);
export let selectedPrevTodayNext = writable(2);
export let selectedOneManyDays = writable(0);
export let selectedTakeGive = writable(0);

// Страница заказы (раздел водителя)
export let selectedNewOldDriver = writable(0);
export let selectedPrevTodayNextDriver = writable(2);
export let selectedOneManyDaysDriver = writable(0);
export let selectedTakeGiveDriver = writable(0);
export let selectedAllMy = writable(0);
