<script lang="ts">
	let sidbarWidth: string = '14em';
	let menu: Array<any> = [
		{ title: 'Заказы', url: '', pin: '150' },
		{ title: 'Водители', url: '', pin: '20' },
		{ title: 'Автомобили', url: '', pin: '12' },
		{ title: 'Статистика', url: '', pin: '' }
	];
</script>

<div class="d-flex">
	<div class="fixed-top bg-light" style="width:{sidbarWidth}; height: 100vh;">
		<img class="w-100" src="https://techrocks.ru/wp-content/uploads/2021/03/bootstrap.png" alt="" />
		<div class="mt-4">
			{#each menu as item}
				<button class="btn btn-light text-dark rounded-0 mb-1 text-start w-100">
					<div class="d-flex justify-content-between align-items-end">
						{item.title}
						{#if item.pin!=""}
							<div class="badge bg-dark">{item.pin}</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex-grow-1" style="margin-left: {sidbarWidth}; height: 100vh;">
		<slot />
	</div>
</div>
