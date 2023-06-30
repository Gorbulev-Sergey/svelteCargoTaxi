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

<Layout pageTitle="Редактировать данные водителя">
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
	<div class="input-group mb-3">
		<div class="input-group-text">ФИО</div>
		<input class="form-control" bind:value={driver.name} />
	</div>
	<div class="input-group mb-3">
		<div class="input-group-text">Телефон</div>
		<input class="form-control" bind:value={driver.phone} />
	</div>
</Layout>
