<script>
    import { 
        wpm, 
        accuracy, 
        time, 
        keyCount,
        totalWrong
        } from './store.js';

    const calcTime = () => {
        let ms = performance.now() - $time;
        return (ms / 60000);
    }

    const calcWPM = () => {
        wpm.set(Math.floor(($keyCount / 5) / calcTime() * 100) / 100);
    }

    const calcAccuracy = () => {
        accuracy.set(Math.floor((($keyCount - $totalWrong) / $keyCount) * 1000 ) / 10);
    }

    keyCount.subscribe(() => {
        calcWPM();
        calcAccuracy();
    });

</script>

<style>
    .typing-stats {
       display: flex; 
       justify-content: space-between;
       font-size: 16pt;
    }

    p {
        font-weight: 500;
        margin: 0;
    }
</style>

<div class="typing-stats">
    <span class="wpm">
        <p>WPM: {$wpm}</p>
    </span>

    <span class="accuracy">
        <p>Accuracy: {$accuracy}%</p>
    </span>
</div>