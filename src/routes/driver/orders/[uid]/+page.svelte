<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Order from '$lib/components/admin/Order.svelte';
	import PageTitle from '$lib/components/driver/PageTitle.svelte';
	import { db } from '$lib/scripts/firebase';
	import { orderSelected } from '$lib/scripts/storage';
	import { onValue, ref } from 'firebase/database';
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
	<button class="btn btn-sm btn-dark text-light" on:click={() => goto('/driver/orders')}
		><i class="fa-solid fa-chevron-left me-1" />Назад</button>
</PageTitle>

{#if order.product}
	<Order uid={$page.params.uid} {order} _class="mx-2" />
{/if}
