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
	import { page } from '$app/stores';

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

<div class="" style="margin-bottom:4.5em">
	{#each Object.entries(orders) as [uid, order], i}
		<Order
			i={(i + 1).toString()}
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
