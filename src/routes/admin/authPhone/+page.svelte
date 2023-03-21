<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth } from '$lib/scripts/firebase';
	import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';

	let timeResendSMS = 60;
	let code = '';
	let userName = '';
	let phoneNumber = '';

	/**
	 * @type {import("@firebase/auth").ApplicationVerifier}
	 */
	let recaptchaVerifier;
	/**
	 * @type {import("@firebase/auth").ConfirmationResult}
	 */
	let confirmationResult;
</script>

<div class="d-flex justify-content-center align-items-center mx-2" style="min-height: 100vh;">
	<div class=" p-3 rounded text-center">
		<div class="mb-3">
			<h5 class="mb-1">Добро пожаловать в наше приложение!</h5>
			<small class="text-muted">Введите регистрационные данные</small>
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
					let interval = setInterval(() => {
						timeResendSMS--;
					}, 1000);
					setTimeout(() => {
						clearInterval(interval);
						timeResendSMS = 60;
					}, 60000);
					// невидимая reCaptcha
					if (!recaptchaVerifier) {
						recaptchaVerifier = new RecaptchaVerifier(
							'sign-in-button',
							{
								size: 'invisible',
								callback: (/** @type {any} */ response) => {
									// reCAPTCHA solved, allow signInWithPhoneNumber.
								},
							},
							auth,
						);
					}
					signInWithPhoneNumber(auth, `+7${phoneNumber}`, recaptchaVerifier)
						.then(confResult => {
							// Отправлено SMS. Предложите пользователю ввести код из сообщения, затем войдите
							//в систему с результатом подтверждения.подтвердите (код).
							confirmationResult = confResult;
						})
						.catch(error => {
							console.log(error);
						});
				}}>{timeResendSMS == 60 ? 'Отправить смс с кодом' : `Отправить код через ${timeResendSMS} сек`}</button>
		{:else}
			<button id="sign-in-button" class="btn btn-dark text-light mb-2" disabled>Получить смс с кодом</button>
		{/if}

		<div class="input-group">
			{#if phoneNumber.length == 10 && confirmationResult}
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
							confirmationResult
								.confirm(code)
								.then(result => {
									const user = result.user;
									if (!user.displayName) {
										updateProfile(user, { displayName: userName });
									}
									console.log(user);
									goto('/');
								})
								.catch(error => {
									console.log(error);
								});
						}
					}} />
			{:else}
				<input type="tel" class="form-control" placeholder="Введите полученный код" disabled />
			{/if}
		</div>
	</div>
</div>
