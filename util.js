
// define function for saving data
function save_batch(cond, label) {
    /*
     * INPUTS:
     *    - cond  : object that is used within filter call to select data portion. 
     *    - label : label to use for saving the rows on the database
     *
     * EXAMPLES:
     *
     *    // save trials of test phase:
     *    tl.push(save_batch({block: "test_1"}, "test_1"));
     *
     *    // save the instruction trials to look at the viewing times:
     *    tl.push(save_batch({trial_type: "instructions"}, "instructions"));
     *
     */
    return {
        type: jsPsychCallFunction,
        func: function() {
            let trials_csv = jsPsych.data.get().filter(cond).csv();
            db.collection(collname).doc(uid).collection("phases").doc(label).set({ trials: trials_csv });
            return 0;
        }
    }
}

