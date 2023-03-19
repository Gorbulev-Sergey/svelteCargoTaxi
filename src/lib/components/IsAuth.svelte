<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';

	let isSignIn = false;
	export let loginUrl = '/admin/authPhone';

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			if (auth) {
				isSignIn = true;
			} else {
				isSignIn = false;
				goto(loginUrl);
			}
		});
	});
</script>

{#if isSignIn}
	<slot />
{/if}
