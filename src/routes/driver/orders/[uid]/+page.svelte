<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Order from '$lib/components/driver/Order.svelte';
	import PageTitle from '$lib/components/driver/PageTitle.svelte';
	import { auth, db } from '$lib/scripts/firebase';
	import { orderSelected, user } from '$lib/scripts/storage';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onValue, ref, update } from 'firebase/database';
	import { onMount } from 'svelte';

	export let order = $orderSelected;

	onMount(async () => {
		if (!order.product) {
			onValue(ref(db, '/orders/' + $page.params.uid), r => {
				if (r.exists()) order = r.val();
			});
		}
	});
</script>

<PageTitle>
	<button class="btn btn-sm btn-dark text-light" on:click={() => goto('/driver/orders#' + $page.params.uid)}
		><i class="fa-solid fa-chevron-left me-1" />Назад</button>
</PageTitle>

{#if order.product && $user}
	<Order uid={$page.params.uid} {order} _class="mx-2">
		<div class="mb-2">
			{#if !order.status}
				<button
					class="btn btn-dark text-light"
					on:click={async () => {
						order.driver = $user.uid;
						order.status = 'взят';
						update(ref(db, '/orders/' + $page.params.uid), order);
						goto('/driver/orders');
					}}>Взять заказ</button>
			{/if}
			{#if order.status == 'взят' && $user.uid == order.driver}
				<button
					class="btn btn-dark text-light"
					on:click={async () => {
						order.status = 'едет';
						update(ref(db, '/orders/' + $page.params.uid), order);
						goto('/driver/orders');
					}}>Везти заказ</button>
			{/if}
			{#if order.status == 'едет' && $user.uid == order.driver}
				<button
					class="btn btn-success text-light"
					on:click={async () => {
						order.status = 'завершён';
						update(ref(db, '/orders/' + $page.params.uid), order);
						goto('/driver/orders');
					}}>Завершить заказ</button>
			{/if}
		</div>
	</Order>
{/if}
