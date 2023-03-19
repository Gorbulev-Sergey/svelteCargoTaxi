<script>
	// @ts-nocheck
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { text } from 'svelte/internal';

	let code = '';
	let phoneNumber = '';

	onMount(() => {
		// // невидимая reCaptcha
		// window.recaptchaVerifier = new RecaptchaVerifier(
		// 	'sign-in-button',
		// 	{
		// 		size: 'invisible',
		// 		callback: response => {
		// 			// reCAPTCHA solved, allow signInWithPhoneNumber.
		// 		},
		// 	},
		// 	auth,
		// );
		// let appVerifier = window.recaptchaVerifier;
		// signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		// .then(confirmationResult => {
		// 	// Отправлено SMS. Предложите пользователю ввести код из сообщения, затем войдите
		// 	//в систему с результатом подтверждения.подтвердите (код).
		// 	window.confirmationResult = confirmationResult;
		// })
		// .catch(error => {
		// 	// Error; SMS not sent
		// 	// ...
		// 	console.log(error);
		// });
	});
</script>

<div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
	<div class="bg-light p-3 rounded text-center">
		<h4 class="mb-3">Регистрация/Вход для водителей</h4>
		<input class="form-control mb-2" placeholder="Ваше имя" />
		<div class="input-group mb-2">
			<span class="input-group-text">+7</span>
			<input
				type="phoneNumber"
				maxlength="10"
				class="form-control"
				style="min-width:14em;"
				bind:value={phoneNumber}
				placeholder="Введите номер телефона" />
			<button
				id="sign-in-button"
				class="btn btn-dark text-light"
				on:click={() => {
					if (phoneNumber.length == 10) {
						// невидимая reCaptcha
						window.recaptchaVerifier = new RecaptchaVerifier(
							'sign-in-button',
							{
								size: 'invisible',
								callback: response => {
									// reCAPTCHA solved, allow signInWithPhoneNumber.
								},
							},
							auth,
						);
						let appVerifier = window.recaptchaVerifier;
						signInWithPhoneNumber(auth, `+7${phoneNumber}`, appVerifier)
							.then(confirmationResult => {
								// Отправлено SMS. Предложите пользователю ввести код из сообщения, затем войдите
								//в систему с результатом подтверждения.подтвердите (код).
								window.confirmationResult = confirmationResult;
							})
							.catch(error => {
								// Error; SMS not sent
								console.log(error);
							});
					}
				}}>Получить смс с кодом</button>
		</div>
		<div class="input-group">
			<input class="form-control" placeholder="Введите полученный код" />
		</div>
	</div>
</div>
