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
        //console.log('this is item number ' + value)
        TD_stimuli_list.push(value.TD_stimulus)

    })
    return TD_stimuli_list;
};

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};


function get_target_time(animation_sequence,response, TD_target,set) {

    var time = []
    var shapes_reacted_to = []
    var shapes_reacted_to_index = []
    var target_index = findWithAttr(animation_sequence, 'stimulus', TD_target)
    //console.log(target_index)

    function checkindex(index) {
                    var index_after_target = index > target_index
                    return  index_after_target;}

    if (set =='onset') {
        animation_sequence.forEach(function myFunction(value) {
            //console.log('this is shape ' + value)
            if (value.stimulus == TD_target) {
                //get index of target
                time.push(value.time)
        }
    })
}

    if (set =='offset'){
            var shapes_rt_index_after_target = []

            response.forEach(function myFunction(value) {
            var shape = value.stimulus
            //console.log(shape)
            shapes_reacted_to.push(shape)
            var shape_index = findWithAttr(animation_sequence, 'stimulus', shape)
            shapes_reacted_to_index.push(shape_index)

            if (shape == TD_target) {
                time.push(value.rt)
                }
            else if (shape_index > target_index){
                //console.log('this is post target')
                shapes_rt_index_after_target.push(value.rt)
                //console.log(shapes_rt_index_after_target)
            }

    })

            //for every index in shapes_reacted_to_index, if all of them < target_index, then log
            if (shapes_reacted_to_index.every( (val) => val <target_index) && shapes_reacted_to.includes(TD_target) == false ) {
                //console.log('pressed before target')
                //console.log(shapes_reacted_to_index.every( (val) => val <target_index))
            }

            //if any of them > target_index and no press to target, then take the rt of the first after target
            else if(shapes_reacted_to_index.some(checkindex) && shapes_reacted_to.includes(TD_target) == false){ // Returns true
                time.push(shapes_rt_index_after_target[0])
                //console.log(shapes_reacted_to_index.some(checkindex))
                //console.log(shapes_rt_index_after_target)
            }
    };
    return time[0]
};

var getPermutations = function(list, maxLen) {
    // Copy initial values as arrays
    var perm = list.map(function(val) {
        return [val];
    });
    // Our permutation generator
    var generate = function(perm, maxLen, currLen) {
        // Reached desired length
        if (currLen === maxLen) {
            return perm;
        }
        // For each existing permutation
        for (var i = 0, len = perm.length; i < len; i++) {
            var currPerm = perm.shift();
            // Create new permutation
            for (var k = 0; k < list.length; k++) {
                perm.push(currPerm.concat(list[k]));
            }
        }
        // Recurse
        return generate(perm, maxLen, currLen + 1);
    };
    // Start with size 1 because of initial values
    return generate(perm, maxLen, 1);
};

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
};

function looseJsonParse(obj) {
  return eval(`(${obj})`);
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
  choices: ['space'],//jsPsych.NO_KEYS,
  trial_duration: 200,
  response_ends_trial: false
};


/* -----Preload Images----- */
preload_list = [repo_site + 'img/Stim/FN_001_g.png', repo_site + 'img/Stim/FN_002_g.png', repo_site + 'img/Stim/FN_003_g.png',
repo_site +'img/Stim/FN_004_g.png', repo_site + 'img/Stim/FN_005_g.png', repo_site + 'img/Stim/FN_006_g.png',
repo_site +'img/Stim/FN_007_g.png', repo_site + 'img/Stim/FN_008_g.png', repo_site + 'img/Stim/FN_009_g.png',
repo_site +'img/Stim/FN_010_g.png', repo_site + 'img/Stim/FN_011_g.png', repo_site + 'img/Stim/FN_012_g.png',
repo_site + 'img/Stim/FN_013_g.png', repo_site + 'img/Stim/FN_014_g.png', repo_site + 'img/Stim/FN_015_g.png',
repo_site + 'img/Stim/FN_016_g.png', repo_site + 'img/Stim/FN_017_g.png', repo_site + 'img/Stim/FN_018_g.png',
repo_site + 'img/Stim/FN_019_g.png', repo_site + 'img/Stim/FN_020_g.png', repo_site + 'img/Stim/FN_021_g.png',
repo_site + 'img/Stim/FN_021_g.png', repo_site + 'img/Stim/FN_022_g.png', repo_site + 'img/Stim/FN_023_g.png',
repo_site + 'img/Stim/FN_024_g.png', repo_site + 'img/Stim/FN_025_g.png', repo_site + 'img/Stim/FN_026_g.png',
repo_site + 'img/Stim/IF_001_g.png',repo_site + 'img/Stim/IF_002_g.png',repo_site + 'img/Stim/IF_003_g.png',repo_site + 'img/Stim/IF_004_g.png',
repo_site + 'img/Stim/FN_001_w.png', repo_site + 'img/Stim/FN_002_w.png', repo_site + 'img/Stim/FN_003_w.png',
repo_site +'img/Stim/FN_004_w.png', repo_site + 'img/Stim/FN_005_w.png', repo_site + 'img/Stim/FN_006_w.png',
repo_site +'img/Stim/FN_007_w.png', repo_site + 'img/Stim/FN_008_w.png', repo_site + 'img/Stim/FN_009_w.png',
repo_site +'img/Stim/FN_010_w.png', repo_site + 'img/Stim/FN_011_w.png', repo_site + 'img/Stim/FN_012_w.png',
repo_site + 'img/Stim/FN_013_w.png', repo_site + 'img/Stim/FN_014_w.png', repo_site + 'img/Stim/FN_015_w.png',
repo_site + 'img/Stim/FN_016_w.png', repo_site + 'img/Stim/FN_017_w.png', repo_site + 'img/Stim/FN_018_w.png',
repo_site + 'img/Stim/FN_019_w.png', repo_site + 'img/Stim/FN_020_w.png', repo_site + 'img/Stim/FN_021_w.png',
repo_site + 'img/Stim/FN_022_w.png', repo_site + 'img/Stim/FN_023_w.png', repo_site + 'img/Stim/FN_024_w.png',
repo_site + 'img/Stim/FN_025_w.png', repo_site + 'img/Stim/FN_026_w.png', repo_site + 'img/Stim/IF_001_w.png',
repo_site + 'img/Stim/IF_002_w.png',repo_site + 'img/Stim/IF_003_w.png',repo_site + 'img/Stim/IF_004_w.png',
repo_site +'img/Stim/gray_bdot.png']


/* -----Randomly Generate Sitm for frequent non-trigger and frequent trigger----- */
var full_sitmuli_list = ["img/Stim/FN_001_g.png", "img/Stim/FN_002_g.png", "img/Stim/FN_003_g.png", "img/Stim/FN_004_g.png", "img/Stim/FN_005_g.png", "img/Stim/FN_006_g.png",
    "img/Stim/FN_007_g.png", "img/Stim/FN_008_g.png","img/Stim/FN_009_g.png", "img/Stim/FN_010_g.png", "img/Stim/FN_011_g.png", "img/Stim/FN_012_g.png","img/Stim/FN_013_g.png",
    "img/Stim/FN_014_g.png", "img/Stim/FN_015_g.png", "img/Stim/FN_016_g.png", "img/Stim/FN_017_g.png", "img/Stim/FN_018_g.png", "img/Stim/FN_019_g.png", "img/Stim/FN_020_g.png",
    "img/Stim/FN_021_g.png","img/Stim/FN_022_g.png","img/Stim/FN_023_g.png","img/Stim/FN_024_g.png","img/Stim/FN_025_g.png","img/Stim/FN_026_g.png"]

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
var repetition_1_attention = repetition_1.slice(0, 12); //120
var repetition_attention = repetition.slice(3, 108); //1080
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
//timeline.push(prac_block);

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

var frequent_trigger_filtered1 = frequent_trigger_filtered.filter(function(val) { //these should be the 8 filler shapes
  return lr_triplet_2.indexOf(val) == -1;
});

var fillers_shapes_1 = getRandom(frequent_trigger_filtered1,4); //4 shapes for fast filler
//console.log(fillers_shapes_1.length)

var fillers_shapes_2 = frequent_trigger_filtered1.filter(function(val) { //4 shapes for slow filler
  return fillers_shapes_1.indexOf(val) == -1;
});

//should have fillers_1 for slow and fillers_2 for fast
var fillers_1 = getPermutations(fillers_shapes_1 , 3); //permutations of fillers P(4,3)
for(i = 0; i < fillers_1.length; i++) {
    if (hasDuplicates(fillers_1[i])) {
    fillers_1.splice(i, 1);
    }
};
for(i = 0; i < fillers_1.length; i++) {
    if (hasDuplicates(fillers_1[i])) {
    fillers_1.splice(i, 1);
    }
};
for(i = 0; i < fillers_1.length; i++) {
    if (hasDuplicates(fillers_1[i])) {
    fillers_1.splice(i, 1);
    }
};
fillers_1 = shuffle(fillers_1);

// this is picking one list of 3 triplet stimuli at random
fl_stimuli_triple = []
for (i = 0; i < fillers_1.length; i++){
    tri = [0+i*3,1+i*3,2+i*3];
    fl_stimuli_triple.push(tri)
};
//console.log(fl_stimuli_triple);

var fillers_2 = getPermutations(fillers_shapes_2 , 3); //permutations of fillers P(4,3)

for(i = 0; i < fillers_2.length; i++) {
if (hasDuplicates(fillers_2[i])) {
    fillers_2.splice(i, 1);
    }
};
for(i = 0; i < fillers_2.length; i++) {
    if (hasDuplicates(fillers_2[i])) {
    fillers_2.splice(i, 1);
    }
};
for(i = 0; i < fillers_2.length; i++) {
    if (hasDuplicates(fillers_2[i])) {
    fillers_2.splice(i, 1);
    }
};
fillers_2 = shuffle(fillers_2);
//console.log(fillers_1, fillers_2)


/* -----randomize triplet-attention state pair----- */
var lr_stimuli_1 = []
var lr_stimuli_2 = []
var fl_stimuli_1 = []
var fl_stimuli_2 = []
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
//console.log(lr_stimuli_1,lr_stimuli_2);


for (i = 0; i < fillers_1.length; i++) { //72
    var fil = fillers_1[i];

    for (j = 0; j < fil.length; j++) {

    var stimuli = new Object();
    stimuli.fl_stimulus = repo_site + fil[j] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[0];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.fl_fix = rep(stimuli.fl_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'fl';

    fl_stimuli_1.push(stimuli)
    };

};

for (i = 0; i < fillers_2.length; i++) { //72
    var fil = fillers_2[i];

    for (j = 0; j < fil.length; j++) {

    var stimuli = new Object();
    stimuli.fl_stimulus = repo_site + fil[j] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[1];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.fl_fix = rep(stimuli.fl_stimulus);

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'fl';

    fl_stimuli_2.push(stimuli);
    };
};

var filler_complete = fillers_1.concat(fillers_2);
//console.log(fl_stimuli_1);
//console.log(fl_stimuli_2);


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


var filler = {

  timeline:[

  {type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
        },

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('fl_stimulus'),
  data: jsPsych.timelineVariable('data'),
  choices: ['space'],
  trial_duration: 800,
  response_ends_trial: true,
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var filler_trial_counter = jsPsych.data.get().filter({TaskType: 'fl'}).select('rt').values.length;
    data.filler_trial_counter = filler_trial_counter ;

    console.log(jsPsych.data.get().filter({TaskType: 'fl'}).select('rt').values)
  }},

  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('fl_fix'),
  choices: jsPsych.NO_KEYS,
  response_ends_trial: false,
  trial_duration: function (data) {
        if (jsPsych.data.get().filter({ TaskType: 'fl' }).last(1).select('rt').values[0] == null) {
            var fix_duration = 0
        } else { var fix_duration = 800 - (jsPsych.data.get().filter({ TaskType: 'fl' }).last(1).select('rt').values[0]); };
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
var lr_node = false;
var filler_node = false;

var fast_fl_index = 0;
var slow_fl_index = 0;
var fl_ind_1 = 0;
var fl_ind_2 = 0;
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
//timeline.push(first3_block);


/* -----After the 3rd trial-----*/

var attention = {
  timeline:[
  {type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('at_stimulus'),
  choices: ['space'],
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){

    var at_counter = jsPsych.data.get().filter({TaskType: 'at'}).select('rt').values.length
    var slow_lr_counter = jsPsych.data.get().filter({diff: 'slow'}).select('rt').values.length
    var fast_lr_counter = jsPsych.data.get().filter({diff: 'fast'}).select('rt').values.length
    var lr_counter = slow_lr_counter + fast_lr_counter //+1??
    fast_fl_index = jsPsych.data.get().filter({filler: 'fast'}).select('rt').values.length
    slow_fl_index = jsPsych.data.get().filter({filler: 'slow'}).select('rt').values.length
    var slow_lr_filler = jsPsych.data.get().filter({filler: 'slow'}).select('rt').values.length // this counts how many fillers have been inserted
    var fast_lr_filler = jsPsych.data.get().filter({filler: 'fast'}).select('rt').values.length
    var fl_counter = slow_lr_filler + fast_lr_filler


    if (fl_stimuli_1[0].data.attention_state == 'fast') {
            fl_ind_2 = slow_fl_index
            fl_ind_1 = fast_fl_index
        }
    else {
        fl_ind_1 = slow_fl_index
        fl_ind_2 = fast_fl_index
    };
    //console.log(slow_fl_index, fast_fl_index)
    //console.log(fl_ind_1, fl_ind_2)
    //console.log(fl_stimuli_triple[fl_ind_1], fl_stimuli_triple[fl_ind_2])

    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var rt_mean = jsPsych.data.get().filter({ at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
    var rt_sd = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

    data.at_RunningMean = rt_mean
    data.sd = rt_sd
    data.slow = rt_mean + rt_sd
    data.fast = Math.abs(rt_mean - rt_sd)
    console.log('this is running mean', rt_mean , 'this is running sd',rt_sd)
    console.log('this is floor of RT range', Math.abs(rt_mean - rt_sd) , 'this is ceiling of RT range', rt_mean + rt_sd)

    data.at_counter = at_counter

    data.slow_lr_counter = slow_lr_counter
    data.fast_lr_counter = fast_lr_counter
    data.lr_counter = lr_counter
    data.slow_fl_counter = slow_lr_filler
    data.fast_fl_counter = fast_lr_filler
    data.fl_counter = fl_counter
    console.log('ATTENTION!!! there are ' + at_counter + ' attention trials. KEEP GOING!!!')
    console.log('there are' + lr_counter + ' learning trials')
    console.log('there are' + fast_lr_counter + ' fast learning trials')
    console.log('there are' + slow_lr_counter + ' slow learning trials')
    filler_node = false
    lr_node = false


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
        var rt_three = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(3).select('rt').mean();
        data.at_TrailingMean = rt_three
        console.log('trailing mean is ' + rt_three)
        //console.log('what is this, excluding nan', jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(0).select('rt').values[0])
        console.log('this is 1 back trial RT, excluding nan', jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(1).select('rt').values[0])
        console.log('this is 2 back trial RT, excluding nan', jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(2).select('rt').values[0])
        console.log('this is 3 back trial RT, excluding nan', jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).last(3).select('rt').values[0])
        console.log('this is 1 back trial RT, including nan', jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(1).select('rt').values[0])
        console.log('this is 2 back trial RT, including nan', jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(2).select('rt').values[0])
        console.log('this is 3 back trial RT, including nan', jsPsych.data.get().filter({at_TrialType: 'frequent'}).last(3).select('rt').values[0])

        //console.log(jsPsych.data.get().filter({ TaskType: 'at' }).last(1).select('rt').values[0])

  };

/* ----new restriction 1 starts here---- */
    //restriction 1 where the last three trials were all fast/slow then the next one can't be the same: || last_fast == false || last_slow == false
    if (at_counter > 80 && lr_counter > 0){ //change 80
        console.log('----new restriction 1 starts here----')

        /* ----count lr trials---- */
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

        /* ----count filler trials---- */
        console.log('fast filler number ' + fast_lr_filler)
        if (fast_lr_filler ==24 ) {
            fast_filler_num = false
            console.log('can we add fast filler next? ' + fast_filler_num)
        } else {
            fast_filler_num = true
        }

        console.log('slow filler number ' + slow_lr_filler)
        if (slow_lr_filler ==24 ) {
            slow_filler_num = false
            console.log('can we add slow filler next? ' + slow_filler_num)
        } else {
            slow_filler_num = true
        };
        /* ----no consecutive filler trials---- */
        // var last_fl = jsPsych.data.get().filter({ test_part: 'test' }).last(3).select('TaskType').values;
        // if (last_fl.includes('fl')== true) {
        //     console.log('there is a filler trial')}




    if (fast_lr_counter >0 && slow_lr_counter >0){
        //see if fast - slow is greater than 5, if so the next one can't be fast; or if slow - fast is greater than 5, if so the next one can't be slow

      console.log('fast_counter' + fast_lr_counter + 'slow_counter' + slow_lr_counter)
      if ((fast_lr_counter - slow_lr_counter) >=3 )
                {diff_restrict_fast = false}
      else if ((slow_lr_counter - fast_lr_counter) >=3)
                {diff_restrict_slow = false}
      else { diff_restrict_slow = true
             diff_restrict_fast = true
          console.log('diff is smaller than 3') }
        }
    };




    /* ----new restriction 2 starts here---- */
    //restriction 2 where in first 6, 3 fast 3 slow: ||initial_slow == false || initial_fast == false
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

      }  else {console.log('no learning yet or more than 6 learning trials')};



    /*---- Start applying restrictions to triggering ----*/

    /*-- If attention <= 80 --*/
    if (at_counter < 80) { //change 80
        lr_node = false
        filler_node = false
    }

    // else if(last_infreq.includes('infrequent') || last_correct.includes(false) || last_rt.includes(true) || last_lr.includes('lr')) {
    //     lr_node = false
    // }

    else if (at_counter > 80 && lr_counter > 0 && lr_counter < 6){ //change 80

      /*-- If attention > 80 && 0< learning <=6 --*/
      if(rt_three > rt_mean+ rt_sd && initial_slow == true && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd) && initial_fast == true && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
            //else {lr_node = 0}
            /*      else if (rt_three < rt_mean+ 0.2 * rt_sd && rt_three > Math.abs(rt_mean- 0.2 * rt_sd)){
                lr_node = 3; //medium triggering should use three nodes...
                console.log('lr_node = true')
            }*/

        /* ----- slow control ----- */
        else if ((fast_lr_counter >0 && slow_lr_counter >0 && rt_three > rt_mean+ rt_sd && diff_restrict_slow == false && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'diff_restrict'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_slow == false && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'consecutive'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && initial_slow == false && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'initial_slow'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_lr.includes('lr') && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'last_lr'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_correct.includes(false) && rt_three != 0 && slow_filler_num == true)) { //&& rt_three != 0
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'last_correct'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_infreq.includes('infrequent') && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'last_infreq'
                console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_rt.includes(true) && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'last_toofast'
                console.log('filler slow')
      }

      /* ----- fast control ----- */
        else if ((fast_lr_counter >0 && slow_lr_counter >0 && rt_three < Math.abs(rt_mean- rt_sd) && diff_restrict_fast == false && rt_three != 0 && fast_filler_num == true)){
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'diff_restrict'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_fast == false && rt_three != 0 && fast_filler_num == true) ) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'consecutive'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && initial_fast == false && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'initial_fast'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_lr.includes('lr') && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_lr'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_correct.includes(false) && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_correct'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_infreq.includes('infrequent') && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_infreq'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_rt.includes(true) && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_toofast'
                console.log('filler fast')
        }

        //   else {
        //       lr_node = false
        //       filler_node = false
        // }

      }


    else if (at_counter > 80 && lr_counter >= 6){ //change 80

      /*-- If attention > 80 && learning > 6 --*/
      if(rt_three > rt_mean+ rt_sd && last_slow == true && diff_restrict_slow != false && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false)
      {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd) && last_fast == true && diff_restrict_fast != false && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false)
          {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }

            //else {lr_node = 0} //do i need to define when node == 0  here? since lr_node gets reset every trial anyway

        /*-- If attention > 80 && learning > 6, insert fillers --*/
          //at the end of each trial, you decide whether this is a CHB, (e.g. 5 of them)
          //if so, insert fillers; either 1-5 happens???
      /* ----- slow control ----- */
      else if((rt_three > rt_mean+ rt_sd && last_slow == false && rt_three != 0 && slow_filler_num == true)) {
              filler_node = 1;
              data.filler = 'slow'
              //data.control_case = 'consecutive'
              console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && diff_restrict_slow == false && rt_three != 0 && slow_filler_num == true)) {
              filler_node = 1;
              data.filler = 'slow'
              //data.control_case = 'diff_restrict'
              console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_lr.includes('lr') && rt_three != 0 && slow_filler_num == true)) {
              filler_node = 1;
              data.filler = 'slow'
              //data.control_case = 'last_lr'
              console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_correct.includes(false) && rt_three != 0 && slow_filler_num == true)) {
              filler_node = 1;
              data.filler = 'slow'
              //data.control_case = 'last_correct'
              console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_infreq.includes('infrequent') && rt_three != 0 && slow_filler_num == true)) {
              filler_node = 1;
              data.filler = 'slow'
              //data.control_case = 'last_infreq'
              console.log('filler slow')
      } else if ((rt_three > rt_mean+ rt_sd && last_rt.includes(true) && rt_three != 0 && slow_filler_num == true)) {
                filler_node = 1;
                data.filler = 'slow'
                //data.control_case = 'last_toofast'
                console.log('filler slow')
      }

      /* ----- fast control ----- */
      else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_fast == false && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'consecutive'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && diff_restrict_fast == false && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'diff_restrict'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_lr.includes('lr') && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_lr'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_correct.includes(false) && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_correct'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_infreq.includes('infrequent') && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_infreq'
                console.log('filler fast')
      } else if ((rt_three < Math.abs(rt_mean- rt_sd) && last_rt.includes(true) && rt_three != 0 && fast_filler_num == true)) {
                filler_node = 2;
                data.filler = 'fast'
                //data.control_case = 'last_toofast'
                console.log('filler fast')
      }

        //   else {
        //       lr_node = false
        //       filler_node = false
        // }

  }


    /*-- If attention > 80 && learning = 0 --*/
    else if (at_counter > 80 && lr_counter == 0) { //change 80

        if(rt_three > rt_mean+ rt_sd && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false) {
            lr_node = 1;
            data.diff = 'slow'
            console.log('slow')
          } else if (rt_three < Math.abs(rt_mean- rt_sd) && last_infreq.includes('infrequent') ==false && last_correct.includes(false) ==false && last_rt.includes(true) ==false && last_lr.includes('lr') ==false) {
                lr_node = 2;
                data.diff = 'fast'
                console.log('fast')
            }
            // else {
            //     lr_node = false
            //     filler_node = false}
        };

    },
  trial_duration: 800
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



/* -----hard coded 24 trials for each condition -----*/

/* ---First organize the triplets---*/
var filler_TS1 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[0][0], fl_stimuli_triple[0][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS2 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[1][0], fl_stimuli_triple[1][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS3 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[2][0], fl_stimuli_triple[2][2] +1),
  repetitions: 1
};

var filler_TS4 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[3][0], fl_stimuli_triple[3][2] +1),
  repetitions: 1
};

var filler_TS5 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[4][0], fl_stimuli_triple[4][2] +1),
  repetitions: 1
};

var filler_TS6 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[5][0], fl_stimuli_triple[5][2] +1),
  repetitions: 1
};

var filler_TS7 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[6][0], fl_stimuli_triple[6][2] +1),
  repetitions: 1
};

var filler_TS8 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[7][0], fl_stimuli_triple[7][2] +1),
  repetitions: 1
};

var filler_TS9 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[8][0], fl_stimuli_triple[8][2] +1),
  repetitions: 1
};

var filler_TS10 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[9][0], fl_stimuli_triple[9][2] +1),
  repetitions: 1
};

var filler_TS11 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[10][0], fl_stimuli_triple[10][2] +1),
  repetitions: 1
};

var filler_TS12 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[11][0], fl_stimuli_triple[11][2] +1),
  repetitions: 1
};

var filler_TS13 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[12][0], fl_stimuli_triple[12][2] +1),
  repetitions: 1
};

var filler_TS14 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[13][0], fl_stimuli_triple[13][2] +1),
  repetitions: 1
};

var filler_TS15 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[14][0], fl_stimuli_triple[14][2] +1),
  repetitions: 1
};

var filler_TS16 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[15][0], fl_stimuli_triple[15][2] +1),
  repetitions: 1
};

var filler_TS17 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[16][0], fl_stimuli_triple[16][2] +1),
  repetitions: 1
};

var filler_TS18 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[17][0], fl_stimuli_triple[17][2] +1),
  repetitions: 1
};

var filler_TS19 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[18][0], fl_stimuli_triple[18][2] +1),
  repetitions: 1
};

var filler_TS20 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[19][0], fl_stimuli_triple[19][2] +1),
  repetitions: 1
};

var filler_TS21 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[20][0], fl_stimuli_triple[20][2] +1),
  repetitions: 1
};

var filler_TS22 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[21][0], fl_stimuli_triple[21][2] +1),
  repetitions: 1
};

var filler_TS23 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[22][0], fl_stimuli_triple[22][2] +1),
  repetitions: 1
};

var filler_TS24 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_1.slice(fl_stimuli_triple[23][0], fl_stimuli_triple[23][2] +1),
  repetitions: 1
};

var filler_TS25 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[0][0], fl_stimuli_triple[0][2] +1),
  randomize_order: false,
  repetitions: 1
};
var filler_TS26 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[1][0], fl_stimuli_triple[1][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS27 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[2][0], fl_stimuli_triple[2][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS28 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[3][0], fl_stimuli_triple[3][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS29 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[4][0], fl_stimuli_triple[4][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS30 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[5][0], fl_stimuli_triple[5][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS31 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[6][0], fl_stimuli_triple[6][2] +1),
  randomize_order: false,
  repetitions: 1
};


var filler_TS32 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[7][0], fl_stimuli_triple[7][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS33 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[8][0], fl_stimuli_triple[8][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS34 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[9][0], fl_stimuli_triple[9][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS35 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[10][0], fl_stimuli_triple[10][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS36 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[11][0], fl_stimuli_triple[11][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS37 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[12][0], fl_stimuli_triple[12][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS38 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[13][0], fl_stimuli_triple[13][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS39 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[14][0], fl_stimuli_triple[14][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS40 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[15][0], fl_stimuli_triple[15][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS41 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[16][0], fl_stimuli_triple[16][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS42 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[17][0], fl_stimuli_triple[17][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS43 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[18][0], fl_stimuli_triple[18][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS44 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[19][0], fl_stimuli_triple[19][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS45 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[20][0], fl_stimuli_triple[20][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS46 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[21][0], fl_stimuli_triple[21][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS47 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[22][0], fl_stimuli_triple[22][2] +1),
  randomize_order: false,
  repetitions: 1
};

var filler_TS48 = {
  timeline: [filler],
  timeline_variables: fl_stimuli_2.slice(fl_stimuli_triple[23][0], fl_stimuli_triple[23][2] +1),
  randomize_order: false,
  repetitions: 1
};

/* ---Map triplets to attention---*/
if (fl_stimuli_1[0].data.attention_state == 'fast') {
    var fast_filler_1 = filler_TS1
    var fast_filler_2 = filler_TS2
    var fast_filler_3 = filler_TS3
    var fast_filler_4 = filler_TS4
    var fast_filler_5 = filler_TS5
    var fast_filler_6 = filler_TS6
    var fast_filler_7 = filler_TS7
    var fast_filler_8 = filler_TS8
    var fast_filler_9 = filler_TS9
    var fast_filler_10 = filler_TS10
    var fast_filler_11 = filler_TS11
    var fast_filler_12 = filler_TS12
    var fast_filler_13 = filler_TS13
    var fast_filler_14 = filler_TS14
    var fast_filler_15 = filler_TS15
    var fast_filler_16 = filler_TS16
    var fast_filler_17 = filler_TS17
    var fast_filler_18 = filler_TS18
    var fast_filler_19 = filler_TS19
    var fast_filler_20 = filler_TS20
    var fast_filler_21 = filler_TS21
    var fast_filler_22 = filler_TS22
    var fast_filler_23 = filler_TS23
    var fast_filler_24 = filler_TS24


    var slow_filler_1 = filler_TS25
    var slow_filler_2 = filler_TS26
    var slow_filler_3 = filler_TS27
    var slow_filler_4 = filler_TS28
    var slow_filler_5 = filler_TS29
    var slow_filler_6 = filler_TS30
    var slow_filler_7 = filler_TS31
    var slow_filler_8 = filler_TS32
    var slow_filler_9 = filler_TS33
    var slow_filler_10 = filler_TS34
    var slow_filler_11 = filler_TS35
    var slow_filler_12 = filler_TS36
    var slow_filler_13 = filler_TS37
    var slow_filler_14 = filler_TS38
    var slow_filler_15 = filler_TS39
    var slow_filler_16 = filler_TS40
    var slow_filler_17 = filler_TS41
    var slow_filler_18 = filler_TS42
    var slow_filler_19 = filler_TS43
    var slow_filler_20 = filler_TS44
    var slow_filler_21 = filler_TS45
    var slow_filler_22 = filler_TS46
    var slow_filler_23 = filler_TS47
    var slow_filler_24 = filler_TS48

} else {
    var slow_filler_1 = filler_TS1
    var slow_filler_2 = filler_TS2
    var slow_filler_3 = filler_TS3
    var slow_filler_4 = filler_TS4
    var slow_filler_5 = filler_TS5
    var slow_filler_6 = filler_TS6
    var slow_filler_7 = filler_TS7
    var slow_filler_8 = filler_TS8
    var slow_filler_9 = filler_TS9
    var slow_filler_10 = filler_TS10
    var slow_filler_11 = filler_TS11
    var slow_filler_12 = filler_TS12
    var slow_filler_13 = filler_TS13
    var slow_filler_14 = filler_TS14
    var slow_filler_15 = filler_TS15
    var slow_filler_16 = filler_TS16
    var slow_filler_17 = filler_TS17
    var slow_filler_18 = filler_TS18
    var slow_filler_19 = filler_TS19
    var slow_filler_20 = filler_TS20
    var slow_filler_21 = filler_TS21
    var slow_filler_22 = filler_TS22
    var slow_filler_23 = filler_TS23
    var slow_filler_24 = filler_TS24


    var fast_filler_1 = filler_TS25
    var fast_filler_2 = filler_TS26
    var fast_filler_3 = filler_TS27
    var fast_filler_4 = filler_TS28
    var fast_filler_5 = filler_TS29
    var fast_filler_6 = filler_TS30
    var fast_filler_7 = filler_TS31
    var fast_filler_8 = filler_TS32
    var fast_filler_9 = filler_TS33
    var fast_filler_10 = filler_TS34
    var fast_filler_11 = filler_TS35
    var fast_filler_12 = filler_TS36
    var fast_filler_13 = filler_TS37
    var fast_filler_14 = filler_TS38
    var fast_filler_15 = filler_TS39
    var fast_filler_16 = filler_TS40
    var fast_filler_17 = filler_TS41
    var fast_filler_18 = filler_TS42
    var fast_filler_19 = filler_TS43
    var fast_filler_20 = filler_TS44
    var fast_filler_21 = filler_TS45
    var fast_filler_22 = filler_TS46
    var fast_filler_23 = filler_TS47
    var fast_filler_24 = filler_TS48
};


if (lr_stimuli_1[0].data.attention_state == 'fast') {
    var fast_lr = lr_test_TS1
    var slow_lr = lr_test_TS2
} else {
    var slow_lr = lr_test_TS1
    var fast_lr = lr_test_TS2};

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



/* ---Decide on filler trigger node---*/
var filler_node_1= { //slow filler node
  timeline: [slow_filler_1],
  conditional_function: function(data){
    if (filler_node == 1){ //slow filler condition
        if (slow_fl_index == 0){ //no filler trial yet but about to insert one
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_2= { //slow filler node
  timeline: [slow_filler_2],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 1){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_3= { //slow filler node
  timeline: [slow_filler_3],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 2){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_4= { //slow filler node
  timeline: [slow_filler_4],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 3){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_5= { //slow filler node
  timeline: [slow_filler_5],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 4){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_6= { //slow filler node
  timeline: [slow_filler_6],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 5){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_7= { //slow filler node
  timeline: [slow_filler_7],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 6){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_8= { //slow filler node
  timeline: [slow_filler_8],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 7){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_9= { //slow filler node
  timeline: [slow_filler_9],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 8){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_10= { //slow filler node
  timeline: [slow_filler_10],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 9){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_11= { //slow filler node
  timeline: [slow_filler_11],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 10){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_12= { //slow filler node
  timeline: [slow_filler_12],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 11){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_13= { //slow filler node
  timeline: [slow_filler_13],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 12){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_14= { //slow filler node
  timeline: [slow_filler_14],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 13){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_15= { //slow filler node
  timeline: [slow_filler_15],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 14){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_16= { //slow filler node
  timeline: [slow_filler_16],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 15){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_17= { //slow filler node
  timeline: [slow_filler_17],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 16){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_18= { //slow filler node
  timeline: [slow_filler_18],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 17){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_19= { //slow filler node
  timeline: [slow_filler_19],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 18){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_20= { //slow filler node
  timeline: [slow_filler_20],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 19){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_21= { //slow filler node
  timeline: [slow_filler_21],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 20){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_22= { //slow filler node
  timeline: [slow_filler_22],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 21){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_23= { //slow filler node
  timeline: [slow_filler_23],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 22){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_24= { //slow filler node
  timeline: [slow_filler_24],
  conditional_function: function(data){
    if (filler_node == 1){
        if (slow_fl_index == 23){
            return true;
        } else {return false}
    } else{return false}
  }
};



var filler_node_25= { //fast filler node
  timeline: [fast_filler_1],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 0){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_26= { //fast filler node
  timeline: [fast_filler_2],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 1){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_27= { //fast filler node
  timeline: [fast_filler_3],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 2){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_28= { //fast filler node
  timeline: [fast_filler_4],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 3){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_29= { //fast filler node
  timeline: [fast_filler_5],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 4){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_30= { //fast filler node
  timeline: [fast_filler_6],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 5){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_31= { //fast filler node
  timeline: [fast_filler_7],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 6){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_32= { //fast filler node
  timeline: [fast_filler_8],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 7){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_33= { //fast filler node
  timeline: [fast_filler_9],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 8){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_34= { //fast filler node
  timeline: [fast_filler_10],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 9){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_35= { //fast filler node
  timeline: [fast_filler_11],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 10){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_36= { //fast filler node
  timeline: [fast_filler_12],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 11){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_37= { //fast filler node
  timeline: [fast_filler_13],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 12){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_38= { //fast filler node
  timeline: [fast_filler_14],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 13){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_39= { //fast filler node
  timeline: [fast_filler_15],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 14){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_40= { //fast filler node
  timeline: [fast_filler_16],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 15){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_41= { //fast filler node
  timeline: [fast_filler_17],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 16){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_42= { //fast filler node
  timeline: [fast_filler_18],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 17){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_43= { //fast filler node
  timeline: [fast_filler_19],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 18){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_44= { //fast filler node
  timeline: [fast_filler_20],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 19){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_45= { //fast filler node
  timeline: [fast_filler_21],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 20){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_46= { //fast filler node
  timeline: [fast_filler_22],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 21){
            return true;
        } else {return false}
    } else{return false}
  }
};
var filler_node_47= { //fast filler node
  timeline: [fast_filler_23],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 22){
            return true;
        } else {return false}
    } else{return false}
  }
};

var filler_node_48= { //fast filler node
  timeline: [fast_filler_24],
  conditional_function: function(data){
    if (filler_node == 2){ //fast filler condition
        if (fast_fl_index == 23){
            return true;
        } else {return false}
    } else{return false}
  }
};


var at_test_procedure = {
  timeline: [attention,if_node_1,if_node_2, filler_node_1, filler_node_2, filler_node_3, filler_node_4, filler_node_5, filler_node_6, filler_node_7, filler_node_8,
      filler_node_9, filler_node_10, filler_node_11, filler_node_12, filler_node_13, filler_node_14, filler_node_15, filler_node_16, filler_node_17, filler_node_18,
      filler_node_19, filler_node_20, filler_node_21, filler_node_22, filler_node_23, filler_node_24, filler_node_25, filler_node_26, filler_node_27, filler_node_28,
      filler_node_29, filler_node_30, filler_node_31, filler_node_32, filler_node_33, filler_node_34, filler_node_35, filler_node_36, filler_node_37, filler_node_38,
      filler_node_39, filler_node_40, filler_node_41, filler_node_42, filler_node_43, filler_node_44, filler_node_45, filler_node_46, filler_node_47, filler_node_48, iti_200],
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





var debrief_TD_prac = {
    type: "html-keyboard-response",
    choices: ['Enter'],
    stimulus: function () {

        var trials = jsPsych.data.get().filter({ test_part: 'post_prac' }).last(1);

        var TD_rt = Math.round(trials.select('TD_rt').values[0]* 100)/ 100;
        console.log(TD_rt)

        return "<p>Your reaction time for this trial was " + TD_rt + " ms.</p>" +
            "<p>Remember that you should only press the SPACEBAR when you see the shape presented at the beginning of the trial. </b> </p>" +
            "<p>Press enter to move on.</p>"

    }
};


/*--------- Real TD --------- */

var TD_target_1 = TD_stimuli.slice(0,12)[3].TD_stimulus
var TD_target_present_1 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_1, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
/*var TD_trial_sequence_1 = {
    timeline: [TD_trial],
    timeline_variables: TD_stimuli.slice(0,12), //TD_stimuli.slice(0): (0,1,2...23)
    randomize_order: false,
    repetitions: 1
};*/

var animation_sequence_1 =get_values_bykey(TD_stimuli.slice(0,12))
console.log(TD_stimuli)
console.log(typeof TD_stimuli)
console.log(animation_sequence_1)
console.log(typeof animation_sequence_1)

var TD_trial_sequence_1 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_1,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().filter({ trial_type: 'animation' }).last(1).select('animation_sequence').values)
        //console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().filter({ trial_type: 'animation' }).last(1).select('response').values)
        //console.log(response)

        //in animation_sequence, find where the stimulus value is target, grab the time as onset
        var onset = get_target_time(animation_sequence,response, TD_target_1,'onset')
        //in response, find where the the stimulus value is target, grab the rt as offset, rt = offset - onset
        //if no press made to target, grab the first post-target rt as offset
        var offset = get_target_time(animation_sequence,response, TD_target_1,'offset')
        data.TD_trial_number = 1
        //data.onset = onset
        //data.offset = offset
        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_1
        data.test_part = 'post_TD'
    }
};
var TD1 = {
    timeline: [TD_target_present_1 , TD_trial_sequence_1],
    randomize_order: false,
    repetitions: 1
};



var TD_target_2 = TD_stimuli.slice(12,24)[4].TD_stimulus
var TD_target_present_2 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_2, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_2 = get_values_bykey(TD_stimuli.slice(12,24))
var TD_trial_sequence_2 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_2,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_2,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_2,'offset')
        data.TD_trial_number = 2
        //data.onset = onset
        //data.offset = offset
        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_2
        data.test_part = 'post_TD'
    }
};
var TD2 = {
    timeline: [TD_target_present_2 , TD_trial_sequence_2],
    randomize_order: false,
    repetitions: 1
};


var TD_target_3 = TD_stimuli.slice(24,36)[5].TD_stimulus
var TD_target_present_3 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_3, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_3 = get_values_bykey(TD_stimuli.slice(24,36))
var TD_trial_sequence_3 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_3,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)


        var onset = get_target_time(animation_sequence,response, TD_target_3,'onset')

        var offset = get_target_time(animation_sequence,response, TD_target_3,'offset')
        data.TD_trial_number = 3
        //data.onset = onset
        //data.offset = offset

        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_3
        data.test_part = 'post_TD'
    }
};
var TD3 = {
    timeline: [TD_target_present_3 , TD_trial_sequence_3],
    randomize_order: false,
    repetitions: 1
};


var TD_target_4 = TD_stimuli.slice(36,48)[4].TD_stimulus
var TD_target_present_4 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_4, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_4 = get_values_bykey(TD_stimuli.slice(36,48))
var TD_trial_sequence_4 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_4,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_4,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_4,'offset')
        data.TD_trial_number = 4
        //data.onset = onset
        //data.offset = offset

        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_4
        data.test_part = 'post_TD'
    }
};
var TD4 = {
    timeline: [TD_target_present_4 , TD_trial_sequence_4],
    randomize_order: false,
    repetitions: 1
};


var TD_target_5 = TD_stimuli.slice(48,60)[5].TD_stimulus
var TD_target_present_5 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_5, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_5 = get_values_bykey(TD_stimuli.slice(48,60))
var TD_trial_sequence_5 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_5,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_5,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_5,'offset')
        data.TD_trial_number = 5
        //data.onset = onset
        //data.offset = offset

        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_5
        data.test_part = 'post_TD'
    }
};

var TD5 = {
    timeline: [TD_target_present_5 , TD_trial_sequence_5],
    randomize_order: false,
    repetitions: 1
};


var TD_target_6 = TD_stimuli.slice(60,72)[6].TD_stimulus
var TD_target_present_6 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_6, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_6 = get_values_bykey(TD_stimuli.slice(60,72))
var TD_trial_sequence_6 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_6,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_6,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_6,'offset')
        data.TD_trial_number = 6
        //data.onset = onset
        //data.offset = offset

        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        console.log('this is target detection RT ', TD_rt)
        data.TD_rt = TD_rt

        data.TD_target = TD_target_6
        data.test_part = 'post_TD'
    }
};
var TD6 = {
    timeline: [TD_target_present_6 , TD_trial_sequence_6],
    randomize_order: false,
    repetitions: 1
};


var TD_target_7 = TD_stimuli.slice(72,84)[5].TD_stimulus
var TD_target_present_7 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_7, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_7 = get_values_bykey(TD_stimuli.slice(72,84))
var TD_trial_sequence_7 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_7,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_7,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_7,'offset')
        data.TD_trial_number = 7
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_7
        data.test_part = 'post_TD'
    }
};
var TD7 = {
    timeline: [TD_target_present_7 , TD_trial_sequence_7],
    randomize_order: false,
    repetitions: 1
};


var TD_target_8 = TD_stimuli.slice(84,96)[6].TD_stimulus
var TD_target_present_8 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_8, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_8 = get_values_bykey(TD_stimuli.slice(84,96))
var TD_trial_sequence_8 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_8,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_8,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_8,'offset')
        data.TD_trial_number = 8
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_8
        data.test_part = 'post_TD'
    }
};
var TD8 = {
    timeline: [TD_target_present_8 , TD_trial_sequence_8],
    randomize_order: false,
    repetitions: 1
};


var TD_target_9 = TD_stimuli.slice(96,108)[7].TD_stimulus
var TD_target_present_9 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_9, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_9 = get_values_bykey(TD_stimuli.slice(96,108))
var TD_trial_sequence_9 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_9,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_9,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_9,'offset')
        data.TD_trial_number = 9
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_9
        data.test_part = 'post_TD'
    }
};
var TD9 = {
    timeline: [TD_target_present_9 , TD_trial_sequence_9],
    randomize_order: false,
    repetitions: 1
};


var TD_target_10 = TD_stimuli.slice(108,120)[6].TD_stimulus
var TD_target_present_10 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_10, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_10 = get_values_bykey(TD_stimuli.slice(108,120))
var TD_trial_sequence_10 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_10,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_10,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_10,'offset')
        data.TD_trial_number = 10
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_10
        data.test_part = 'post_TD'
    }
};
var TD10 = {
    timeline: [TD_target_present_10 , TD_trial_sequence_10],
    randomize_order: false,
    repetitions: 1
};


var TD_target_11 = TD_stimuli.slice(120,132)[7].TD_stimulus
var TD_target_present_11 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_11, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_11 = get_values_bykey(TD_stimuli.slice(120,132))
var TD_trial_sequence_11 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_11,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_11,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_11,'offset')
        data.TD_trial_number = 11
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_11
        data.test_part = 'post_TD'
    }
};
var TD11 = {
    timeline: [TD_target_present_11, TD_trial_sequence_11],
    randomize_order: false,
    repetitions: 1
};


var TD_target_12 = TD_stimuli.slice(132,144)[8].TD_stimulus
var TD_target_present_12 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_12, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_12 = get_values_bykey(TD_stimuli.slice(132,144))
var TD_trial_sequence_12 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_12,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_12,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_12,'offset')
        data.TD_trial_number = 12
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_12
        data.test_part = 'post_TD'
    }
};
var TD12 = {
    timeline: [TD_target_present_12, TD_trial_sequence_12],
    randomize_order: false,
    repetitions: 1
};


var TD_target_13 = TD_stimuli.slice(144,156)[3].TD_stimulus
var TD_target_present_13 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_13, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_13 = get_values_bykey(TD_stimuli.slice(144,156))
var TD_trial_sequence_13 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_13,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_13,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_13,'offset')
        data.TD_trial_number = 13
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_13
        data.test_part = 'post_TD'
    }
};
var TD13 = {
    timeline: [TD_target_present_13, TD_trial_sequence_13],
    randomize_order: false,
    repetitions: 1
};

var TD_target_14 = TD_stimuli.slice(156,168)[4].TD_stimulus
var TD_target_present_14 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_14, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_14 = get_values_bykey(TD_stimuli.slice(156,168))
var TD_trial_sequence_14 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_14,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_14,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_14,'offset')
        data.TD_trial_number = 14
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_14
        data.test_part = 'post_TD'
    }
};
var TD14 = {
    timeline: [TD_target_present_14, TD_trial_sequence_14],
    randomize_order: false,
    repetitions: 1
};


var TD_target_15 = TD_stimuli.slice(168,180)[5].TD_stimulus
var TD_target_present_15 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_15, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_15 = get_values_bykey(TD_stimuli.slice(168,180))
var TD_trial_sequence_15 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_15,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_15,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_15,'offset')
        data.TD_trial_number = 15
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_15
        data.test_part = 'post_TD'
    }
};
var TD15 = {
    timeline: [TD_target_present_15, TD_trial_sequence_15],
    randomize_order: false,
    repetitions: 1
};


var TD_target_16 = TD_stimuli.slice(180,192)[4].TD_stimulus
var TD_target_present_16 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_16, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_16 = get_values_bykey(TD_stimuli.slice(180,192))
var TD_trial_sequence_16 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_16,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_16,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_16,'offset')
        data.TD_trial_number = 16
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_16
        data.test_part = 'post_TD'
    }
};
var TD16 = {
    timeline: [TD_target_present_16, TD_trial_sequence_16],
    randomize_order: false,
    repetitions: 1
};


var TD_target_17 = TD_stimuli.slice(192,204)[5].TD_stimulus
var TD_target_present_17 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_17, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_17 = get_values_bykey(TD_stimuli.slice(192,204))
var TD_trial_sequence_17 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_17,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_17,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_17,'offset')
        data.TD_trial_number = 17
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_17
        data.test_part = 'post_TD'
    }
};
var TD17 = {
    timeline: [TD_target_present_17, TD_trial_sequence_17],
    randomize_order: false,
    repetitions: 1
};


var TD_target_18 = TD_stimuli.slice(204,216)[6].TD_stimulus
var TD_target_present_18 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_18, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_18 = get_values_bykey(TD_stimuli.slice(204,216))
var TD_trial_sequence_18 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_18,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_18,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_18,'offset')
        data.TD_trial_number = 18
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_18
        data.test_part = 'post_TD'
    }
};
var TD18 = {
    timeline: [TD_target_present_18, TD_trial_sequence_18],
    randomize_order: false,
    repetitions: 1
};


var TD_target_19 = TD_stimuli.slice(216,228)[5].TD_stimulus
var TD_target_present_19 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_19, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_19 = get_values_bykey(TD_stimuli.slice(216,228))
var TD_trial_sequence_19 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_19,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_19,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_19,'offset')
        data.TD_trial_number = 19
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_19
        data.test_part = 'post_TD'
    }
};
var TD19 = {
    timeline: [TD_target_present_19, TD_trial_sequence_19],
    randomize_order: false,
    repetitions: 1
};


var TD_target_20 = TD_stimuli.slice(228,240)[6].TD_stimulus
var TD_target_present_20 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_stimuli.slice(228,240)[6].TD_stimulus, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_20 = get_values_bykey(TD_stimuli.slice(228,240))
var TD_trial_sequence_20 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_20,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_20,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_20,'offset')
        data.TD_trial_number = 20
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_20
        data.test_part = 'post_TD'
    }
};
var TD20 = {
    timeline: [TD_target_present_20, TD_trial_sequence_20],
    randomize_order: false,
    repetitions: 1
};


var TD_target_21 = TD_stimuli.slice(240,252)[7].TD_stimulus
var TD_target_present_21 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_21, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_21 = get_values_bykey(TD_stimuli.slice(240,252))
var TD_trial_sequence_21 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_21,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_21,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_21,'offset')
        data.TD_trial_number = 21
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_21
        data.test_part = 'post_TD'
    }
};
var TD21 = {
    timeline: [TD_target_present_21, TD_trial_sequence_21],
    randomize_order: false,
    repetitions: 1
};


var TD_target_22 = TD_stimuli.slice(252,264)[6].TD_stimulus
var TD_target_present_22 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_22, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_22 = get_values_bykey(TD_stimuli.slice(252,264))
var TD_trial_sequence_22 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_22,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_22,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_22,'offset')
        data.TD_trial_number = 22
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_22
        data.test_part = 'post_TD'
    }
};
var TD22 = {
    timeline: [TD_target_present_22, TD_trial_sequence_22],
    randomize_order: false,
    repetitions: 1
};


var TD_target_23 = TD_stimuli.slice(264,276)[7].TD_stimulus
var TD_target_present_23 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_23, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_23 = get_values_bykey(TD_stimuli.slice(264,276))
var TD_trial_sequence_23 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_23,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_23,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_23,'offset')
        data.TD_trial_number = 23
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_23
        data.test_part = 'post_TD'
    }
};
var TD23 = {
    timeline: [TD_target_present_23, TD_trial_sequence_23],
    randomize_order: false,
    repetitions: 1
};


var TD_target_24 = TD_stimuli.slice(276,288)[8].TD_stimulus
var TD_target_present_24 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_24, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_24 = get_values_bykey(TD_stimuli.slice(276,288))
var TD_trial_sequence_24 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_24,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_24,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_24,'offset')
        data.TD_trial_number = 24
        //data.onset = onset
        //data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_24
        data.test_part = 'post_TD'
    }
};
var TD24 = {
    timeline: [TD_target_present_24, TD_trial_sequence_24],
    randomize_order: false,
    repetitions: 1
};

/*--------- TD practice --------- */
var TD_target_prac_1 = TD_stimuli_prac.slice(0,12)[3].TD_stimulus
var TD_target_present_1_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_1, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_1 = get_values_bykey(TD_stimuli_prac.slice(0,12));
var  TD_trial_sequence_1_prac = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_prac_1 ,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_prac_1,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_prac_1,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_prac_1
        data.test_part = 'post_prac'
    }
};
var TD1_prac = {
    timeline: [TD_target_present_1_prac , TD_trial_sequence_1_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};


var TD_target_prac_2 = TD_stimuli_prac.slice(12,24)[4].TD_stimulus
var TD_target_present_2_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_2, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_2 = get_values_bykey(TD_stimuli_prac.slice(12,24));
var  TD_trial_sequence_2_prac = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_prac_2,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_prac_2,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_prac_2,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_prac_2
        data.test_part = 'post_prac'
    }
};
var TD2_prac = {
    timeline: [TD_target_present_2_prac , TD_trial_sequence_2_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};


// TD practice trial 3
var TD_target_prac_3 = TD_stimuli_prac.slice(24,36)[5].TD_stimulus
var TD_target_present_3_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_3, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_3 = get_values_bykey(TD_stimuli_prac.slice(24,36));
var  TD_trial_sequence_3_prac = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_prac_3,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)

        var onset = get_target_time(animation_sequence,response, TD_target_prac_3,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_prac_3,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt

        data.TD_target = TD_target_prac_3
        data.test_part = 'post_prac'
    }
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
// timeline.push(practice_presentation);
// timeline.push(instruction4);


//real TD block
var Array_TD = [TD1, TD2, TD3, TD4, TD5, TD6,
               TD7, TD8 ,TD9, TD10, TD11, TD12,
               TD13, TD14 ,TD15, TD16, TD17, TD18,
               TD19, TD20 ,TD21, TD22, TD23, TD24
];
var shuffledTD = jsPsych.randomization.repeat(Array_TD, 1)
var target_presentation = {
    timeline: shuffledTD,
    randomize_order: false,
    repetitions: 1
}
//timeline.push(target_presentation);


/* -----Part 2: Recreate----- */
// -- planB -- //
var instruction6 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        Some shapes that you saw in the first part of the study appeared in a regular order. <br>\n' +
        '        <br>\n' +
        '        In other words, they always appeared together one after another in the same order. <br>\n' +
        '        <br>\n' +
        '        In this section, we will ask you to identify groups of 3 shapes that you remember always appearing together in the same order from the first part of the study. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
//timeline.push(instruction6);



// var sorting_stimuli_stage1_trial1_planB= [];
// for (var i = 0; i < lr_triplet_1.length; i++) {
//     sorting_stimuli_stage1_trial1_planB.push(repo_site + lr_triplet_1[i]);
// }
// for (var i = 0; i < frequent_nontrigger.length; i++) {
//     sorting_stimuli_stage1_trial1_planB.push(repo_site + frequent_nontrigger[i]);
// }
// for (var i = 0; i < fillers_shapes_1.length; i++) {
//     sorting_stimuli_stage1_trial1_planB.push(repo_site + fillers_shapes_1[i]);
// } // add in the 4 filler shapes
//
// var sorting_stimuli_stage1_trial1_planB = shuffle(sorting_stimuli_stage1_trial1_planB);
// //console.log(sorting_stimuli_stage1_trial1_planA); //length should be 15 (12 freq non-trigger + 3 fast trigger)
// console.log('learning triplet one',lr_triplet_1)
// console.log('learning triplet two',lr_triplet_2)
// console.log('frequent nontrigger',frequent_nontrigger)
// console.log('learning filler one',fillers_shapes_1)
// console.log('learning filler two',fillers_shapes_2)
//
// var sorting_stimuli_stage1_trial1_planB_rename = []
// for (var i = 0; i < sorting_stimuli_stage1_trial1_planB.length; i++) {
//     //sorting_stimuli_stage1_trial1_planA[i]
//     var h = i + 30
//     sorting_stimuli_stage1_trial1_planB_rename[i] = '"' + sorting_stimuli_stage1_trial1_planB[i] + '"'
//     looseJsonParse("img" + h + "=" + sorting_stimuli_stage1_trial1_planB_rename[i])
// }
//
// const sorting_stimuli_stage1_trial1_planB_string_01 =
// '<p> <center> Please select 3 shapes that always occurred together one after another in the same order in the first part of the study. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on. </center></p> <br><br><br>   <input name="img01" type= "checkbox" id="img01" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img30}`
// + '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img31}`
// + '" /> <input name="img03" type= "checkbox" id="img03" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img32}`
// + '" /> <input name="img04" type= "checkbox" id="img04" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img33}`
// + '" /> <input name="img05" type= "checkbox" id="img05" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img34}`
// + '" /> <input name="img06" type= "checkbox" id="img06" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img35}`
// + '" /> <input name="img07" type= "checkbox" id="img07" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img36}` + '" /> '
//
// const sorting_stimuli_stage1_trial1_planB_string_02 =
// '       <input name="img08" type= "checkbox" id="img08" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img37}`
// + '" /> <input name="img09" type= "checkbox" id="img09" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img38}`
// + '" /> <input name="img10" type= "checkbox" id="img10" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img39}`
// + '" /> <input name="img11" type= "checkbox" id="img11" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img40}`
// + '" /></label> <input name="img12" type= "checkbox" id="img12" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img41}`+ '" />'
//
// const sorting_stimuli_stage1_trial1_planB_string_03 =
// '       <input name="img13" type= "checkbox" id="img13" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img42}`
// + '" /> <input name="img14" type= "checkbox" id="img14" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img43}`
// + '" /> <input name="img15" type= "checkbox" id="img15" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img44}`
// + '" /> <input name="img16" type= "checkbox" id="img16" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img45}`
// + '" /> <input name="img17" type= "checkbox" id="img17" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img46}`
// + '" /> <input name="img18" type= "checkbox" id="img18" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img47}`
// + '" /> <input name="img19" type= "checkbox" id="img19" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img48}` + '" /> <br><br><br>'
//
// var sort_trial_stage1_trial1_planB = {
//     type: 'survey-multi-select', //'html-button-response'
//       questions: [
//         {
//           //preamble: '<p> Please select 3 shapes that you remember seeing in a regular order from the first part of the experiment. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on.</p>',
//           prompt: sorting_stimuli_stage1_trial1_planB_string_01 + sorting_stimuli_stage1_trial1_planB_string_02 + sorting_stimuli_stage1_trial1_planB_string_03,
//           options: ["                  ","                  ", "                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  "],
//           horizontal: true,
//           required: true,
//           name: 'stage1_trial1_planB'
//         }
//     ],
//       required_message:'You must choose exactly 3 shapes for this question!',
//       on_finish: function (data) {
//           data.selection_stim = [`${img30}`,`${img31}`,`${img32}`,`${img33}`,`${img34}`,`${img35}`,`${img36}`,`${img37}`,`${img38}`,`${img39}`,`${img40}`,`${img41}`,`${img42}`,`${img43}`,`${img44}`,
//               `${img45}`,`${img46}`,`${img47}`,`${img48}`]
//       }
//   };
//
// //timeline.push(sort_trial_stage1_trial1_planB);
//
//
//
//
// var sorting_stimuli_stage1_trial2_planB= [];
// for (var i = 0; i < lr_triplet_2.length; i++) {
//     sorting_stimuli_stage1_trial2_planB.push(repo_site + lr_triplet_2[i]);
// }
// for (var i = 0; i < frequent_nontrigger.length; i++) {
//     sorting_stimuli_stage1_trial2_planB.push(repo_site + frequent_nontrigger[i]);
// }
// for (var i = 0; i < fillers_shapes_2.length; i++) {
//     sorting_stimuli_stage1_trial2_planB.push(repo_site + fillers_shapes_2[i]);
// } // add in the 4 filler shapes
//
// var sorting_stimuli_stage1_trial2_planB = shuffle(sorting_stimuli_stage1_trial2_planB);
// //console.log(sorting_stimuli_stage1_trial1_planA); //length should be 15 (12 freq non-trigger + 3 fast trigger)
//
// var sorting_stimuli_stage1_trial2_planB_rename = []
// for (var i = 0; i < sorting_stimuli_stage1_trial2_planB.length; i++) {
//     //sorting_stimuli_stage1_trial1_planA[i]
//     var k = i + 49
//     sorting_stimuli_stage1_trial2_planB_rename[i] = '"' + sorting_stimuli_stage1_trial2_planB[i] + '"'
//     looseJsonParse("img" + k + "=" + sorting_stimuli_stage1_trial2_planB_rename[i])
// }
//
// const sorting_stimuli_stage1_trial2_planB_string_01 =
// '<p> <center> Please select <b>ANOTHER</b> 3 shapes that always occurred together one after another in the same order in the first part of the study. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on. </center></p> <br><br><br>   <input name="img01" type= "checkbox" id="img01" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img49}`
// + '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img50}`
// + '" /> <input name="img03" type= "checkbox" id="img03" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img51}`
// + '" /> <input name="img04" type= "checkbox" id="img04" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img52}`
// + '" /> <input name="img05" type= "checkbox" id="img05" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img53}`
// + '" /> <input name="img06" type= "checkbox" id="img06" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img54}`
// + '" /> <input name="img07" type= "checkbox" id="img07" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img55}` + '" /> '
//
// const sorting_stimuli_stage1_trial2_planB_string_02 =
// '       <input name="img08" type= "checkbox" id="img08" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img56}`
// + '" /> <input name="img09" type= "checkbox" id="img09" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img57}`
// + '" /> <input name="img10" type= "checkbox" id="img10" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img58}`
// + '" /> <input name="img11" type= "checkbox" id="img11" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img59}`
// + '" /></label> <input name="img12" type= "checkbox" id="img12" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img60}`+ '" />'
//
// const sorting_stimuli_stage1_trial2_planB_string_03 =
// '       <input name="img13" type= "checkbox" id="img13" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img61}`
// + '" /> <input name="img14" type= "checkbox" id="img14" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img62}`
// + '" /> <input name="img15" type= "checkbox" id="img15" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img63}`
// + '" /> <input name="img16" type= "checkbox" id="img16" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img64}`
// + '" /> <input name="img17" type= "checkbox" id="img17" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img65}`
// + '" /> <input name="img18" type= "checkbox" id="img18" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img66}`
// + '" /> <input name="img19" type= "checkbox" id="img19" style= "margin-left: 3em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img67}` + '" /> <br><br><br>'
//
// var sort_trial_stage1_trial2_planB = {
//     type: 'survey-multi-select', //'html-button-response'
//       questions: [
//         {
//           //preamble: '<p> Please select 3 shapes that you remember seeing in a regular order from the first part of the experiment. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on.</p>',
//           prompt: sorting_stimuli_stage1_trial2_planB_string_01 + sorting_stimuli_stage1_trial2_planB_string_02 + sorting_stimuli_stage1_trial2_planB_string_03,
//           options: ["                  ","                  ", "                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  "],
//           horizontal: true,
//           required: true,
//           name: 'stage1_trial2_planB'
//         }
//     ],
//       required_message:'You must choose exactly 3 shapes for this question!',
//       on_finish: function (data) {
//           data.selection_stim = [`${img49}`,`${img50}`,`${img51}`,`${img52}`,`${img53}`,`${img54}`,`${img55}`,`${img56}`,`${img57}`,`${img58}`,`${img59}`,`${img60}`,`${img61}`,`${img62}`,`${img63}`,
//               `${img64}`,`${img65}`,`${img66}`,`${img67}`]
//       }
//   };

//timeline.push(sort_trial_stage1_trial2_planB);


// Version C //
var lr_triplet_full = lr_triplet_1.concat(lr_triplet_2);
//console.log(sorting_stimuli);

var sorting_stimuli_stage1_trial1_planC= [];
for (var i = 0; i < lr_triplet_full.length; i++) {
    sorting_stimuli_stage1_trial1_planC.push(repo_site + lr_triplet_full[i]);
}
for (var i = 0; i < frequent_nontrigger.length; i++) {
    sorting_stimuli_stage1_trial1_planC.push(repo_site + frequent_nontrigger[i]);
}

var fillers_shapes_full = fillers_shapes_1.concat(fillers_shapes_2);
for (var i = 0; i < fillers_shapes_full.length; i++) {
    sorting_stimuli_stage1_trial1_planC.push(repo_site + fillers_shapes_full[i]);
} // add in the 8 filler shapes

var sorting_stimuli_stage1_trial1_planC_rename = []
for (var i = 0; i < sorting_stimuli_stage1_trial1_planC.length; i++) {
    //sorting_stimuli_stage1_trial1_planA[i]
    sorting_stimuli_stage1_trial1_planC_rename[i] = '"' + sorting_stimuli_stage1_trial1_planC[i] + '"'
    looseJsonParse("img" + i + "=" + sorting_stimuli_stage1_trial1_planC_rename[i])
}

const sorting_stimuli_stage1_trial1_planC_string_01 =
'<p> <center> Please select 3 shapes that always occurred together one after another in the same order in the first part of the study. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on. </center></p> <br><br><br>   <input name="img01" type= "checkbox" id="img01" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img0}`
+ '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img1}`
+ '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img2}`
+ '" /> <input name="img03" type= "checkbox" id="img03" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img3}`
+ '" /> <input name="img04" type= "checkbox" id="img04" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img4}`
+ '" /> <input name="img05" type= "checkbox" id="img05" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img5}`
+ '" /> <input name="img06" type= "checkbox" id="img06" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img6}`
+ '" /> <input name="img07" type= "checkbox" id="img07" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img7}` + '" /> '

const sorting_stimuli_stage1_trial1_planC_string_02 =
'       <input name="img08" type= "checkbox" id="img08" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img8}`
+ '" /> <input name="img09" type= "checkbox" id="img09" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img9}`
+ '" /> <input name="img10" type= "checkbox" id="img10" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img10}`
+ '" /> <input name="img11" type= "checkbox" id="img11" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img11}`
+ '" /> <input name="img12" type= "checkbox" id="img12" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img12}`+ '" />'

const sorting_stimuli_stage1_trial1_planC_string_03 =
'       <input name="img13" type= "checkbox" id="img13" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img13}`
+ '" /> <input name="img14" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img14}`
+ '" /> <input name="img15" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img15}`
+ '" /> <input name="img16" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img16}`
+ '" /> <input name="img17" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img17}`
+ '" /> <input name="img18" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img18}`
+ '" /> <input name="img19" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img19}`
+ '" /> <input name="img20" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img20}`
+ '" /> <input name="img21" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img21}`
+ '" /> <input name="img22" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img22}`
+ '" /> <input name="img23" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img23}`
+ '" /> <input name="img24" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img24}`
+ '" /> <input name="img25" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img25}` + '" /> <br><br>'

var sort_trial_stage1_trial1_planC = {
    type: 'survey-multi-select', //'html-button-response'
      questions: [
        {
          //preamble: '<p> Please select 3 shapes that you remember seeing in a regular order from the first part of the experiment. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on.</p>',
          prompt: sorting_stimuli_stage1_trial1_planC_string_01 + sorting_stimuli_stage1_trial1_planC_string_02 + sorting_stimuli_stage1_trial1_planC_string_03,
          options: ["                  ","                  ", "                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  "],
          horizontal: true,
          required: true,
          name: 'stage1_trial1_planC',
          selection: '3'
        }
    ],
      required_message:'You must choose exactly 3 shapes for this question!',
      on_finish: function (data) {
          data.selection_stim = [`${img0}`,`${img1}`,`${img2}`,`${img3}`,`${img4}`,`${img5}`,`${img6}`,`${img7}`,`${img8}`,`${img9}`,`${img10}`,`${img11}`,`${img12}`,`${img13}`,`${img14}`,
              `${img15}`,`${img16}`,`${img17}`,`${img18}`,`${img19}`,`${img20}`,`${img21}`,`${img22}`,`${img23}`,`${img24}`,`${img25}`];
          data.test_part = 'post_selection'
      }
  };

//timeline.push(sort_trial_stage1_trial1_planC);


var sorting_stimuli_stage1_trial2_planC = shuffle(sorting_stimuli_stage1_trial1_planC);
//console.log(sorting_stimuli_stage1_trial1_planA); //length should be 15 (12 freq non-trigger + 3 fast trigger)
var sorting_stimuli_stage1_trial2_planC_rename = []
for (var i = 0; i < sorting_stimuli_stage1_trial2_planC.length; i++) {
    //sorting_stimuli_stage1_trial1_planA[i]
    var x = i + 26
    sorting_stimuli_stage1_trial2_planC_rename[i] = '"' + sorting_stimuli_stage1_trial2_planC[i] + '"'
    looseJsonParse("img" + x + "=" + sorting_stimuli_stage1_trial2_planC_rename[i])
}


const sorting_stimuli_stage1_trial2_planC_string_01 =
'<p> <center> Please select <b>ANOTHER</b> 3 shapes that always occurred together one after another in the same order in the first part of the study. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on. </center></p> <br><br><br>   <input name="img01" type= "checkbox" id="img01" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img26}`
+ '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img27}`
+ '" /> <input name="img02" type= "checkbox" id="img02" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img28}`
+ '" /> <input name="img03" type= "checkbox" id="img03" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img29}`
+ '" /> <input name="img04" type= "checkbox" id="img04" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img30}`
+ '" /> <input name="img05" type= "checkbox" id="img05" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img31}`
+ '" /> <input name="img06" type= "checkbox" id="img06" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img32}`
+ '" /> <input name="img07" type= "checkbox" id="img07" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img33}` + '" /> '

const sorting_stimuli_stage1_trial2_planC_string_02 =
'       <input name="img08" type= "checkbox" id="img08" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img34}`
+ '" /> <input name="img09" type= "checkbox" id="img09" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img35}`
+ '" /> <input name="img10" type= "checkbox" id="img10" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img36}`
+ '" /> <input name="img11" type= "checkbox" id="img11" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img37}`
+ '" /> <input name="img12" type= "checkbox" id="img12" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img38}`+ '" />'

const sorting_stimuli_stage1_trial2_planC_string_03 =
'       <input name="img13" type= "checkbox" id="img13" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img39}`
+ '" /> <input name="img14" type= "checkbox" id="img14" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img40}`
+ '" /> <input name="img15" type= "checkbox" id="img15" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img41}`
+ '" /> <input name="img16" type= "checkbox" id="img16" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img42}`
+ '" /> <input name="img17" type= "checkbox" id="img17" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img43}`
+ '" /> <input name="img18" type= "checkbox" id="img18" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img44}`
+ '" /> <input name="img19" type= "checkbox" id="img19" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img45}`
+ '" /> <input name="img20" type= "checkbox" id="img20" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img46}`
+ '" /> <input name="img21" type= "checkbox" id="img21" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img47}`
+ '" /> <input name="img22" type= "checkbox" id="img22" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img48}`
+ '" /> <input name="img23" type= "checkbox" id="img23" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img49}`
+ '" /> <input name="img24" type= "checkbox" id="img24" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img50}`
+ '" /> <input name="img25" type= "checkbox" id="img25" style= "margin-left: 4em;  margin-right: 0em; margin-top: 2em;"> <label for="course"> <img style= "margin-left: 0em;  margin-right: 1em; margin-top: 2em; vertical-align: middle;" src="' + `${img51}` + '" /> <br><br>'

var sort_trial_stage1_trial2_planC = {
    type: 'survey-multi-select', //'html-button-response'
      questions: [
        {
          //preamble: '<p> Please select 3 shapes that you remember seeing in a regular order from the first part of the experiment. <br> Click on the checkbox to select and unselect. <br> You must select exactly 3 shapes to move on.</p>',
          prompt: sorting_stimuli_stage1_trial2_planC_string_01 + sorting_stimuli_stage1_trial2_planC_string_02 + sorting_stimuli_stage1_trial2_planC_string_03,
          options: ["                  ","                  ", "                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  ","                  "],
          horizontal: true,
          required: true,
          name: 'stage1_trial2_planC',
          selection: '3'
        }
    ],
      required_message:'You must choose exactly 3 shapes for this question!',
      on_finish: function (data) {
          data.selection_stim = [`${img26}`,`${img27}`,`${img28}`,`${img29}`,`${img30}`,`${img31}`,`${img32}`,`${img33}`,`${img34}`,`${img35}`,`${img36}`,`${img37}`,`${img38}`,`${img39}`,`${img40}`,
              `${img41}`,`${img42}`,`${img43}`,`${img44}`,`${img45}`,`${img46}`,`${img47}`,`${img48}`,`${img49}`,`${img50}`,`${img51}`];
          data.test_part = 'post_selection'
      }
  };

//timeline.push(sort_trial_stage1_trial2_planC);

/* ----- Darg and Drop Trials ----- */
var instruction8 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        In this section, we will ask you to recreate groups of 3 shapes that you remember from the first part of the experiment. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
//timeline.push(instruction8);

var sorting_stimuli= [];
for (var i = 0; i < lr_triplet_full.length; i++) {
    sorting_stimuli.push(repo_site + lr_triplet_full[i]);
}

var sort_trial_1 = {
    type: 'free-sort',
    stimuli: sorting_stimuli.slice(0,3),
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the experiment.<br>  Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, and the shape that you remember seeing third to the right. <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box.</p>',
    stim_height: 50,
    stim_width: 50,
    scale_factor: 2,
    border_width: 2,
    sort_area_shape: "square",
    stim_starts_inside:false,
    sort_area_height: 100,
    sort_area_width: 300,
    column_spread_factor: 1.5,
    on_finish: function (data) {
        data.test_part = 'post_drag'
        data.sorting_stimuli = lr_triplet_1
    }

};
//timeline.push(sort_trial_1);


var sort_trial_2 = {
    type: 'free-sort',
    stimuli: sorting_stimuli.slice(3,6),
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the experiment.<br>  Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, and the shape that you remember seeing third to the right. <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box.</p>',
    stim_height: 50,
    stim_width: 50,
    scale_factor: 2,
    border_width: 2,
    sort_area_shape: "square",
    stim_starts_inside:false,
    sort_area_height: 100,
    sort_area_width: 300,
    column_spread_factor: 1.5,
    on_finish: function (data) {
        data.test_part = 'post_drag',
        data.sorting_stimuli = lr_triplet_2
    }
};
//timeline.push(sort_trial_2);



/* -----A Few Q on Rules----- */
var FR_Q1 = {
    type: 'survey-text',
    questions: [
    {prompt: '<p> During the first part of the study, did you notice the presence of regular sequence of 3 shapes before the instruction told you so? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p>', name: FR_Q1, rows: 5, columns: 80, required: true},
  ],
};
//timeline.push(FR_Q1);




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
//timeline.push(multi_choice_Demo);

var interaction_data = jsPsych.data.getInteractionData();
jsPsych.data.checks = interaction_data;

//var timeline_full = [enter_full, consent, instruction, prac_block, debrief, instruction2, first3_block, at_test_procedure, instruction3, practice_presentation, instruction4, target_presentation, instruction6, sort_trial_stage1_trial1_planC, instruction8, sort_trial_1, sort_trial_2, FR_Q1, multi_choice_Demo];
//var timeline_test = [instruction6, sort_trial_stage1_trial1_planC, sort_trial_stage1_trial2_planC, instruction8];
timeline.push(enter_full, consent, instruction, prac_block, debrief, instruction2, first3_block, at_test_procedure, instruction3, practice_presentation, instruction4, target_presentation,
    instruction6, sort_trial_stage1_trial1_planC, sort_trial_stage1_trial2_planC, instruction8, sort_trial_1, sort_trial_2, FR_Q1, multi_choice_Demo)


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
