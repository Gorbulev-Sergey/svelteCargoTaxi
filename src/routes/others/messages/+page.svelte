<script>
	import { messaging } from '$lib/scripts/firebase.js';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { getMessaging, getToken } from 'firebase/messaging';
	import Alert from '$lib/components/others/Alert.svelte';
	import { text } from 'svelte/internal';
	import { sendFCM } from '$lib/scripts/firebaseCloudMessage';

	// getToken(messaging, { vapidKey: 'BOchUxTaicGrSG9sbBqcuk-ALTtc45K1dxzdi0-IdrZoZiTkKlKi_2yqv-MrmgofGa5gV0Relu-6GpCaTaiUJ7Q' }).then(
	// 	currentToken => {
	// 		if (currentToken) console.log(currentToken);
	// 	}
	// );

	let message = {
		theme: 'orders',
		title: '',
		text: '',
	};
	$: hideAlert = true;
</script>

<Alert bind:hide={hideAlert} />

<div class="container my-3">
	<div class="bg-light p-3 rounded mt-5">
		<h2 class="mb-3">Отправить сообщение</h2>
		<div class="mb-2">
			<div class="me-2">Тема:</div>
			<input class="form-control" bind:value={message.theme} />
		</div>
		<div class="mb-2">
			<div class="me-2">Заголовок сообщения:</div>
			<input class="form-control" bind:value={message.title} />
		</div>
		<div class="mb-3">
			<div class="me-2">Текст сообщения:</div>
			<input class="form-control" bind:value={message.text} />
		</div>
		<button
			class="btn btn-dark text-light"
			on:click={async () => {
				console.log(message);
				if (message.theme != '' && message.title != '' && message.text != '')
					// Очень важный код
					fetch('https://fcm.googleapis.com/fcm/send', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
							Authorization:
								'key=AAAAwAwwrpU:APA91bFvwPEwjJT9SjMo6u7DPWdB9msy6sbeis6JKvr1V-HBPWMQTv4SfCpLnNmbZSpRUrnFntW0YsRAQGm4t3vlIXKTl5e5tBU_2Fnc5_kQf2afQ9JeTm1WC152sPIDV8u60WGiuANv',
						},
						body: JSON.stringify({
							to: `/topics/${message.theme}`,
							notification: {
								body: message.text,
								title: message.title,
							},
						}),
					}).then(s => {
						hideAlert = false;
						setInterval(() => (hideAlert = true), 2000);
						message = {
							theme: 'orders',
							title: '',
							text: '',
						};
					});
			}}>Отправить сообщение</button>
	</div>
</div>
