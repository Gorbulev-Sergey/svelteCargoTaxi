<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { onMount } from 'svelte';

	let provider = new GoogleAuthProvider();
	onMount(() => {
		signInWithPopup(auth, provider).then(r => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(r);
			const token = credential?.accessToken;
			const user = r.user;
			console.log(credential, token, user);
			goto('/admin/orders');
		});
	});
</script>
