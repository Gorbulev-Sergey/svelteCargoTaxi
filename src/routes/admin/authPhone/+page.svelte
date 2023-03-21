<script>
	// @ts-nocheck
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { text } from 'svelte/internal';

	let code = '';
	let userName = '';
	let phoneNumber = '';
	let showPhoneNumber = false;
	let showButton = false;

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
		<div class="mb-3">
			<h5 class="mb-1">Добро пожаловать в наше приложение!</h5>
			<small class="text-muted">Введите регистрационные данные.</small>
		</div>
		<input
			class="form-control mb-2"
			placeholder="Ваше имя (или логин)"
			bind:value={userName}
			on:input={() => (userName.length > 1 ? (showPhoneNumber = true) : (showPhoneNumber = false))} />
		<div class="input-group mb-2">
			<span class="input-group-text">+7</span>
			<input
				type="tel"
				maxlength="10"
				class="form-control"
				bind:value={phoneNumber}
				on:keypress={e => {
					if (isNaN(e.key)) {
						e.preventDefault();
					}
				}}
				on:input={() => (phoneNumber.length == 10 ? (showButton = true) : (showButton = false))}
				placeholder="Номер телефона" />
		</div>
		<button
			id="sign-in-button"
			class="btn btn-dark text-light {!showButton ? 'disabled' : ''} mb-2"
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
		<div class="input-group">
			<input class="form-control" placeholder="Введите полученный код" bind:value={code} />
		</div>
	</div>
</div>
