var task_name = "Stats_learning_trig";
var sbj_id = "test01";

//you must put your save_data php url here.
var save_url = "https://users.rcc.uchicago.edu/~zz112/exp_data/save_data.php";
var data_dir = task_name;

//my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id; 

var repo_site = "https://ziweizhang0304.github.io/Stats_learning_trig/";

var timeline = [];


/* -----Some Functions-----*/
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
};

function rep(str) {
    str = setCharAt(str, 69, 'w');
    return str
};

function countItems(arr, what){
    var count= 0, i;
    while((i= arr.indexOf(what, i))!= -1){
        ++count;
        ++i;
    }
    return count
};

function isConsecutive(a){

  let visited = {};
  if((a[a.length - 1] - a[0]) + 1 != a.length){
   return false;
  }
  for(let i = 0; i < a.length; i++){
    if(visited[a[i]] == 1){
      return false;
    }else{
      visited[a[i]] = 1;
    }
    return true;
  }
};

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

function range(start, end) {
	/* generate a range : [start, start+1, ..., end-1, end] */
	var len = end - start + 1;
	var a = new Array(len);
	for (let i = 0; i < len; i++) a[i] = start + i;
	return a;
};

function repeat_push(rslt, item, times) {
	for(let i = 0; i < times; i++) {
  	rslt.push(item)
  }
  return rslt;
};

function get_values_bykey(object) {

    var TD_stimuli_list = []
    object.forEach(function myFunction(value) {
        console.log('this is item number ' + value)
        TD_stimuli_list.push(value.TD_stimulus)

    })
    return TD_stimuli_list;
};

function get_target_time(object,TD_target,set) {

    var time = []
    object.forEach(function myFunction(value) {
        console.log('this is shape ' + value)
        if (set =='onset' && value.stimulus == TD_target){
            time.push(value.time)}
        else if (set =='offset' && value.stimulus == TD_target) {
            time.push(value.rt)
        }

    })
    return time[0];
};

/* -----Full screen-----*/
var enter_full = {
  type: 'fullscreen',
  fullscreen_mode: true
};
//timeline.push(enter_full);


/* -----Give consent-----*/
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  }
  return false;
};

var consent = {
  type: 'external-html',
  url: repo_site + "content/consent.html",
  cont_fn: check_consent,
  cont_btn: 'start',
};
//timeline.push(consent);

/* -----ITI----- */
var iti_200 = {
  type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
};
var iti_1000 = {
  type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

/* -----Preload Images----- */
preload_list = [repo_site + 'img/Stim/FN_001_g.png', repo_site + 'img/Stim/FN_002_g.png', repo_site + 'img/Stim/FN_003_g.png',
repo_site +'img/Stim/FN_004_g.png', repo_site + 'img/Stim/FN_005_g.png', repo_site + 'img/Stim/FN_006_g.png',
repo_site +'img/Stim/FN_007_g.png', repo_site + 'img/Stim/FN_008_g.png', repo_site + 'img/Stim/FN_009_g.png',
repo_site +'img/Stim/FN_010_g.png', repo_site + 'img/Stim/FN_011_g.png', repo_site + 'img/Stim/FN_012_g.png',
repo_site + 'img/Stim/FN_013_g.png', repo_site + 'img/Stim/FN_014_g.png', repo_site + 'img/Stim/FN_015_g.png',
repo_site + 'img/Stim/FN_016_g.png', repo_site + 'img/Stim/FN_017_g.png', repo_site + 'img/Stim/FN_018_g.png',
repo_site + 'img/Stim/FN_019_g.png', repo_site + 'img/Stim/FN_020_g.png', repo_site + 'img/Stim/FN_021_g.png',
repo_site + 'img/Stim/IF_001_g.png',repo_site + 'img/Stim/IF_002_g.png',repo_site + 'img/Stim/IF_003_g.png',repo_site + 'img/Stim/IF_004_g.png',
repo_site + 'img/Stim/FN_001_w.png', repo_site + 'img/Stim/FN_002_w.png', repo_site + 'img/Stim/FN_003_w.png',
repo_site +'img/Stim/FN_004_w.png', repo_site + 'img/Stim/FN_005_w.png', repo_site + 'img/Stim/FN_006_w.png',
repo_site +'img/Stim/FN_007_w.png', repo_site + 'img/Stim/FN_008_w.png', repo_site + 'img/Stim/FN_009_w.png',
repo_site +'img/Stim/FN_010_w.png', repo_site + 'img/Stim/FN_011_w.png', repo_site + 'img/Stim/FN_012_w.png',
repo_site + 'img/Stim/FN_013_w.png', repo_site + 'img/Stim/FN_014_w.png', repo_site + 'img/Stim/FN_015_w.png',
repo_site + 'img/Stim/FN_016_w.png', repo_site + 'img/Stim/FN_017_w.png', repo_site + 'img/Stim/FN_018_w.png',
repo_site + 'img/Stim/FN_019_w.png', repo_site + 'img/Stim/FN_020_w.png', repo_site + 'img/Stim/FN_021_w.png',
repo_site + 'img/Stim/IF_001_w.png',repo_site + 'img/Stim/IF_002_w.png',repo_site + 'img/Stim/IF_003_w.png',repo_site + 'img/Stim/IF_004_w.png',
repo_site +'img/Stim/gray_bdot.png']


/* -----Randomly Generate Sitm for frequent non-trigger and frequent trigger----- */
var full_sitmuli_list = ["img/Stim/FN_001_g.png", "img/Stim/FN_002_g.png", "img/Stim/FN_003_g.png", "img/Stim/FN_004_g.png", "img/Stim/FN_005_g.png", "img/Stim/FN_006_g.png",
    "img/Stim/FN_007_g.png", "img/Stim/FN_008_g.png","img/Stim/FN_009_g.png", "img/Stim/FN_010_g.png", "img/Stim/FN_011_g.png", "img/Stim/FN_012_g.png","img/Stim/FN_013_g.png",
    "img/Stim/FN_014_g.png", "img/Stim/FN_015_g.png", "img/Stim/FN_016_g.png", "img/Stim/FN_017_g.png", "img/Stim/FN_018_g.png", "img/Stim/FN_019_g.png", "img/Stim/FN_020_g.png",
    "img/Stim/FN_021_g.png"]

//randomly select from FN_001-FN_021
var frequent_nontrigger = getRandom(full_sitmuli_list,12);

repetition = []
for (i = 0; i < frequent_nontrigger.length; i++) {
    repetition.push(Array(90).fill(frequent_nontrigger[i]))
};
repetition = repetition.flat()


var frequent_trigger = full_sitmuli_list.filter(function(val) {
  return frequent_nontrigger.indexOf(val) == -1;
});

var infrequent_target = ["img/Stim/IF_001_g.png", "img/Stim/IF_002_g.png", "img/Stim/IF_003_g.png", "img/Stim/IF_004_g.png"]

repetition_1 = []
for (i = 0; i < infrequent_target.length; i++) {
    repetition_1.push(Array(30).fill(infrequent_target[i]))
};
repetition_1 = repetition_1.flat()


/* -----Instructions----- */
var instruction = {
    type: 'instructions',
    pages: [
        /* -----instr_1----- */
        '<p style="color:black;font-size:26px">\n' +
        '        Welcome to the study! Please take a few minutes to read the instructions carefully. <br>\n' +
        '        <br>\n' +
        '        This is a two-part experiment. We will now go through the instructions for the first part. <br>\n' +
        '\n' +
        '    </p>',

       /* -----instr_2----- */
        '<p style="color:black;font-size:26px">\n' +
        '        In the first part, you will see different shapes.  <br>\n' +
        '         <br>\n' +
        '        Some shapes will appear very frequently, like these: <br>\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    <p>\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_001_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_002_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_003_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_004_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_005_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_006_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_007_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_008_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_009_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_010_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_011_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_012_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_001_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_002_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_003_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_006_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_007_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/FN_008_w.png" />\n' +
        '        <br>\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    </p>',

        /* -----instr_3----- */
        '    <p style="color:black;font-size:26px">\n' +
        '        However, occasionally, you will encounter L-shapes that look like these: <br>\n' +
        '    </p>\n' +

        '        <br>\n' +

        '    <p>\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/IF_001_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/IF_002_w.png" />\n' +
        '       <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/IF_003_w.png" /> <img src="https://ziweizhang0304.github.io/Stats_learning_trig/img/Stim/IF_004_w.png" />\n' +
        '\n' +
        '        <br>\n' +
        '    </p>\n' +

        '        <br>\n' +

        '    <p style="color:black;font-size:26px">\n' +
        '        Do NOT press any keys when you encounter these rare L-shapes. <br>\n' +
        '         And PRESS THE SPACEBAR to all the other shapes. <br>\n' +
        '        <br>\n' +
        '        The shapes will go by quickly so you should pay attention to them. <br>\n' +
        '\n' +
        '    </p>',

        /* -----instr_4----- */
        '<p style="color:black;font-size:26px">\n' +
        '    Now you will do a short practice of this part of the experiment. <br>\n' +
        '        <br>\n' +
        '    Note that you will see feedback on your performance during this practice but not during the real experiment. <br>\n'+
        '        <br>\n' +
        '    Now, click on ‘next’ to start the practice. <br>\n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
//timeline.push(instruction);


repetition = shuffle(repetition)
//console.log(repetition,repetition.length)

repetition_1 = shuffle(repetition_1)
//console.log(repetition_1,repetition_1.length)

/* ----- Selecting Stim for First 3 Trials Frequent----- */
var first3_stimuli = []
var repetition_first3 = repetition.slice(0, 3);

for (j = 0; j < repetition_first3.length; j++) {
    var stimuli_first3 = new Object();
    stimuli_first3.at_stimulus_first3 = repo_site + repetition_first3[j];

    stimuli_first3.data = new Object();


    if (stimuli_first3.at_stimulus_first3.charAt(62) == 'F') {
        stimuli_first3.data.at_TrialType = 'frequent';
        stimuli_first3.data.correct_response = 'space'
    } else {
        stimuli_first3.data.at_TrialType = 'infrequent';
        stimuli_first3.data.correct_response = ''
    }
    stimuli_first3.at_fix = rep(stimuli_first3.at_stimulus_first3);

    stimuli_first3.data.test_part = 'test';
    stimuli_first3.data.TaskType = 'at';
    first3_stimuli.push(stimuli_first3);
};

/* ----- Selecting Stim for Practice----- */
var repetition_1_prac = repetition_1.slice(0, 2);
var repetition_prac = repetition.slice(0, 8);

var prac_stimuli = []
for (i = 0; i < repetition_1_prac.length; i++) {
    repetition_prac.splice(Math.floor((Math.random() * repetition_prac.length)), 0, repetition_1_prac[i]);
}


for (j = 0; j < repetition_prac.length; j++) {
    var stimuli_prac = new Object();
    stimuli_prac.at_stimulus_prac = repo_site + repetition_prac[j];

    stimuli_prac.data = new Object();


    if (stimuli_prac.at_stimulus_prac.charAt(62) == 'F') {
        stimuli_prac.data.at_TrialType = 'frequent';
        stimuli_prac.data.correct_response = 'space'
    } else {
        stimuli_prac.data.at_TrialType = 'infrequent';
        stimuli_prac.data.correct_response = ''
    }
    stimuli_prac.at_fix = rep(stimuli_prac.at_stimulus_prac);

    stimuli_prac.data.test_part = 'prac';
    stimuli_prac.data.TaskType = 'prac';
    prac_stimuli.push(stimuli_prac);
};

/* -----Back to Selecting Main At_lr Trials----- */
var repetition_1_attention = repetition_1.slice(0, 120); //120
var repetition_attention = repetition.slice(3, 1080); //1080
//console.log(repetition_1_attention, repetition_attention)

var at_stimuli = []
for (i = 0; i < repetition_1_attention.length; i++) {
    repetition_attention.splice(Math.floor((Math.random() * repetition_attention.length)), 0, repetition_1_attention[i]);
};

/* -----attention task stimuli----- */
for (j = 0; j < repetition_attention.length; j++) {
    var stimuli = new Object();
    stimuli.at_stimulus = repo_site + repetition_attention[j];

    stimuli.data = new Object();


    if (stimuli.at_stimulus.charAt(62) == 'F') {
        stimuli.data.at_TrialType = 'frequent';
        stimuli.data.correct_response = 'space'
    } else {
        stimuli.data.at_TrialType = 'infrequent';
        stimuli.data.correct_response = ''
    }
    stimuli.at_fix = rep(stimuli.at_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'at';
    at_stimuli.push(stimuli);
}
//console.log(at_stimuli)

/* -----Back to Creating Prac Trials----- */
var prac = {
    timeline: [
        {
            type: "image-keyboard-response",
            stimulus:jsPsych.timelineVariable('at_stimulus_prac'),
            choices: ['space'],
            data: jsPsych.timelineVariable('data'),
            trial_duration: 800,
            on_finish: function (data) {
                data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
            }
        },

        {
            type: "image-keyboard-response",
            stimulus: jsPsych.timelineVariable('at_fix'),
            choices: jsPsych.NO_KEYS,
            response_ends_trial: false,
            trial_duration:function(data) {
                    if (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0] == null) {
                        var fix_duration = 0
                    } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).select('rt').values[0]); };
                    return fix_duration
                }
        }],
};

var prac_feedback = {
    type: 'html-keyboard-response',
    stimulus: function () {
        var last_trial_correct = jsPsych.data.get().filter({ TaskType: 'prac' }).last(1).values()[0].correct;
        if (last_trial_correct) {
            return '<p style="color:black"> Correct!</p>'
        } else {
            return '<p style="color:black"> Incorrect.</p>'
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
};

var prac_block = {
    timeline: [prac, prac_feedback, iti_200],
    timeline_variables: prac_stimuli,
    randomize_order: false,
    repetitions: 1
}
//timeline.push(prac_block)

var debrief = {
    type: "html-keyboard-response",
    stimulus: function () {

        var trials = jsPsych.data.get().filter({ test_part: 'prac' });
        var correct_trials = trials.filter({ correct: true });
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
            "<p>Remember that you should respond as accurately as possible. Press any key to move on.</p>";

    }
};
//timeline.push(debrief);



/* -----define learning triplet stimuli----- */
//right now we want only one group of triplet for fast, medium, slow respectively
//randomly select from FT_001-FT_009
var lr_triplet_1 = getRandom(frequent_trigger,3);

var frequent_trigger_filtered = frequent_trigger.filter(function(val) {
  return lr_triplet_1.indexOf(val) == -1;
});

var lr_triplet_2 = getRandom(frequent_trigger_filtered,3);

var frequent_trigger_filtered1 = frequent_trigger_filtered.filter(function(val) {
  return lr_triplet_2.indexOf(val) == -1;
});

var lr_triplet_3 = frequent_trigger_filtered1;



/* -----randomize triplet-attention state pair----- */
var lr_stimuli_1 = []
var lr_stimuli_2 = []
var lr_stimuli_3 = []
var attention_state_list = shuffle(['fast', 'slow']); //, 'medium'


//when we add more triplets, we need slow_1, fast_1
for (i = 0; i < lr_triplet_1.length; i++) {
    var stimuli = new Object();
    stimuli.lr_stimulus = repo_site + lr_triplet_1[i] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[0];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.lr_fix = rep(stimuli.lr_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'lr';
    lr_stimuli_1.push(stimuli);
};

for (i = 0; i < lr_triplet_2.length; i++) {
    var stimuli = new Object();
    stimuli.lr_stimulus = repo_site + lr_triplet_2[i] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[1];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.lr_fix = rep(stimuli.lr_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'lr';
    lr_stimuli_2.push(stimuli);
};
console.log(lr_stimuli_1,lr_stimuli_2);
console.log('check attention', lr_stimuli_1[0].data.attention_state)

/*for (i = 0; i < lr_triplet_3.length; i++) {
    var stimuli = new Object();
    stimuli.lr_stimulus = repo_site + lr_triplet_3[i] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[2];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.lr_fix = rep(stimuli.lr_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'lr';
    lr_stimuli_3.push(stimuli);
};*/

var lr_triplet_complete = lr_stimuli_1.concat(lr_stimuli_2); //, lr_stimuli_3
console.log(lr_triplet_complete);


var instruction2 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        Please DO NOT quit or refresh the webpage. <br>\n' +
        '        <br>\n' +
        '        Unfortunately, we are unable to approve your submission if you exit out of the page or refresh it.<br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to start the main experiment. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
//timeline.push(instruction2);



var learning = {

  timeline:[

  {type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
        },

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('lr_stimulus'),
  data: jsPsych.timelineVariable('data'),
  choices: ['space'],
  trial_duration: 800,
  response_ends_trial: true,
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var lr_trial_counter = jsPsych.data.get().filter({TaskType: 'lr'}).select('rt').values.length;
    data.lr_trial_counter = lr_trial_counter ;
  }},

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('lr_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'lr' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'lr' }).last(1).select('rt').values[0]); };
        return fix_duration
            }
        }

    ]
};


var lr_test_TS1 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_1,
  randomize_order: false,
  repetitions: 1
};

var lr_test_TS2 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_2,
  randomize_order: false,
  repetitions: 1
};


/* -----Combine learning trials----- */
/* -----First 3 trials should not have infrequent-----*/

var attention_first3 = {
  timeline:[
      {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('at_stimulus_first3'),
          choices: ['space'],
          data: jsPsych.timelineVariable('data'),
          trial_duration: 800,
          on_finish: function (data) {

              var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length

              data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
              var rt_mean = jsPsych.data.get().filter({test_part: 'test',at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
              var rt_sd = jsPsych.data.get().filter({test_part: 'test', at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

              data.at_counter = at_counter

              data.at_RunningMean = rt_mean
              data.sd = rt_sd
              data.slow = rt_mean +  rt_sd
              data.fast = Math.abs(rt_mean - rt_sd)
          }
      },


{type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0]); };
        return fix_duration
    }
}
],
};

var first3_block = {
    timeline: [attention_first3 , iti_200],
    timeline_variables: first3_stimuli,
    randomize_order: false,
    repetitions: 1
}
//timeline.push(first3_block)


/* -----After the 3rd trial-----*/
var lr_node = false;
var attention = {
  timeline:[
  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_stimulus'),
  choices: ['space'],
  data: jsPsych.timelineVariable('data'),
  trial_duration: 800,
  on_finish: function(data){

    var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length
    //var lr_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('diff').values.length
    var slow_lr_counter = jsPsych.data.get().filter({diff: 'slow'}).select('rt').values.length
    var fast_lr_counter = jsPsych.data.get().filter({diff: 'fast'}).select('rt').values.length
    var lr_counter = slow_lr_counter + fast_lr_counter //+1??

    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var rt_mean = jsPsych.data.get().filter({ at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
    var rt_sd = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

    data.at_RunningMean = rt_mean
    data.sd = rt_sd
    data.slow = rt_mean + rt_sd
    data.fast = Math.abs(rt_mean - rt_sd)
    //data.medhigh = rt_mean + 0.2*rt_sd
    //data.medlow = Math.abs(rt_mean - 0.2*rt_sd)

    data.at_counter = at_counter

    data.slow_lr_counter = slow_lr_counter
    data.fast_lr_counter = fast_lr_counter
    data.lr_counter = lr_counter
    console.log('ATTENTION!!! there are ' + at_counter + ' attention trials. KEEP GOING!!!')
    console.log('there are' + lr_counter + ' learning trials')
    console.log('there are' + fast_lr_counter + ' fast learning trials')
    console.log('there are' + slow_lr_counter + ' slow learning trials')



    if (at_counter > 3) {
        //see if the last trial was an infrequent trial
        var last_infreq = jsPsych.data.get().filter({TaskType: 'at'}).last(3).select('at_TrialType').values;
        if (last_infreq.includes('infrequent') == true) {
        console.log('there is an infreq')}

        //see if there was an error in the last 3 trials
        var last_correct = jsPsych.data.get().filter({ TaskType: 'at' }).last(3).select('correct').values;
        console.log(last_correct)
        if (last_correct.includes(false) == true){
        console.log('there is an error')}

        var last_rt = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').values;

        for (var i = 0; i<3; i++){
         if (last_rt[i] <100) {
           last_rt[i] = true
            }
        };
        if (last_rt.includes(true)) {
         console.log('too fast')};

        var last_lr = jsPsych.data.get().filter({ test_part: 'test' }).last(3).select('TaskType').values;
        if (last_lr.includes('lr')== true) {
            console.log('there is a trig trial')}

        //calculate trailing RT after the third trial
        var rt_three = jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').mean();
        data.at_TrailingMean = rt_three
        console.log(jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0])

  };

/* ----new restriction 1 starts here---- */
    //restriction 1 where the last three trials were all fast/slow then the next one can't be the same: || last_fast == false || last_slow == false
    if (at_counter > 80 && lr_counter > 0){//at_counter > 80 && lr_counter >= 6
        console.log('----new restriction 1 starts here----')

        //see if the last 3 lr trials were all fast, if so the next one can't be
        if (fast_lr_counter >=3 ) {
            var last_lr_fast = jsPsych.data.get().filter({ diff: 'fast' }).last(3).select('lr_counter').values;
            console.log(last_lr_fast)
            console.log('lr_counter for fast trials: ' + last_lr_fast)
            console.log('max for last fast trials: ' + Math.max(...last_lr_fast), Math.max(...last_lr_fast)+1)


            // if lr_counter number are not consecutive, it means that they are not in a 3 cluster,
            if (isConsecutive(last_lr_fast)) {
                if (lr_counter == Math.max(...last_lr_fast) + 1) {
                    last_fast = false}
                else (last_fast = true)
            } else {
                last_fast = true
            }
            console.log('can we trigger fast next? ' + last_fast)
        } else {
            console.log('less than 3 fast trials');
            last_fast = true
        }


        //see if the last 3 lr trials were all slow, if so the next one can't be
        if (slow_lr_counter >=3 ) {
            var last_lr_slow = jsPsych.data.get().filter({diff: 'slow'}).last(3).select('lr_counter').values;
            console.log(last_lr_slow)
            console.log('lr_counter for slow trials: ' + last_lr_slow)
            console.log('max for last slow trials: ' + Math.max(...last_lr_slow), Math.max(...last_lr_slow)+1)

            // if lr_counter number are not consecutive, it means that they are not in a 3 cluster,
            if (isConsecutive(last_lr_slow)) {
                if (lr_counter == Math.max(...last_lr_slow) + 1) {
                    last_slow = false}
                else (last_slow = true)
            } else {
                last_slow = true
            }
        console.log('can we trigger slow next? ' + last_slow)
        } else {
            console.log('less than 3 slow trials');
            last_slow = true
        }
      };

    /* ----new restriction 2 starts here---- */
    //restriction 2 where in first 6, s fast 3 slow: ||initial_slow == false || initial_fast == false
    if ( 0< lr_counter && lr_counter <= 6 ) {
        console.log('----new restriction 2 starts here----')
        // check how many fast and how many slow have already been encountered
        console.log('here is initial learning trial: ' + lr_counter)
        var initial = jsPsych.data.get().filter({ test_part: 'test' }).select('diff').values


        var initial_fast_count = countItems(initial, 'fast')
        var initial_slow_count = countItems(initial, 'slow')

        // if there's 0, 1, 2 slow, slow can happen; if there's 3 slow, then don't trigger even reaching a slow threshold
        if (initial_fast_count < 3) {
            initial_fast = true
        } else {
            initial_fast = false
        }

        // if there's 0, 1, 2 fast, fast can happen; if there's 3 fast, then don't trigger even reaching a fast threshold
        if (initial_slow_count < 3) {
            initial_slow = true
        } else {
            initial_slow = false
        };

      }  else {console.log('no learing yet or more than 6 learning trials')};



    /*---- Start appying restrictions to triggering ----*/

    /*-- If attention <= 80 --*/
    if (at_counter < 80 || last_infreq.includes('infrequent')
        || last_correct.includes(false) || last_rt.includes(true) || last_lr.includes('lr')){
        lr_node = 0 //80th trial
    }

    else if (at_counter > 80 && lr_counter > 0 && lr_counter < 6){


      /*-- If attention > 80 && 0< learning <=6 --*/
      if(rt_three > rt_mean+ rt_sd && initial_slow == true)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd) && initial_fast == true)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
            else {lr_node = 0}
            /*      else if (rt_three < rt_mean+ 0.2 * rt_sd && rt_three > Math.abs(rt_mean- 0.2 * rt_sd)){
                lr_node = 3; //medium triggering should use three nodes...
                console.log('lr_node = true')
            }*/
      }


    else if (at_counter > 80 && lr_counter >= 6){

      /*-- If attention > 80 && learning > 6 --*/
      if(rt_three > rt_mean+ rt_sd && last_slow == true)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd) && last_fast == true)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
            else {lr_node = 0}

    }

    /*-- If attention > 80 && learning = 0 --*/
    else if (at_counter > 80 && lr_counter == 0) {

        if(rt_three > rt_mean+ rt_sd) {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd))
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
            else {lr_node = 0}};

    }
  },


{type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0]); };
        return fix_duration
        }
    }
    ],
};


if (lr_stimuli_1[0].data.attention_state == 'fast') {
    var fast_lr = lr_test_TS1
    var slow_lr = lr_test_TS2
} else {
    var slow_lr = lr_test_TS1
    var fast_lr = lr_test_TS2}

var if_node_1= { //slow node
  timeline: [slow_lr],
  conditional_function: function(data){
    if (lr_node == 1){
      return true;
    } else {return false}
  }
};

var if_node_2= { //fast node
  timeline: [fast_lr],
  conditional_function: function(data){
    if (lr_node == 2){
      return true;
    } else{return false}
  }
};


var at_test_procedure = {
  timeline: [attention,if_node_1,if_node_2,iti_200],
  timeline_variables: at_stimuli,
  randomize_order: false,
  repetitions: 1
}
//timeline.push(at_test_procedure);



/* --------------- Post Tests --------------- */


//place holder for TD for each 4 bins
TD_list = []

// draw 9 TD foils from 12 total possible
var frequent_nontrigger_TD = getRandom(frequent_nontrigger,9);
console.log(frequent_nontrigger_TD)

var TD_range = range(3,6)

for (j = 0; j < range(0,1).length; j++) {

    TD_range.forEach( function myFunction(value) {
        console.log(value)
      foil_1 = getRandom(frequent_nontrigger_TD,value);
      foil_2 = frequent_nontrigger_TD.filter(function(val) {
      return foil_1.indexOf(val) == -1;
            })

    if (j==0) {
      var TD_1 = foil_1.concat(lr_triplet_1, foil_2); //still array of raw image names
      TD_list =  repeat_push(TD_list, TD_1, 3)
    }
    else if (j==1) { var TD_2 = foil_1.concat(lr_triplet_2, foil_2); //still array of raw image names
     TD_list =  repeat_push(TD_list, TD_2, 3)}
    })
}
console.log(TD_list) // this is a object with 24 arrays, each array has a length of 12

TD_stimuli = []
var target_length = lr_triplet_1.length // 3
var foil_length = frequent_nontrigger_TD.length // 9
var sequence_length = target_length + foil_length // 9+3 = 12
var possible_positions = sequence_length - 6 - 2 // 12 - (3+3) - 2 = 4
var TD_sequence_number = possible_positions * target_length * 2 // 12 * 2 =24


    for (j = 0; j < TD_list.length; j++) {
        var TD = TD_list[j];

        for (i = 0; i < TD.length; i++) {


            var stimuli = new Object();
            stimuli.TD_stimulus = repo_site + TD[i];
            stimuli.data = new Object();

            if (lr_triplet_1.includes(TD[i])) {

                stimuli.data.triplet_type = attention_state_list[0];
                /*            for (k = 0; k < range(0,2).length; k++) {
                                stimuli.target == lr_triplet_1[k]}*/

            } else if (lr_triplet_2.includes(TD[i])) {
                stimuli.data.triplet_type = attention_state_list[1];
                /*            for (k = 0; k < range(0,2).length; k++) {
                                stimuli.target == lr_triplet_2[k]}*/

            } else {
                stimuli.data.triplet_type = 'foil';
            }
            ;

            stimuli.at_fix = rep(stimuli.TD_stimulus)
            stimuli.data.test_part = 'post';
            stimuli.data.TaskType = 'TD';
            stimuli.data.correct_response = '';
            stimuli.data.TD_target = '';
            TD_stimuli.push(stimuli);
        }
    }


var target_location = []
var a_range = (TD_sequence_number/target_length) // 24/3 = 8
for (a = 0; a < range(0,TD_sequence_number-1).length; a++) { // a loop of 24 sequences with each having length of 12 24/3 = 8
    console.log(a)
    if (a < 12){
        if (a == 0){
            var b = 3 }
        else if (a != 0 && a % 3 == 0){
            var b = target_location[a-1] + sequence_length - 1 }
        else {
            var b = target_location[a-1] + sequence_length + 1 }
        target_location.push(b)
    }

    else if (a >= 12){
        if (a == 12) {var c = 147 }
        else if (a != 12 && a % 3 == 0){
            var c = target_location[a-1] + sequence_length - 1 }
        else {
            var c = target_location[a-1] + sequence_length + 1 }

        target_location.push(c)}
    }

console.log(target_location)
console.log(TD_stimuli)

target_location.forEach(function myFunction(value) {
        console.log('this is c value ' + value)
        TD_stimuli[value].data.correct_response = 'space'
        TD_stimuli[value].data.TD_target = 'TD_target'

    })


//loop through each list of 8 lists of TD trial sequences and assign a target each time

/* -----Part 1: TD----- */
var instruction3 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        You have finished the first part of the Study! <br>\n' +
        '        <br>\n' +
        '        In this part of the study, you will press a button when you see some certain shapes. <br>\n' +
        '        <br>\n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        At the start of each trial, you will see one shape. <br>\n' +
        '        <br>\n' +
        '        You will then see a series of shapes, presented one at a time just like in the first part of the study. <br>\n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        Whenever you see the shape presented at the beginning of the trial, press the SPACEBAR. <br>\n' +
        '        <br>\n' +
        '        Do not press any button to any other shape. <br>\n' +
        '        <br>\n' +
        '        The shapes will go by very fast so please respond quickly and accurately. <br>\n' +
        '        <br>\n' +
        '        Click on "Next" to move on. <br> \n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        Now you will do a short practice of this part. <br>\n' +
        '        <br>\n' +
        '        Click “Next” to start the practice. <br>\n' +
        '</p> <br>',

    ],
    show_clickable_nav: true,
}
//timeline.push(instruction3);


// practice
var TD_list_prac = []
for (j = 0; j < range(0,2).length; j++) {

     foil = shuffle(frequent_nontrigger);
     TD_list_prac.push(foil)
    }



TD_stimuli_prac = []

for (j = 0; j < TD_list_prac.length; j++) {
        var TD_prac = TD_list_prac[j];
        //console.log(TD_prac)

        for (i = 0; i < TD_prac.length; i++) {


            var stimuli = new Object();
            stimuli.TD_stimulus = repo_site + TD_prac[i];
            stimuli.data = new Object();


            stimuli.at_fix = rep(stimuli.TD_stimulus)
            stimuli.data.test_part = 'post_prac';
            stimuli.data.TaskType = 'TD';
            stimuli.data.correct_response = '';
            stimuli.data.TD_target = '';
            TD_stimuli_prac.push(stimuli);
        }
    }

//target_location_prac = [3,4,5]
var target_location_prac = []
for (a = 0; a < range(0,2).length; a++) { // a loop of 24 sequences with each having length of 12 24/3 = 8

        if (a == 0){
            var b = 3 }
        else {
            var b = target_location_prac[a-1] + sequence_length + 1 }
        target_location_prac.push(b)
    }

console.log(target_location_prac)

target_location_prac.forEach(function myFunction(value) {
        console.log('this is c value ' + value)
        TD_stimuli_prac[value].data.correct_response = 'space'
        TD_stimuli_prac[value].data.TD_target = 'TD_target'

    })

var instruction4 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */

        '<p style="color:black;font-size: 26px">\n' +
        '        You have finished the practice part. <br>\n' +
        '        <br>\n' +
        '        Now click “Next” to start this part of the experiment. <br>\n' +
        '</p> <br>',

    ],
    show_clickable_nav: true,
}

// real TD trials
var TD_trial = {
  timeline:[

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('TD_stimulus'),
  choices:['space'],
  data: jsPsych.timelineVariable('data'),
  trial_duration: 300,
  on_finish: function(data){

    var TD_counter = jsPsych.data.get().filter({test_part: 'post'}).select('rt').values.length;
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response)
    data.TD_counter = TD_counter}
    },

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration:function(data) {
       if (jsPsych.data.get().filter({ TaskType: 'TD' }).last(1).select('rt').values[0] == null) {
          var fix_duration = 0
          } else { var fix_duration = 300 - (jsPsych.data.get().filter({ TaskType: 'TD' }).last(1).select('rt').values[0]); };
            return fix_duration
  }},

  {type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 40,
    }

  ]
};

var TD_trial_prac = {
  timeline:[

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('TD_stimulus'),
  choices:['space'],
  data: jsPsych.timelineVariable('data'),
  trial_duration:300,
  on_finish: function(data){

    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response)}
    },

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration:function(data) {
       if (jsPsych.data.get().filter({ TaskType: 'TD' }).last(1).select('rt').values[0] == null) {
          var fix_duration = 0
          } else { var fix_duration = 300 - (jsPsych.data.get().filter({ TaskType: 'TD' }).last(1).select('rt').values[0]); };
            return fix_duration
  }},

  {type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 40,
    }

  ]
};


//debriefing page for TD
var debrief_TD = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: function () {

        var trials = jsPsych.data.get().filter({ test_part: 'post' }).last(12);
        var wrong_press = trials.filter([{ correct: false , correct_response:''}]).count()
        var correct_press = trials.filter([{ correct: true ,  correct_response:'space'}]).count()


        console.log(wrong_press)
        console.log('practice trial 1'+ trials.filter([{ correct: false , correct_response:''}]).values())
        console.log(correct_press)
        console.log('practice trial 1'+ trials.filter([{ correct: true , correct_response:'space'}]).values())


        if (wrong_press != 0 )
        {return "<p>You have pressed a button to an incorrect shape. </b> Please respond more accurately. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>";}
        else if ( wrong_press == 0 && correct_press == 1){
            return "<p>Good job! You have pressed a button to a correct shape. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>"}
        else if ( wrong_press == 0 && correct_press == 0){
            return "<p>You have not pressed a button to the correct shape. </b> Please respond more accurately. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>"}
    }
};



var debrief_TD_prac = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: function () {

        var trials = jsPsych.data.get().filter({ test_part: 'post_prac' }).last(12);
        var wrong_press = trials.filter([{ correct: false , correct_response:''}]).count()
        var correct_press = trials.filter([{ correct: true ,  correct_response:'space'}]).count()


        console.log(wrong_press)
        console.log('practice trial 1'+ trials.filter([{ correct: false , correct_response:''}]).values())
        console.log(correct_press)
        console.log('practice trial 1'+ trials.filter([{ correct: true , correct_response:'space'}]).values())


        if (wrong_press != 0 )
        {return "<p>You have pressed a button to an incorrect shape. </b> Please respond more accurately. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>";}
        else if ( wrong_press == 0 && correct_press == 1){
            return "<p>Good job! You have pressed a button to a correct shape. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>"}
        else if ( wrong_press == 0 && correct_press == 0){
            return "<p>You have not pressed a button to the correct shape. </b> Please respond more accurately. </p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> Press enter to move on.</p>"}
    }
};


/*--------- Real TD --------- */

var TD_target = TD_stimuli.slice(0,12)[3].TD_stimulus
var TD_target_present_1 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
/*var TD_trial_sequence_1 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(0,12), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};*/

var animation_sequence_1 = get_values_bykey(TD_stimuli.slice(0,12))
console.log(animation_sequence_1)
var TD_trial_sequence_1 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_1,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = jsPsych.data.get().last(1).select('animation_sequence').values
        console.log(animation_sequence)
        var response = jsPsych.data.get().last(1).select('response').values

        //in animation_sequence, find where the stimulus value is target, grab the time as onset
        var onset = get_target_time(animation_sequence,TD_target,'onset')
        //in response, find where the the stimulus value is target, grab the rt as offset, rt = offset - onset
        var offset = get_target_time(response,TD_target,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target
    }
};
var TD1 = {
    timeline: [TD_target_present_1 , TD_trial_sequence_1],
    randomize_order: false,
    repetitions: 1
};



var TD_target = TD_stimuli.slice(12,24)[4].TD_stimulus
var TD_target_present_2 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
/*var TD_trial_sequence_2 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(12,24), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};*/

var animation_sequence_2 = get_values_bykey(TD_stimuli.slice(12,24))
console.log(animation_sequence_2)
var TD_trial_sequence_2 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_2,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = jsPsych.data.get().last(1).select('animation_sequence').values
        console.log(animation_sequence)
        var response = jsPsych.data.get().last(1).select('response').values

        //in animation_sequence, find where the stimulus value is target, grab the time as onset
        var onset = get_target_time(animation_sequence,TD_target,'onset')
        //in response, find where the the stimulus value is target, grab the rt as offset, rt = offset - onset
        var offset = get_target_time(response,TD_target,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target
    }
};
var TD2 = {
    timeline: [TD_target_present_2 , TD_trial_sequence_2],
    randomize_order: false,
    repetitions: 1
};



var TD_target_present_3 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(24,36)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_3 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(24,36), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD3 = {
    timeline: [TD_target_present_3 , TD_trial_sequence_3,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_4 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(36,48)[4].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_4 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(36,48), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD4 = {
    timeline: [TD_target_present_4 , TD_trial_sequence_4,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_5 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(48,60)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_5 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(48,60), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD5 = {
    timeline: [TD_target_present_5 , TD_trial_sequence_5,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_6 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(60,72)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_6 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(60,72), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD6 = {
    timeline: [TD_target_present_6 , TD_trial_sequence_6,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_7 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(72,84)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_7 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(72,84), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD7 = {
    timeline: [TD_target_present_7 , TD_trial_sequence_7,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_8 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(84,96)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_8 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(84,96), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD8 = {
    timeline: [TD_target_present_8 , TD_trial_sequence_8,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_9 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(96,108)[7].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_9 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(96,108), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD9 = {
    timeline: [TD_target_present_9 , TD_trial_sequence_9,debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_10 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(108,120)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_10 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(108,120), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD10 = {
    timeline: [TD_target_present_10 , TD_trial_sequence_10], //,debrief_TD
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_11 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(120,132)[7].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_11 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(120,132), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD11 = {
    timeline: [TD_target_present_11, TD_trial_sequence_11, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_12 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(132,144)[8].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_12 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(132,144), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD12 = {
    timeline: [TD_target_present_12, TD_trial_sequence_12, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_13 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(144,156)[3].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_13 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(144,156), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD13 = {
    timeline: [TD_target_present_13, TD_trial_sequence_13, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_14 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(156,168)[4].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_14 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(156,168), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD14 = {
    timeline: [TD_target_present_14, TD_trial_sequence_14, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_15 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(168,180)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_15 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(168,180), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD15 = {
    timeline: [TD_target_present_15, TD_trial_sequence_15, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_16 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(180,192)[4].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_16 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(180,192), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD16 = {
    timeline: [TD_target_present_16, TD_trial_sequence_16, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_17 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(192,204)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_17 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(192,204), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD17 = {
    timeline: [TD_target_present_17, TD_trial_sequence_17, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_18 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(204,216)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_18 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(204,216), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD18 = {
    timeline: [TD_target_present_18, TD_trial_sequence_18, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_19 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(216,228)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_19 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(216,228), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD19 = {
    timeline: [TD_target_present_19, TD_trial_sequence_19, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_20 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(228,240)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_20 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(228,240), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD20 = {
    timeline: [TD_target_present_20, TD_trial_sequence_20, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_21 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(240,252)[7].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_21 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(240,252), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD21 = {
    timeline: [TD_target_present_21, TD_trial_sequence_21, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_22 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(252,264)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_22 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(252,264), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD22 = {
    timeline: [TD_target_present_22, TD_trial_sequence_22, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_23 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(264,276)[7].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_23 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(264,276), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD23 = {
    timeline: [TD_target_present_23, TD_trial_sequence_23, debrief_TD],
    randomize_order: false,
    repetitions: 1
};


var TD_target_present_24 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(276,288)[8].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var TD_trial_sequence_24 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(276,288), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};
var TD24 = {
    timeline: [TD_target_present_24, TD_trial_sequence_24, debrief_TD],
    randomize_order: false,
    repetitions: 1
};

/*--------- TD practice --------- */
console.log(TD_stimuli.slice(0,12))
var TD_target_present_1_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli_prac.slice(0,12)[3].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};


var TD_trial_sequence_1_prac = {
    timeline: [TD_trial_prac],
    timeline_variables: TD_stimuli_prac.slice(0,12), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};

var TD1_prac = {
    timeline: [TD_target_present_1_prac , TD_trial_sequence_1_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};

var TD_target_present_2_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli_prac.slice(12,24)[4].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

// TD practice trial 2
console.log(TD_stimuli_prac.slice(12,24))
var TD_trial_sequence_2_prac = {
    timeline: [TD_trial_prac],
    timeline_variables: TD_stimuli_prac.slice(12,24), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};

var TD2_prac = {
    timeline: [TD_target_present_2_prac , TD_trial_sequence_2_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};


// TD practice trial 3
console.log(TD_stimuli_prac.slice(24,36))
var TD_target_present_3_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli_prac.slice(24,36)[5].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};


var TD_trial_sequence_3_prac = {
    timeline: [TD_trial_prac],
    timeline_variables: TD_stimuli_prac.slice(24,36), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};

var TD3_prac = {
    timeline: [TD_target_present_3_prac , TD_trial_sequence_3_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};

//practice block
var Array_TD_prac = [TD1_prac, TD2_prac, TD3_prac];
var shuffledTD_prac = jsPsych.randomization.repeat(Array_TD_prac, 1)
var practice_presentation = {
    timeline: shuffledTD_prac,
    randomize_order: false,
    repetitions: 1
}
//timeline.push(practice_presentation);
timeline.push(instruction4);


//real TD block
var Array_TD = [TD1, TD2
/*                , TD3, TD4, TD5, TD6,
               TD7, TD8 ,TD9, TD10, TD11, TD12,
               TD13, TD14 ,TD15, TD16, TD17, TD18,
               TD19, TD20 ,TD21, TD22, TD23, TD24*/
];
var shuffledTD = jsPsych.randomization.repeat(Array_TD, 1)
var target_presentation = {
    timeline: shuffledTD,
    randomize_order: false,
    repetitions: 1
}
timeline.push(target_presentation);

/* -----Part 2: Recreate----- */
//drag and drop
var instruction5 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        Some of the shapes you saw in the first part of the study in fact appeared in a regular order. <br>\n' +
        '        <br>\n' +
        '        Therefore, in this section, we will ask you to recreate groups of 3 shapes that you remember from the first part of the experiment. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
timeline.push(instruction5);


var sorting_stimuli= [];
var lr_triplet_full = lr_triplet_1.concat(lr_triplet_2)
for (var i = 0; i < lr_triplet_full.length; i++) {
    sorting_stimuli.push(repo_site + lr_triplet_full[i]);
}
console.log(sorting_stimuli);

var sort_trial_1 = {
    type: 'free-sort',
    stimuli: sorting_stimuli.slice(0,3),
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the experiment.<br>  Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, and the shape that you remember seeing third to the right. <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box.</p>',
    stim_height: 50,
    stim_width: 50,
    scale_factor: 2.5,
    border_width: 2,
    sort_area_shape: "square",
    stim_starts_inside:false,
    sort_area_height: 100,
    sort_area_width: 300,
    column_spread_factor: 1.5
};
timeline.push(sort_trial_1);


var sort_trial_2 = {
    type: 'free-sort',
    stimuli: sorting_stimuli.slice(3,6),
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the experiment.<br>  Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, and the shape that you remember seeing third to the right. <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box.</p>',
    stim_height: 50,
    stim_width: 50,
    scale_factor: 2.5,
    border_width: 2,
    sort_area_shape: "square",
    stim_starts_inside:false,
    sort_area_height: 100,
    sort_area_width: 300,
    column_spread_factor: 3
};
timeline.push(sort_trial_2);



/* -----A Few Q on Rules----- */
var FR_Q1 = {
    type: 'survey-text',
    questions: [
    {prompt: '<p> When you were playing the game, did you noticed the presence of regular sequence of 3 shapes before the instruction told you so? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p>', name: FR_Q1, rows: 5, columns: 80, required: true},
  ],
};
timeline.push(FR_Q1);




/* -----Demographics----- */
var DemoQ1_options = ["Male", "Female", "Gender Non-conforming", "Other", "Choose not to respond"];
var DemoQ2_options = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75-84", "85 or older"];
var DemoQ3_options = ["Hispanic/Latino", "Not Hispanic/Latino", "Choose not to respond"];
var DemoQ4_options = ["American Indian/Native American","White", "Black/African American", "Asian", "Native Hawaiian or Pacific Islander", "More than one race", "Other","Choose not to respond"];
var DemoQ5_options = ["Less than a high school diploma", "High school degree or equivalent (e.g. GED)", "Some college, no degree", "Associate degree (e.g. AA, AS)", "College degree", "Master's degree (e.g. MA, MS, MEd)", "Doctorate or professional degree (e.g. MD, DDS, PhD)"];


var multi_choice_Demo = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: 'Please answer some further questions on demographics.',
    questions: [
        { prompt: "What is your gender?", name: 'DemoQ1', options: DemoQ1_options, required: true },
        { prompt: "What is your age?", name: 'DemoQ2', options: DemoQ2_options, required: true },
        { prompt: "What is your Ethnicity?", name: 'DemoQ3', options: DemoQ3_options, required: true },
        { prompt: "How would you describe yourself? Please select all that apply.", name: 'DemoQ4', options: DemoQ4_options, required: true },
        { prompt: "What is the highest degree or level of school you have completed?", name: 'DemoQ5', options: DemoQ5_options, required: true },
    ],
};
timeline.push(multi_choice_Demo);

var interaction_data = jsPsych.data.getInteractionData();
jsPsych.data.checks = interaction_data;


function save_data_csv() {
    jQuery.ajax({
        type: 'post',
        cache: false,
        url: save_url,
        data: {
            data_dir: data_dir,
            file_name: file_name + '.csv', // the file type should be added
            exp_data: jsPsych.data.get().csv()
        }
    });
}


jsPsych.init({
    timeline: timeline,
    display_element: 'display_stage',
    preload_images: preload_list,
    on_finish: function () {
        save_data_csv();
    }
});

