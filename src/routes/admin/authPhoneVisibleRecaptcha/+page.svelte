<script>
	// @ts-nocheck
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import { onMount } from 'svelte';

	let code = '';

	onMount(() => {
		window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
		let appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, '+79105163686', appVerifier)
			.then(confirmationResult => {
				// Отправлено SMS. Предложите пользователю ввести код из сообщения, затем войдите
				//в систему с результатом подтверждения.подтвердите (код).
				window.confirmationResult = confirmationResult;
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
	<button
		on:click={() => {
			window.confirmationResult
				.confirm(code)
				.then(result => {
					// User signed in successfully.
					const user = result.user;
					console.log(user);
				})
				.catch(error => {
					// User couldn't sign in (bad verification code?)
					// ...
				});
		}}>Войти</button>
</div>
