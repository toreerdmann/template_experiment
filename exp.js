
// define name for db
const collname = "experiment-1";

// define trials
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
var timeline = [
    hello_trial, 
    bye_trial, 
    save_batch({block: "1"}, "block_1")
]

// run task after uid is assigned:
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid = user.uid;
        jsPsych.run(timeline);
    }
});

