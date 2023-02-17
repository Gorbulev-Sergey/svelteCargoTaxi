<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { Order } from '$lib/models/Order';
	import { db } from '$lib/scripts/firebase';
	import { onValue, push, ref, set } from 'firebase/database';
	import { onMount } from 'svelte';

	let order = new Order();
	$: whenTake = {
		date: new Date(order.whenTake).toISOString().slice(0, 10),
		time: new Date(order.whenTake).toLocaleTimeString()
	};
	$: whenGive = {
		date: order.whenGive.slice(0, 10),
		time: new Date(order.whenGive).toLocaleTimeString()
	};

	onMount(() => {
		onValue(ref(db, `/orders/${$page.params.uid}`), s => {
			if (s.exists()) {
				order = s.val();
			}
		});
	});
</script>

<PageLayout title="Новый заказ">
	<div slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders')}>Отмена</button>
		<button
			class="btn btn-dark text-light"
			on:click={() => {
				if (order.product && order.from && order.to) {
					order.whenTake = `${whenTake.date}T${whenTake.time}Z`;
					order.whenGive = `${whenGive.date}T${whenGive.time}Z`;
					set(ref(db, `/orders/${$page.params.uid}`), order);
					order = new Order();
					goto('/admin/orders');
				}
			}}>Сохранить</button>
	</div>

	<div class="row g-3">
		<div class="col-lg-9">
			<div class="mb-1">
				<div>что везти (товар):</div>
				<input class="form-control" bind:value={order.product} />
			</div>
			<div class="mb-1">
				<div>откуда:</div>
				<div class="input-group">
					<input class="form-control" bind:value={order.from} />
					<button class="btn btn-dark text-light"><i class="fa-solid fa-earth-americas" /></button>
				</div>
			</div>
			<div class="mb-1">
				<div>куда:</div>
				<div class="input-group">
					<input class="form-control" bind:value={order.to} />
					<button class="btn btn-dark text-light"><i class="fa-solid fa-earth-americas" /></button>
				</div>
			</div>
			<div class="d-flex flex-wrap justify-content-between mb-1">
				<div>
					<div class="me-2">когда забирать:</div>
					<div class="d-flex align-items-end">
						<div class="flex-grow-1 me-1">
							<input type="date" class="form-control" bind:value={whenTake.date} />
						</div>
						<div class="flex-grow-1">
							<input type="time" class="form-control" bind:value={whenTake.time} />
						</div>
					</div>
				</div>

				<div>
					<div class="me-2">когда доставлять:</div>
					<div class="d-flex align-items-end">
						<div class="flex-grow-1 me-1">
							<input type="date" class="form-control" bind:value={whenGive.date} />
						</div>
						<div class="flex-grow-1">
							<input type="time" class="form-control" bind:value={whenGive.time} />
						</div>
					</div>
				</div>
			</div>

			<div class="mmb-1">
				<div>дополнительное описание:</div>
				<textarea class="form-control" style="min-height: 15em;" bind:value={order.description} />
			</div>
		</div>
		<div class="col-lg-3">
			<div class="mb-1">
				<div>длина:</div>
				<div class="input-group">
					<input type="number" min="0" step="0.01" class="form-control" bind:value={order.length} />
					<div class="input-group-text">м</div>
				</div>
			</div>
			<div class="mb-1">
				<div>ширина:</div>
				<div class="input-group">
					<input type="number" min="0" step="0.01" class="form-control" bind:value={order.width} />
					<div class="input-group-text">м</div>
				</div>
			</div>
			<div class="mb-1">
				<div>высота:</div>
				<div class="input-group">
					<input type="number" min="0" step="0.01" class="form-control" bind:value={order.height} />
					<div class="input-group-text">м</div>
				</div>
			</div>
			<div class="mb-1">
				<div>количество:</div>
				<input type="number" min="0" step="1" class="form-control" bind:value={order.count} />
			</div>
			<div class="mb-1">
				<div>общая масса:</div>
				<div class="input-group">
					<input type="number" min="0" class="form-control" bind:value={order.totalWeight} />
					<div class="input-group-text">кг</div>
				</div>
			</div>
		</div>
	</div></PageLayout>
