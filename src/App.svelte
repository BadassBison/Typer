<script>
	import Navbar from './Navbar.svelte';
	import TypingBox from './TypingBox.svelte';
	import TypingInput from './TypingInput.svelte';
	import NewPrincipleButton from './NewPrincipleButton.svelte';
	import { newPrincipleStore } from './store.js';

	const refresh = e => {
		if (e.key === "Enter") newPrincipleStore.set(true);
	}

	window.addEventListener("keyup",e => refresh(e));
</script>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

<Navbar />
<div class="container">
	<TypingBox />
	<TypingInput />
	<NewPrincipleButton />
</div>