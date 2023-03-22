<script>
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { auth } from '$lib/scripts/firebase';
	import { onAuthStateChanged, PhoneAuthProvider, RecaptchaVerifier, updatePhoneNumber, updateProfile } from 'firebase/auth';

	let phoneNumber = '+79105163686';
	let code = '';

	let x = PageTitle;

	// onAuthStateChanged(auth, async user => {
	// 	console.log(user);
	// 	// if (user) {
	// 	// 	const applicationVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
	// 	// 	const provider = new PhoneAuthProvider(auth);
	// 	// 	if (phoneNumber.length == 12) {
	// 	// 		const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
	// 	// 		// Obtain the verificationCode from the user.
	// 	// 		if (code.length == 6) {
	// 	// 			const phoneCredential = PhoneAuthProvider.credential(verificationId, code);
	// 	// 			await updatePhoneNumber(user, phoneCredential);
	// 	// 		}
	// 	// 	}
	// 	// }
	// });
</script>

<!-- <div id="recaptcha-container" />

<input class="form-control" bind:value={phoneNumber} placeholder="номер телефона" />
<input class="form-control" bind:value={code} placeholder="код из смс" /> -->

<svelte:component this={x} />
