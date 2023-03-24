import { Order } from '$lib/models/Order';
import { writable } from 'svelte/store';

// Количество заказов и водителей
export let ordersCount = writable('0');
export let driversCount = writable('0');

// Выбранный заказ
export let orderSelected = writable(new Order());
