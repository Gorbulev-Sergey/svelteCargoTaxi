<script>
	// @ts-nocheck
	import Order from '$lib/components/driver/Order.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { orderSelected } from '$lib/scripts/storage';
	import PageTitle from '$lib/components/driver/PageTitle.svelte';
	import ButtonToggle from '$lib/components/others/ButtonToggle.svelte';

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
	<div class="d-flex flex-wrap gap-1">
		<ButtonToggle titles={['Однодневные', 'Многодневные']} />
		<ButtonToggle
			titles={['Сначала новые', 'Сначала старые']}
			onSelected={t => {
				switch (t) {
					case false:
						orders = Object.fromEntries(
							Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v2.created) - new Date(v1.created)),
						);
						break;
					case true:
						orders = Object.fromEntries(
							Object.entries(orders).sort(([k1, v1], [k2, v2]) => new Date(v1.created) - new Date(v2.created)),
						);
						break;
				}
			}} />
	</div>
</PageTitle>

<div class="container-fluid" style="margin-bottom:4.5em">
	{#each Object.entries(orders) as [uid, order], i}
		<Order
			i={(i + 1).toString()}
			{uid}
			{order}
			_style="cursor:pointer"
			on:click={() => {
				$orderSelected = order;
				goto(`/driver/orders/${uid}`);
			}} />
	{/each}
</div>
