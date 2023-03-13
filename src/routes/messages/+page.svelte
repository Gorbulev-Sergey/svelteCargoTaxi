<script>
	import { messaging } from '$lib/scripts/firebase.js';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { getMessaging, getToken } from 'firebase/messaging';
	import PageLayout from '$lib/components/PageLayout.svelte';

	getToken(messaging, { vapidKey: 'BOchUxTaicGrSG9sbBqcuk-ALTtc45K1dxzdi0-IdrZoZiTkKlKi_2yqv-MrmgofGa5gV0Relu-6GpCaTaiUJ7Q' }).then(
		currentToken => {
			if (currentToken) console.log(currentToken);
		}
	);
</script>

<PageTitle title="Сообщения" />

<button
	class="btn btn-light text-dark mt-5"
	on:click={async () => {
		// Очень важный код
		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization:
					'key=AAAAwAwwrpU:APA91bFvwPEwjJT9SjMo6u7DPWdB9msy6sbeis6JKvr1V-HBPWMQTv4SfCpLnNmbZSpRUrnFntW0YsRAQGm4t3vlIXKTl5e5tBU_2Fnc5_kQf2afQ9JeTm1WC152sPIDV8u60WGiuANv'
			},
			body: JSON.stringify({
				to: '/topics/orders',
				notification: {
					body: 'Появился новый заказ',
					title: "Подписчикам темы 'orders'"
				}
			})
		});
	}}>Отправить сообщение</button>
