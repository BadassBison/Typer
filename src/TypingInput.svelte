<script>
    import { 
        inputStore, 
        deleteStore, 
        newPrincipleStore,
        typingOver,
        time,
        wordCount
        } from './store.js';


    let input = "";
    inputStore.subscribe(val => {
        if (val) input = val;
    });


    newPrincipleStore.subscribe(val => {
        if (val) document.querySelector("input").value = "";
    });
    
    
    const keyPress = e => {
        inputStore.update(val => {
			if (!val) val = "";
			return val + e.key;
		});
    }


    const deleteKey = e => {
        if (e.key !== "Backspace") return;
        deleteStore.set(true);
    }

    let disabled = "";
    typingOver.subscribe(val => {
        disabled = val ? "disable" : "";
    });

    const startTime = e => {
        const val = e.target.value;
        if (val.length === 0) time.set(performance.now());
    }

</script>

<style>
    input {
		width: 300px;
		margin-top: 20px;
	}
</style>

<input type="text" on:keypress={keyPress} on:keydown={deleteKey} on:focus={startTime} {disabled} />