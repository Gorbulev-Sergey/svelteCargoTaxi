<script>
	import { goto } from '$app/navigation';
	import Layout from '$lib/components/admin/Layout/Layout.svelte';
	import { db } from '$lib/scripts/firebase';
	import { onValue, ref } from 'firebase/database';
	import { onMount } from 'svelte';
	let drivers = new Object();
	onMount(async () => {
		onValue(ref(db, '/drivers'), s => {
			if (s.exists()) drivers = s.val();
		});
	});
</script>

<Layout pageTitle="Водители">
	<div class="mx-2 mx-sm-0">
		<div class="d-flex justify-content-between align-items-center p-1">
			<div class="d-flex align-items-center">
				<div class="badge bg-transparent text-light me-2">0</div>
				<div class="badge bg-dark text-light">ФИО</div>
			</div>
			<div class="badge bg-dark text-light me-2">Телефон</div>
		</div>
		{#each Object.entries(drivers).sort((v1, v2) => v2[1].name - v1[1].name) as [uid, driver], i}
			<div class="d-flex justify-content-between align-items-center text-dark border-bottom px-1 py-2 mb-1">
				<div class="d-flex align-items-center">
					<div class="badge bg-dark bg-opacity-25 text-light me-2">{i + 1}</div>
					{driver.name}
				</div>
				<div class="d-flex align-items-center">
					<a class="text-dark text-decoration-none fw-bold" href="tel:{driver.phone}">
						{driver.phone}
					</a>
					<button
						class="btn btn-sm btn-light text-warning ms-1"
						title="редактировать"
						on:click={() => {
							goto(`drivers/edit/${uid}`);
						}}>
						<i class="fa-regular fa-pen-to-square" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</Layout>
