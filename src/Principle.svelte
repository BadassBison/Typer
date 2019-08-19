<script>
    import { 
        inputStore, 
        principleStore, 
        deleteStore,
        newPrincipleStore,
        typingOver,
        keyCount,
        totalWrong
        } from './store.js';
    import principles from './principles.js';
    import { pickPrinciple } from './utils.js';

    // TODO - if there is an error at the end, it will throw an undefined


    // Fetching the principle information when data changes ---------------------------
    let principle, title, curr, right, left, error, success;
    principleStore.subscribe(val => {
        title = val.title;
        curr = val.curr;
        right = val.right;
        left = val.left;
        error = val.error;
        success = val.success;
    });


    // Find the next word to highlight ----------------------------------------------
    const highlightNext = () => {
        let idx = right.indexOf(" ");
        if (idx > 0) {
            curr = right.slice(0, idx + 1);
            right = right.slice(idx + 1);
        } else {
            curr = right;
            right = "";
        }
        
        // this if is for finding first word
        if (success.length > 0) {
            left += success;
            success = "";
        }
    }


    // Find last word in the left section -------------------------------------------
    const highlightPrev = () => {
        let idx = left.slice(0, left.length-1).lastIndexOf(" ");

        // Find a word greater than the first
        if (idx > 0) {
            success = left.slice(idx + 1);
            left = left.slice(0, idx + 1);
            right = curr + right;
            curr = ""

        // Handle finding the first word
        } else if (left.length > 0) {
            success = left;
            left = "";
            right = curr + right;
            curr = ""
        }
    }


    // Initial building upon start ---------------------------------------------------
    const buildPrinciple = () => {
        inputStore.set("");
        typingOver.set(false);
        keyCount.set(0);
        totalWrong.set(0);
        principle = principles[pickPrinciple(principles.length)];
        title = principle.title;
        right = principle.definition;
        
        highlightNext();

        principleStore.set({
            title: title,
            curr: curr,
            right: right,
            left: "",
            error: "",
            success: ""
        });

    }
    if (left === "" && right === "") buildPrinciple();


    // Refreshing the principle ----------------------------------------------------------
    newPrincipleStore.subscribe(val => {
        if (val) {
            newPrincipleStore.set(false);
            buildPrinciple();
        }
    });

    // Fetching the input data from the store --------------------------------------------
    let input = "";
    inputStore.subscribe(val => {
        if ($deleteStore) return;
        if (val) input = val;
    
        // success
        if (input[input.length-1] === curr[0] && error.length === 0) {
            success += curr[0];
            curr = curr.slice(1);

            if (curr.length === 0 || curr.length === 1 && right.length === 0) {
                if (right.length > 0) {
                    highlightNext();
                } else if (curr.length === 0 || curr === " ") {
                    typingOver.set(true);
                }
            };

        // error
        } else if (input.length > 0) {
            error += curr[0];
            curr = curr.slice(1);
            totalWrong.update(val => val += 1);
            if (curr.length === 0) {
                if (right.length > 0) {
                    highlightNext();
                } else {
                    curr = " ";
                }
            }
        }
        keyCount.set(left.length + success.length);
    });


    // Deleting data -------------------------------------------------------
    deleteStore.subscribe(val => {
        if (val) {
            inputStore.set(input.slice(0, input.length -1));
            if (error.length > 0) {
                if (error[error.length-1] === " ") {
                    right = curr + right;
                    curr = ""
                };
                
                curr = error.slice(error.length - 1) + curr;
                error = error.slice(0, error.length - 1)
                principleStore.update(val => {
                    val.curr = curr;
                    val.error = error;
                    val.success = success;
                    val.left = left;
                    val.right = right;
                    return val;
                });
            } else {
                if (success.length === 0) highlightPrev();
                curr = success.slice(error.length - 1) + curr;
                success = success.slice(0, success.length - 1)
                principleStore.update(val => {
                    val.curr = curr;
                    val.error = error;
                    val.success = success;
                    val.left = left;
                    val.right = right;
                    return val;
                });
            }
           
            deleteStore.set(false);
        }
    });
    

</script>

<style>
    div {
        font-size: 16pt;
        margin-top: 20px;
    }

    h3 {
        margin-bottom: 10px;
    }

    span {
        white-space: pre-line;
    }
    
    .success {
        background: lime;
    }

    .error {
        background: rgb(255, 158, 158)
    }

    .left {
        color: gray;
    }

    .current {
        background: rgb(194, 240, 250);
    }
</style>

<div>
    <h3>{title}</h3>
    <span class="left">{left}</span><span class="success">{success}</span><span class="error">{error}</span><span class="current">{curr}</span><span class="right">{right}</span>
</div>