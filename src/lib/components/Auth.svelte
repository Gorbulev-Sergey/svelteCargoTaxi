<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { returnUrl } from '$lib/scripts/storage';
	import { onMount } from 'svelte';

	export let returnToUrl = $returnUrl;
	let isSignIn = false;

	onMount(async () => {
		auth.onAuthStateChanged(auth => {
			$returnUrl = returnToUrl;
			if (auth) {
				isSignIn = true;
				goto($returnUrl);
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
