<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { returnUrl as returnToUrl, user } from '$lib/scripts/storage';
	import { onMount } from 'svelte';

	export let returnUrl = '/';
	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			$returnToUrl = returnUrl;
			if (auth) {
				isSignIn = true;
				$user = auth;
			} else {
				isSignIn = false;
				goto('/others/auth/authPhone');
			}
		});
	});
</script>

{#if isSignIn}
	<slot />
{/if}
