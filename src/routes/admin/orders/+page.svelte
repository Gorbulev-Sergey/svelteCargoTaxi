<script>
	import { goto } from '$app/navigation';
	import Order from '$lib/components/admin/Order.svelte';
	import ConfirmDialog from '$lib/components/others/ConfirmDelete.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { Order as _Order } from '$lib/models/Order';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref, remove } from 'firebase/database';
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
		{#if order.product}
			<Order i={(i + 1).toString()} {uid} {order}>
				<div class="d-flex gap-1 flex-column" slot="nav">
					<button class="btn btn-sm btn-light text-dark" title="редактировать" on:click={() => goto(`/admin/orders/edit/${uid}`)}>
						<i class="fa-regular fa-pen-to-square" />
					</button>
					<ConfirmDialog
						title="Удалить этот заказ?"
						onDelete={() => {
							remove(ref(db, `/orders/${uid}`));
						}} />
				</div>
			</Order>
		{/if}
	{/each}
</PageLayout>
