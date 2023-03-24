import { Order } from '$lib/models/Order';
import { writable } from 'svelte/store';

export let user = writable();

// Количество заказов и водителей
export let ordersCount = writable('0');
export let driversCount = writable('0');

// Выбранный заказ
export let orderSelected = writable(new Order());

// Url для возврата
export let returnUrl = writable('/');
