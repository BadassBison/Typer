<script>
    import { newPrincipleStore } from './store.js';

    const newPrinciple = () => newPrincipleStore.set(true);
</script>

<style>
    button {
        width: 150px;
        height: 60px;
        background: steelblue;
        color: white;
        border-radius: 6px;
        padding: 15px;
        margin-top: 10px;
        transition: all 0.35s ease-in-out;
        
    }

    button:hover {
        width: 187.5px;
        height: 75px;
        font-size: 16pt;
    }

    button:active {
        background: rgb(13, 85, 145);
    }

    button:focus {
        outline: 0;
    }
</style>

<button on:click={newPrinciple}>New Principle</button>