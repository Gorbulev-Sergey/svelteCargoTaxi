<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { auth } from '$lib/scripts/firebase';
	import { returnUrl as returnToUrl } from '$lib/scripts/storage';
	import { onMount } from 'svelte';

	export let returnUrl = '/';
	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			$returnToUrl = returnUrl;
			if (auth) {
				isSignIn = true;
			} else {
				isSignIn = false;
				goto('/admin/authPhone');
			}
		});
	});
</script>

{#if isSignIn}
	<slot />
{/if}
