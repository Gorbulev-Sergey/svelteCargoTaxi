<script lang="ts">
	export let title: string;
</script>

<div class="d-flex align-items-center position-fixed w-100 px-3 py-1">
	<h2 class="mb-1">{title}</h2>
	<div class="flex-grow-1 text-end">
        <slot />
    </div>
</div>
