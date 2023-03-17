<script>
	// @ts-nocheck
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import { onMount } from 'svelte';

	let code = '';

	onMount(() => {
		// window.recaptchaVerifier = new RecaptchaVerifier(
		// 	'recaptcha-container',
		// 	{
		// 		size: 'normal',
		// 		callback: response => {
		// 			// signInWithPhoneNumber(auth, '+79105163686', response).then(r => {
		// 			// 	window.confirmationResult = r;
		// 			// 	console.log(r, response);
		// 			// });
		// 		},
		// 		'expired-callback': () => {
		// 			// Response expired. Ask user to solve reCAPTCHA again.
		// 			// ...
		// 		},
		// 	},
		// 	auth,
		// );
		window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
		let appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, '+79105163686', appVerifier)
			.then(confirmationResult => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				console.log(confirmationResult);
				if (code.length == 6) {
					confirmationResult
						.confirm(code)
						.then(result => {
							// User signed in successfully.
							const user = result.user;
							console.log(user);
							// ...
						})
						.catch(error => {
							// User couldn't sign in (bad verification code?)
							// ...
						});
				}
			})
			.catch(error => {
				// Error; SMS not sent
				// ...
				console.log(error);
			});
	});
</script>

<div class="container">
	<div id="recaptcha-container" />

	<input class="form-control" bind:value={code} />
</div>
