<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { returnUrl } from '$lib/scripts/storage';
	import { onMount } from 'svelte';

	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			if (auth) {
				isSignIn = true;
			} else {
				isSignIn = false;
				goto($returnUrl);
			}
		});
	});
</script>

{#if isSignIn}
	<slot />
{/if}
