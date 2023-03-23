<script>
	// @ts-nocheck
	import Order from '$lib/components/admin/Order.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	import ButtonSelector from '$lib/components/others/ButtonSelector.svelte';
	import { goto } from '$app/navigation';
	import { orderSelected } from '$lib/scripts/storage';

	let orders = new Object();
	onMount(async () => {
		onValue(ref(db, '/orders'), r => {
			if (r.exists()) {
				orders = r.val();
			}
		});
	});
</script>

<div class="position-sticky sticky-top px-3 py-2 mb-3 bg-light">
	<div class="d-flex flex-wrap gap-1">
		<ButtonSelector titles={['Однодневные', 'Многодневные']} />
		<ButtonSelector
			titles={['Сначала новые', 'Сначала старые']}
			onSelected={t => {
				switch (t) {
					case 0:
						orders = Object.fromEntries(
							Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)),
						);
						break;
					case 1:
						orders = Object.fromEntries(
							Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v1.created) - new Date(v2.created)),
						);
						break;
				}
			}} />
	</div>
</div>

<div class="container-fluid" style="margin-bottom:4.5em">
	{#each Object.entries(orders) as [uid, order], i}
		<Order
			i={(i + 1).toString()}
			{uid}
			{order}
			on:click={() => {
				$orderSelected = order;
				goto(`/driver/orders/${uid}`);
			}} />
	{/each}
</div>
