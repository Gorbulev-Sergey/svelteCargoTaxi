<script lang="ts">
	export let title: string = '';
</script>

<div class="sticky-top">
	<div class="bg-white d-flex justify-content-between align-items-center px-4 py-2">
		<h3 class="mb-1">{title}</h3>
		<div class="d-flex justify-content-end">
			<slot name="nav" />
		</div>
	</div>
</div>

<div class="p-3">
	<slot />
</div>
