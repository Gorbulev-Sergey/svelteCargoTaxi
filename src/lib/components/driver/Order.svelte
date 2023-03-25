<script>
	import { Order } from '$lib/models/Order';

	export let i = '';
	export let uid = '';
	export let order = new Order();
	export let _class = '';
	export let _style = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id={uid} class="d-flex gap-2 mb-3 {_class}" style={_style} on:click>
	<div
		class="d-flex justify-content-start align-items-end bg-opacity-75 px-1 py-2"
		class:bg-white={!order.status}
		class:bg-dark={order.status == 'взят'}
		class:bg-info={order.status == 'едет'}
		class:bg-success={order.status == 'завершён'}>
		<div style="writing-mode: vertical-rl; transform: rotate(180deg);">
			<div class="badge bg-dark bg-opacity-50 text-light p-1">{i}</div>
			{#if order.status}
				<div class="badge text-light p-0 mt-1">
					{order.status}
				</div>
			{/if}
		</div>
	</div>

	<div class="flex-grow-1 me-1 p-2">
		<div class="w-100">
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

			{#if order.length || order.width || order.height || order.count || order.totalWeight}
				<div class="border-top mt-2 pt-1" style="min-width: 11em;">
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
			{/if}
		</div>
		{#if order.description}
			<div class="text-primary mt-2 pt-1 border-top"><i>* {order.description}</i></div>
		{/if}

		<div class="mt-2">
			<slot />
		</div>
	</div>

	<slot name="nav" />
</div>
