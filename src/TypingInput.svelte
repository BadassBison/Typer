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
        if (val) {
            let input = document.querySelector("input");
            input.value = "";
            input.focus();
        }
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

<input type="text" id="input" on:keypress={keyPress} on:keydown={deleteKey} on:focus={startTime} {disabled} />