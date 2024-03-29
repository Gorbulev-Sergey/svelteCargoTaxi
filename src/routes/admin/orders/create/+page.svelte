<script lang="ts">
	import { onMount, text } from 'svelte/internal';
	import { sendFCM } from '$lib/scripts/firebaseCloudMessage';
	import { goto } from '$app/navigation';
	import { Order } from '$lib/models/Order';
	import { db } from '$lib/scripts/firebase';
	import { push, ref } from 'firebase/database';
	import Layout from '$lib/components/admin/Layout/Layout.svelte';
	import Before from '$lib/components/others/breakepoints/Before.svelte';
	import After from '$lib/components/others/breakepoints/After.svelte';

	let order = new Order();
	let whenTake = {
		date: new Date().toISOString().slice(0, 10),
		time: new Date().toTimeString().slice(0, 5),
	};
	let whenGive = {
		date: new Date().toISOString().slice(0, 10),
		time: new Date().toTimeString().slice(0, 5),
	};

	onMount(async () => {
		ymaps.ready(() => {
			new ymaps.SuggestView('searchFrom');
			new ymaps.SuggestView('searchTo');
		});
	});
</script>

<Layout pageTitle="Новый заказ">
	<div class="d-flex align-items-center gap-1" slot="nav">
		<button class="btn btn-light text-dark" on:click={() => goto('/admin/orders')} title="Отмена">
			<Before><i class="fa-solid fa-chevron-left" /></Before>
			<After>Отмена</After>
		</button>
		<button
			class="btn btn-dark text-light"
			on:click={() => {
				if (order.product && order.from && order.to) {
					order.whenTake = `${whenTake.date}T${whenTake.time}`;
					order.whenGive = `${whenGive.date}T${whenGive.time}`;
					let uid = push(ref(db, '/orders'), order).key || '';
					sendFCM(
						'orders',
						'Kaluga-Cargo. Новый заказ',
						`товар: ${order.product},\nоткуда: ${order.from},\nкуда: ${order.to},\nзабрать: ${whenTake.date} в ${
							whenTake.time
						},\nдоставить: ${whenGive.date} ${order.hasWhenGiveTime ? 'в ' + whenGive.time : ''} ${
							order.description ? ',\n*' + order.description : ''
						}`,
						uid,
					);
					goto('/admin/orders');
				}
			}}>Сохранить</button>
	</div>
	<div class="container-fluid rounded bg-light my-4 my-sm-3 pb-3">
		<div class="row gy-2 gx-3">
			<div class="col-lg-9">
				<div class="mb-1">
					<div>что везти (товар):</div>
					<input class="form-control" bind:value={order.product} />
				</div>
				<div class="mb-1">
					<div>откуда:</div>
					<div class="input-group">
						<input
							id="searchFrom"
							class="form-control"
							bind:value={order.from}
							on:focusout={async function () {
								setTimeout(() => {
									order.from = this.value;
								}, 1000);
							}} />
						<button class="btn btn-dark text-light"><i class="fa-solid fa-earth-americas" /></button>
					</div>
				</div>
				<div class="mb-1">
					<div>куда:</div>
					<div class="input-group">
						<input
							id="searchTo"
							class="form-control"
							bind:value={order.to}
							on:focusout={async function () {
								setTimeout(() => {
									order.to = this.value;
								}, 1000);
							}} />
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
							<div class="d-flex align-items-center mb-1">
								<input class="form-check" type="checkbox" bind:checked={order.hasWhenGiveTime} />
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<div class="mb-1 mx-1" style="cursor: default;" on:click={() => (order.hasWhenGiveTime = !order.hasWhenGiveTime)}>
									время
								</div>
							</div>
							{#if order.hasWhenGiveTime}
								<div class="flex-grow-1">
									<input type="time" class="form-control" bind:value={whenGive.time} />
								</div>
							{/if}
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
		</div>
	</div>
</Layout>
