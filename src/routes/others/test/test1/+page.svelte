<script>
	let time = 5;
</script>

<button
	id="ttt"
	class="btn btn-dark {time < 5 ? 'disabled' : ''}"
	on:click={() => {
		let interval = setInterval(() => {
			time = time - 1;
		}, 1000);
		setTimeout(() => {
			clearInterval(interval);
			time = 5;
		}, 5000);
	}}>
	{time == 5 ? 'Отправить смс с кодом' : `Отправить код через ${time} сек`}
</button>
