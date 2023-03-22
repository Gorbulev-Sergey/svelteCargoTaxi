<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { onMount } from 'svelte';

	export let signInUrl = '/admin/authPhone';
	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			if (auth) {
				isSignIn = true;
			} else {
				isSignIn = false;
				goto(signInUrl);
			}
		});
	});
</script>

{#if isSignIn}
	<slot />
{/if}
