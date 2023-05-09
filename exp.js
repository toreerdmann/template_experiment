
// define name for db
const collname = "experiment-1";

const jsPsych = initJsPsych();
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
// Enable persistence 
firebase.firestore().enablePersistence().catch(function(err) { } );
// Sign in
firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
});


// define function for saving data
function save_batch(cond, label) {
    return {
        type: jsPsychCallFunction,
        func: function() {
            let trials_csv = jsPsych.data.get().filter(cond).csv();
            db.collection(collname).doc(uid).collection("phases").doc(label).set({ trials: trials_csv });
            return 0;
        }
    }
}

let hello_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Hello world!',
    data: {
        block: "1"
    }
}
let bye_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Bye world!',
    data: {
        block: "1"
    }
}
// make timeline
var timeline = [hello_trial, bye_trial, save_batch({block: "1"}, "block_1")]

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid = user.uid;
        jsPsych.run(timeline);
    }
});

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

