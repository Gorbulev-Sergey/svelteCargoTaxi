<script>
	import { goto } from '$app/navigation';
	import Auth from '$lib/components/Auth.svelte';
	import LayoutHorisontal from '$lib/components/others/LayoutHorisontal.svelte';
	import { auth } from '$lib/scripts/firebase';
	import { driversCount, ordersCount, returnUrl } from '$lib/scripts/storage';
	import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';

	let routes = [
		{ title: 'Заказы', route: '/admin/orders', pin: $ordersCount },
		{ title: 'Водители', route: '/admin/drivers', pin: $driversCount },
		{ title: 'Автомобили', route: '/', pin: '12' },
		{ title: 'Статистика', route: '/', pin: '' },
	];
</script>

<Auth>
	<LayoutHorisontal {routes}>
		<slot />
	</LayoutHorisontal>
</Auth>
