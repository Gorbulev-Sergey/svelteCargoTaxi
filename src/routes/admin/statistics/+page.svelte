<script>
	import { goto } from '$app/navigation';
	import Layout from '$lib/components/admin/Layout/Layout.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	let drivers = {};
	let orders = {};
	onMount(async () => {
		onValue(ref(db, '/drivers'), s => {
			if (s.exists()) drivers = s.val();
		});
		onValue(ref(db, '/orders'), s => {
			if (s.exists()) orders = s.val();
		});
	});
</script>

<Layout pageTitle="Статистика">
	<div class=" bg-light rounded p-3">
		<div class="d-flex align-items-center justify-content-between gap-3 border-bottom pb-2 mb-2">
			<div class="badge bg-dark text-light">Водитель</div>
			<div class="d-flex align-items-center gap-3">
				<div class="text-end" style="width: 7em;">
					<div class="badge bg-dark text-light">Всего заказов</div>
				</div>
				<div class="text-end" style="width: 7em;">
					<div class="badge bg-dark text-light">Завершённых</div>
				</div>
			</div>
		</div>
		{#each Object.entries(drivers) as [uid, driver]}
			<div class="d-flex align-items-center justify-content-between gap-3 mb-1">
				<div class="ps-1">{driver.name}</div>
				<div class="d-flex align-items-center gap-3">
					<div class="text-end pe-1" style="width: 7em;">{Object.values(orders).filter(o => o.driver == uid).length}</div>
					<div class="text-end pe-1" style="width: 7em;">
						{Object.values(orders).filter(o => o.driver == uid && o.status == 'завершён').length}
					</div>
				</div>
			</div>
		{/each}
	</div>
</Layout>
