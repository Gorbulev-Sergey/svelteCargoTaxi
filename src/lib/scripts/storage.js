import { Order } from '$lib/models/Order';
import { writable } from 'svelte/store';

export let ordersCount = writable('0');
export let orderSelected = writable(new Order());
