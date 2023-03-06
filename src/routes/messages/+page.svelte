<script>
	import { messaging } from '$lib/scripts/firebase.js';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { getMessaging, getToken } from 'firebase/messaging';

	getToken(getMessaging(), { vapidKey: 'BOchUxTaicGrSG9sbBqcuk-ALTtc45K1dxzdi0-IdrZoZiTkKlKi_2yqv-MrmgofGa5gV0Relu-6GpCaTaiUJ7Q' }).then(
		currentToken => {
			if (currentToken) console.log('Всё правильно');
			else console.log('Ошибка');
		}
	);
</script>

<PageTitle title="Сообщения" />
