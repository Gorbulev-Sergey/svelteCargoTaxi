<script>
	import Component from '$lib/components/Component.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
</script>

<PageLayout title="Заказы">
	<div slot="nav">
		<button class="btn btn-light text-dark">Создать</button>
	</div>

	{#each new Array(10) as item}
		<Component title="Новый заказ">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam numquam delectus labore, vero ducimus
			perferendis deserunt sequi asperiores ipsum vel deleniti pariatur earum? Saepe maiores sequi ut id iste.
		</Component>
	{/each}
</PageLayout>
