<script>
	import { messaging } from '$lib/scripts/firebase.js';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { getMessaging, getToken } from 'firebase/messaging';

	getToken(messaging, { vapidKey: 'BOchUxTaicGrSG9sbBqcuk-ALTtc45K1dxzdi0-IdrZoZiTkKlKi_2yqv-MrmgofGa5gV0Relu-6GpCaTaiUJ7Q' }).then(
		currentToken => {
			if (currentToken) console.log(currentToken);
		}
	);
</script>

<PageTitle title="Сообщения" />
