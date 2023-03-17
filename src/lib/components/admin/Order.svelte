<script>
	import { Order } from '$lib/models/Order';

	export let i = '';
	export let uid = '';
	export let order = new Order();
</script>

<div id={uid} class="d-flex align-items-start bg-light text-dark gap-2 p-2 mb-3 rounded">
	<div class="badge bg-dark bg-opacity-25 text-dark mt-1 p-1">{i}</div>
	<div class="d-flex flex-column flex-grow-1 me-1">
		<div class="d-flex justify-content-between w-100">
			<div>
				<div>
					<i>товар:</i> <b>{order.product}</b>
					{#if order.description}
						<span class="text-primary">*</span>
					{/if}
				</div>
				<div><i>откуда:</i> {order.from}</div>
				<div><i>куда:</i> {order.to}</div>
				<div><i>забрать:</i> {new Date(order.whenTake).toLocaleString().slice(0, -3)}</div>
				<div>
					<i>доставить:</i>
					{order.hasWhenGiveTime
						? new Date(order.whenGive).toLocaleString().slice(0, -3)
						: new Date(order.whenGive).toLocaleString().slice(0, -10)}
				</div>
			</div>
			<div style="min-width: 11em;">
				{#if order.length}
					<div><i>длина:</i> {order.length} м</div>
				{/if}
				{#if order.width}
					<div><i>ширина:</i> {order.width} м</div>
				{/if}
				{#if order.height}
					<div><i>высота:</i> {order.height} м</div>
				{/if}
				{#if order.count}
					<div><i>количество:</i> {order.count}</div>
				{/if}
				{#if order.totalWeight}
					<div><i>общая масса:</i> {order.totalWeight} кг</div>
				{/if}
			</div>
		</div>
		{#if order.description}
			<div class="text-primary mt-2 border-top"><i>* {order.description}</i></div>
		{/if}
	</div>
	<slot name="nav" />
</div>
