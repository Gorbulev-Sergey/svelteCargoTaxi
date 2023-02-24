<script lang="ts">
	export let title: string = '';
</script>

<div class="sticky-top">
	<div class="bg-white d-flex justify-content-between align-items-center p-2 py-3">
		<h3 class="mb-1 ms-3">{title}</h3>
		<slot name="center" />
		<div class="d-flex justify-content-end me-3">
			<slot name="nav" />
		</div>
	</div>
</div>

<div class="px-4 py-1">
	<slot />
</div>
