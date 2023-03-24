<script>
	import { onMount } from 'svelte';

	export let hide = false;
</script>

{#if !hide}
	<div class="position-fixed" style="top:1em; right:1em;">
		<div class="btn-group">
			<span class="btn btn-sm bg-success bg-opacity-10 border-0" style="cursor: default;">Сообщение отправлено.</span>
			<button
				type="button"
				class="btn btn-sm btn-success"
				on:click={() => {
					hide = true;					
				}}><i class="fa-solid fa-xmark" /></button>
		</div>
	</div>
{/if}
