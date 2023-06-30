<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Layout from '$lib/components/admin/Layout/Layout.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref, update } from 'firebase/database';
	import { onMount } from 'svelte';

	let driver = {};

	onMount(async () => {
		onValue(ref(db, `/drivers/${$page.params.uid}`), s => {
			if (s.exists()) driver = s.val();
		});
	});
</script>

<Layout pageTitle="Редактировать водителя">
	<div slot="nav">
		<div class="d-flex align-items-center">
			<button class="btn btn-light text-dark me-1" on:click={() => goto('/admin/drivers')}>Отмена</button>
			<button
				class="btn btn-dark text-light"
				on:click={async () => {
					update(ref(db, `/drivers/${$page.params.uid}`), driver);
					goto('/admin/drivers');
				}}>Сохранить</button>
		</div>
	</div>

	<div class="mx-2 mx-sm-0">
		<div>ФИО:</div>
		<input class="form-control mb-2" bind:value={driver.name} />

		<div>Телефон:</div>
		<input class="form-control" bind:value={driver.phone} />
	</div>
</Layout>
