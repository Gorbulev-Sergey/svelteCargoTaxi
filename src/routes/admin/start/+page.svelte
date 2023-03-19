<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';

	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			if (auth) {
				isSignIn = true;
			} else {
				isSignIn = false;
				goto('/admin/authPhone');
			}
			console.log(isSignIn);
		});
	});
</script>

<button class="btn btn-light" on:click={() => auth.signOut()}>Выйти</button>
