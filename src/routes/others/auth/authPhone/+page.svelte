<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { auth, db } from '$lib/scripts/firebase';
	import { returnUrl } from '$lib/scripts/storage';
	import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from 'firebase/auth';
	import { push, ref, onValue } from 'firebase/database';
	import { onMount } from 'svelte';

	let timeResendSMS = 60;
	let code = '';
	let userName = '';
	let phoneNumber = '';
	let error = '';
	let toggleLoginRegistr = true;
	let drivers = {};

	/**
	 * @type {import("@firebase/auth").ApplicationVerifier}
	 */
	let recaptchaVerifier;
	/**
	 * @type {import("@firebase/auth").ConfirmationResult}
	 */
	let confirmationResult;
	onMount(async () => {
		onValue(ref(db, '/drivers'), s => {
			if (s.exists()) drivers = s.val();
		});
	});
</script>

<div class="d-flex justify-content-center align-items-center mx-2" style="min-height: 100vh;">
	<div class="p-3 rounded text-center">
		<div class="mb-3">
			<h3 class="mb-1">Добро пожаловать!</h3>
			<div class="text-muted">Введите регистрационные данные</div>
		</div>
		{#if toggleLoginRegistr}
			<input class="form-control text-center mb-2" placeholder="Ваше имя (или логин)" bind:value={userName} />
		{/if}
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
				class="btn btn-dark text-light w-100 mb-2 {timeResendSMS == 60 ? '' : 'disabled'} "
				on:click={() => {
					error = '';
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
						.catch(er => {
							switch (er.code) {
								case 'auth/too-many-requests':
									error = 'Слишком много запросов. Попробуйте повторить попытку чуть позже.';
									break;
							}
						});
				}}>{timeResendSMS == 60 ? 'Отправить смс с кодом' : `Повторная отправка через ${timeResendSMS} сек`}</button>
		{:else}
			<button id="sign-in-button" class="btn btn-dark text-light w-100 mb-2" disabled>Отправить смс с кодом</button>
		{/if}

		<div class="input-group">
			{#if phoneNumber.length == 10 && confirmationResult}
				<input
					type="tel"
					class="form-control text-center"
					maxlength="6"
					placeholder="Введите полученный код"
					autofocus
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
									// Добавляем драйвера если он отсутствует в бд
									if (!Object.keys(drivers).includes(user.uid)) {
										push(ref(db, '/drivers'), { name: user.displayName, phone: user.phoneNumber });
									}
									goto($returnUrl);
								})
								.catch(er => {
									switch (er.code) {
										case 'auth/invalid-verification-code':
											error = 'Введён неправильный код. Проверьте, пожалуйста, соответствует ли введённый вами код коду из смс.';
											break;
									}
								});
						} else if (code.length < 6) error = '';
					}} />
			{:else}
				<input type="tel" class="form-control text-center" placeholder="Введите полученный код" disabled />
			{/if}
		</div>

		<div class="mt-2">
			<button
				class="btn btn-sm btn-link"
				on:click={() => {
					toggleLoginRegistr = !toggleLoginRegistr;
					userName = toggleLoginRegistr ? '' : 'Имя';
				}}>{toggleLoginRegistr ? 'Вход' : 'Регистрация'}</button>
		</div>

		{#if error != ''}
			<div class="text-danger mt-3">{error}</div>
		{/if}
	</div>
</div>
