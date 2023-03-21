<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';

	let code = '';
	let userName = '';
	let phoneNumber = '';
</script>

<div class="d-flex justify-content-center align-items-center mx-2" style="min-height: 100vh;">
	<div class="bg-light p-3 rounded text-center">
		<div class="mb-3">
			<h5 class="mb-1">Добро пожаловать в наше приложение!</h5>
			<small class="text-muted">Введите регистрационные данные.</small>
		</div>
		<input class="form-control mb-2" placeholder="Ваше имя (или логин)" bind:value={userName} />
		<div class="input-group mb-2">
			<span class="input-group-text">+7</span>
			{#if userName.trim().length > 0}
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
					placeholder="Номер телефона" />
			{:else}
				<input type="tel" class="form-control" placeholder="Номер телефона" disabled />
			{/if}
		</div>

		{#if phoneNumber.length == 10}
			<button
				id="sign-in-button"
				class="btn btn-dark text-light mb-2"
				on:click={() => {
					// невидимая reCaptcha
					if (!window.recaptchaVerifier) {
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
					}
					let appVerifier = window.recaptchaVerifier;
					signInWithPhoneNumber(auth, `+7${phoneNumber}`, appVerifier)
						.then(confirmationResult => {
							// Отправлено SMS. Предложите пользователю ввести код из сообщения, затем войдите
							//в систему с результатом подтверждения.подтвердите (код).
							window.confirmationResult = confirmationResult;
						})
						.catch(error => {
							console.log(error);
						});
				}}>Получить смс с кодом</button>
		{:else}
			<button id="sign-in-button" class="btn btn-dark text-light mb-2" disabled>Получить смс с кодом</button>
		{/if}

		<div class="input-group">
			{#if phoneNumber.length == 10}
				<input
					type="tel"
					class="form-control"
					maxlength="6"
					placeholder="Введите полученный код"
					bind:value={code}
					on:keypress={e => {
						if (isNaN(e.key)) {
							e.preventDefault();
						}
					}}
					on:input={() => {
						if (code.length == 6) {
							window.confirmationResult
								.confirm(code)
								.then(result => {
									const user = result.user;
									updateProfile(user, { displayName: userName });
									console.log(user);
									goto('/');
								})
								.catch(error => {
									console.log(error);
								});
						}
					}} />
			{:else}
				<input type="tel" class="form-control" maxlength="6" placeholder="Введите полученный код" bind:value={code} disabled />
			{/if}
		</div>
	</div>
</div>
