<script lang="ts">
	import PageLayout from '$lib/components/PageLayout.svelte';
	import { Order } from '$lib/models/Order';

	let order = new Order();
</script>

<PageLayout title="Новый заказ">
	<div slot="nav">
		<button class="btn btn-light text-dark">Отмена</button>
		<button class="btn btn-dark text-light">Сохранить</button>
	</div>

	<div class="row g-3">
		<div class="col-lg-9">
			<div class="mb-1">
				<div>что везти (товар):</div>
				<input class="form-control" bind:value={order.product} />
			</div>
			<div class="mb-1">
				<div>откуда:</div>
				<input class="form-control" bind:value={order.from} />
			</div>
			<div class="mb-1">
				<div>куда:</div>
				<input class="form-control" bind:value={order.to} />
			</div>
			<div class="d-flex flex-wrap justify-content-between mb-1">
				<div>
                    <div class="me-2">когда забирать:</div>
					<div class="d-flex align-items-end">						
						<div class="flex-grow-1 me-1">
							<input type="date" class="form-control" bind:value={order.whenTake} />
						</div>
						<div class="flex-grow-1">
							<input type="time" class="form-control" bind:value={order.whenTake} />
						</div>
					</div>
				</div>

				<div>
                    <div class="me-2">когда доставлять:</div>
					<div class="d-flex align-items-end">						
						<div class="flex-grow-1 me-1">
							<input type="date" class="form-control" bind:value={order.whenGive} />
						</div>
						<div class="flex-grow-1">
							<input type="time" class="form-control" bind:value={order.whenGive} />
						</div>
					</div>
				</div>
			</div>

			<div class="mt-5">
				<div>дополнительное описание:</div>
				<textarea class="form-control" style="min-height: 5em;" bind:value={order.description} />
			</div>
		</div>
		<div class="col-lg-3">
			<div class="mb-1">
				<div>длина:</div>
				<input class="form-control" bind:value={order.length} />
			</div>
			<div class="mb-1">
				<div>ширина:</div>
				<input class="form-control" bind:value={order.width} />
			</div>
			<div class="mb-1">
				<div>высота:</div>
				<input class="form-control" bind:value={order.height} />
			</div>
			<div class="mb-1">
				<div>количество:</div>
				<input class="form-control" bind:value={order.count} />
			</div>
			<div class="mb-1">
				<div>общая масса:</div>
				<input class="form-control" bind:value={order.totalWeight} />
			</div>
		</div>
	</div></PageLayout>
