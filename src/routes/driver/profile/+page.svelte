<script>
	import Auth from '$lib/components/Auth.svelte';
	import PageTitle from '$lib/components/driver/PageTitle.svelte';
	import { auth } from '$lib/scripts/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	/**
	 * @type {import("@firebase/auth").User}
	 */
	let user;

	onMount(async () => {
		onAuthStateChanged(auth, v => {
			if (v) user = v;
		});
	});
</script>

<PageTitle>Мой профиль</PageTitle>

<Auth>
	<div class="rounded mx-3">
		{#if user.photoURL}
			<img class="w-25" src={user.photoURL} alt="" />
		{/if}
		<div>имя: <b>{user.displayName}</b></div>
		<div>телефон: <b>{user.phoneNumber}</b></div>
		{#if user.email}
			<div>email: <b>{user.email}</b></div>
		{/if}
	</div>
</Auth>
