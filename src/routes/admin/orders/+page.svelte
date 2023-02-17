<script>
	import { goto } from '$app/navigation';
	import Order from '$lib/components/admin/Order.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { Order as _Order } from '$lib/models/Order';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';

	let orders = new Map();

	onMount(async () => {
		onValue(ref(db, '/orders'), s => {
			if (s.exists()) {
				orders = s.val();
			}
		});
	});
</script>

<PageLayout title="Заказы">
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders/create')}>Создать</button>
	</div>

	{#each Object.entries(orders) as [uid, order], i}
		<Order i={(i + 1).toString()} {uid} {order} />
	{/each}
</PageLayout>
