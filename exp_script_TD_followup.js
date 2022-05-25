var task_name = "Stats_learning_trig";
var sbj_id = "test01";

//you must put your save_data php url here.
var save_url = "https://users.rcc.uchicago.edu/~zz112/exp_data/save_data.php";
var data_dir = task_name;

//my preference is to include the task and sbj_id in the file name
var file_name = task_name + '_' + sbj_id;

var repo_site = "https://ziweizhang0304.github.io/Stats_learning_trig/";

var timeline = [];

//Read in csv file as stimulis; In this file we'll have stimuli sets for the two tasks. then we can separate them in this script
console.log(followup_stimuli[0])
console.log(followup_stimuli.length)

function findWithAttr(array, search_key, search_value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][search_key] === search_value) {
            return i;
        }
    }
    return -1;
};

function findWithAttr_target(array, search_key, search_value, target_key) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][search_key] === search_value) {
            var target_value = array[i][target_key]
            return target_value;
        }
    }
};


function get_target_time(animation_sequence,response, TD_target,set) {

    //var onset_time = []
    var offset_time = []
    var offset_time_blank = []
    var shapes_reacted_to = []
    var shapes_reacted_to_index = []
    var target_index = findWithAttr(animation_sequence, 'stimulus', TD_target)
    console.log(target_index)
    var onset_time = findWithAttr_target(animation_sequence, 'stimulus', TD_target, 'time')

    function checkindex(index) {
                    var index_after_target = index > target_index
                    return  index_after_target;}

    if (set =='onset') {
    return onset_time
}

    if (set =='offset'){
            var shapes_rt_index_after_target = []

            //need to keep a counter for blank

            response.forEach(function myFunction(value) {
            var shape = value.stimulus //response.stimulus
            console.log(shape)
            shapes_reacted_to.push(shape)
            console.log(shapes_reacted_to)

            var shape_index = findWithAttr(animation_sequence, 'stimulus', shape)
            shapes_reacted_to_index.push(shape_index)
            console.log(shapes_reacted_to_index)

            if (shape == "blank" ) {
                // var shape_index_blank = findLastIndex(animation_sequence, 'stimulus', shape)
                // shapes_reacted_to_index.push(shape_index_blank)
                offset_time_blank.push(value.rt)
            }  else {

            if (shape == TD_target) { //shape_index = target_index
                offset_time.push(value.rt)
                }
            else if (shape_index > target_index){
                //console.log('this is post target')
                shapes_rt_index_after_target.push(value.rt)
                //console.log(shapes_rt_index_after_target)
            }}

    })
        console.log('this is when the target appears')
        console.log(onset_time)

        console.log('this is when the target is responded to')
        console.log(offset_time)
        console.log(offset_time.length)

        console.log('this is all press to shapes')
        console.log(shapes_rt_index_after_target)
        console.log(shapes_rt_index_after_target.length)

        console.log('this is all press to blank')
        console.log(offset_time_blank)
        console.log(offset_time_blank.length)

        var all_rt = Array.prototype.concat.apply([], [offset_time, offset_time_blank, shapes_rt_index_after_target]);
        var all_rt_sorted = all_rt.sort(function(a, b){return a-b});
        var result = all_rt_sorted.find(element => {
                    return element > onset_time;
        });
        console.log(all_rt)
        console.log(all_rt_sorted)
        console.log(result)
        return result

            //for every index in shapes_reacted_to_index, if all of them < target_index, then log
            // if (shapes_reacted_to_index.every( (val) => val <target_index) && shapes_reacted_to.includes(TD_target) == false ) {
            //     console.log('pressed before target')
            //     //console.log(shapes_reacted_to_index.every( (val) => val <target_index))
            //     console.log(shapes_reacted_to_index)
            // } else {
            //     if () {
            //
            //     };
            // //if any of them > target_index and no press to target, then take the rt of the first after target
            // else if(shapes_reacted_to_index.some(checkindex) && shapes_reacted_to.includes(TD_target) == false){ // Returns true
            //     time.push(shapes_rt_index_after_target[0])
            //     //console.log(shapes_reacted_to_index.some(checkindex))
            //     //console.log(shapes_rt_index_after_target)
            // }
            // console.log('these are all the responses' + time)}
    };
    //return result
};

function string_to_object(s){
    var match = s.split(',')
    console.log(match)
    return match;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

/* -----Full screen-----*/
var enter_full = {
  type: 'fullscreen',
  fullscreen_mode: true
};
timeline.push(enter_full);


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
timeline.push(consent);

//loop through each list of 24 lists of TD trial sequences and assign a target each time
/* -----Part 1: TD----- */
var instruction1 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        Welcome to the study! <br>\n' +
        '        <br>\n' +
        '        The study contains two parts. Click on “Next” to read the instructions for the first part. <br>\n' +
        '        <br>\n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        Please read the instructions for the first part of the study carefully. <br>\n' +
        '        <br>\n' +
        '        At the beginning of each trial, you will see one shape. <br>\n' +
        '        <br>\n' +
        '        This shape is called the <b>target shape</b>.  <br>\n' +
        '        <br>\n' +
        '        You will then see a series of shapes, presented one at a time.  <br>\n' +
        '        <br>\n' +
        '        When you see the target shape in the series of shapes, press the <b>SPACEBAR</b>. <br>\n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        Again, whenever you see the target shape, press the <b>SPACEBAR</b>. <br>\n' +
        '        <br>\n' +
        '        <b>DO NOT</b> press any button to any other shapes. <br>\n' +
        '        <br>\n' +
        '        Notice that the shapes will go by very fast so please respond quickly and accurately. <br>\n' +
        '        <br>\n' +
        '        Click on "Next" to move on. <br> \n' +
        '</p> <br>',

        '<p style="color:black;font-size: 26px">\n' +
        '        Now you will do a short practice. <br>\n' +
        '        <br>\n' +
        '        When you are ready, click “Next” to start the practice. <br>\n' +
        '</p> <br>',

    ],
    show_clickable_nav: true,
}
timeline.push(instruction1);


var instruction2 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */

        '<p style="color:black;font-size: 26px">\n' +
        '        You have finished the practice part. <br>\n' +
        '        <br>\n' +
        '        Now click “Next” to start the first part of the study. <br>\n' +
        '</p> <br>',

    ],
    show_clickable_nav: true,
};



//--------- Real TD --------- //

// now this variable followup_stimuli is a list of 24 objects, each containing 4 elements.
// we need the second as animation_sequence_1
// the fourth as TD_target
var TD_target_1 = followup_stimuli[0].TD_target
console.log(TD_target_1)

var TD_target_present_1 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_1, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_1 = string_to_object(followup_stimuli[0].TD_stim_list)
console.log(typeof animation_sequence_1)
console.log(animation_sequence_1)
var TD_trial_sequence_1 = {
    type: 'animation',
    frame_time: 300,
    stimuli: animation_sequence_1,
    frame_isi: 40,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().filter({ trial_type: 'animation' }).last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().filter({ trial_type: 'animation' }).last(1).select('response').values)
        console.log(response)

        //in animation_sequence, find where the stimulus value is target, grab the time as onset
        var onset = get_target_time(animation_sequence,response, TD_target_1,'onset')
        //in response, find where the the stimulus value is target, grab the rt as offset, rt = offset - onset
        //if no press made to target, grab the first post-target rt as offset
        var offset = get_target_time(animation_sequence,response, TD_target_1,'offset')
        data.TD_trial_number = 1
        data.onset = onset
        data.offset = offset
        console.log('this is onset ', onset, 'this is offset ', offset)

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[0].attention_state
        data.TD_target_position = followup_stimuli[0].TD_target_position

        data.TD_target = TD_target_1
        data.test_part = 'post_TD'
    }
};
var TD1 = {
    timeline: [TD_target_present_1 , TD_trial_sequence_1],
    randomize_order: false,
    repetitions: 1
};



var TD_target_2 = followup_stimuli[1].TD_target
var TD_target_present_2 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_2, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_2 = string_to_object(followup_stimuli[1].TD_stim_list)
console.log(typeof animation_sequence_2)
console.log(animation_sequence_2)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[1].attention_state
        data.TD_target_position = followup_stimuli[1].TD_target_position

        data.TD_target = TD_target_2
        data.test_part = 'post_TD'
    }
};
var TD2 = {
    timeline: [TD_target_present_2 , TD_trial_sequence_2],
    randomize_order: false,
    repetitions: 1
};


var TD_target_3 = followup_stimuli[2].TD_target
var TD_target_present_3 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_3, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_3 = string_to_object(followup_stimuli[2].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[2].attention_state
        data.TD_target_position = followup_stimuli[2].TD_target_position

        data.TD_target = TD_target_3
        data.test_part = 'post_TD'
    }
};
var TD3 = {
    timeline: [TD_target_present_3 , TD_trial_sequence_3],
    randomize_order: false,
    repetitions: 1
};


var TD_target_4 = followup_stimuli[3].TD_target
var TD_target_present_4 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_4, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_4 = string_to_object(followup_stimuli[3].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[3].attention_state
        data.TD_target_position = followup_stimuli[3].TD_target_position

        data.TD_target = TD_target_4
        data.test_part = 'post_TD'
    }
};
var TD4 = {
    timeline: [TD_target_present_4 , TD_trial_sequence_4],
    randomize_order: false,
    repetitions: 1
};


var TD_target_5 = followup_stimuli[4].TD_target

var TD_target_present_5 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_5, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};

var animation_sequence_5 = string_to_object(followup_stimuli[4].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[4].attention_state
        data.TD_target_position = followup_stimuli[4].TD_target_position

        data.TD_target = TD_target_5
        data.test_part = 'post_TD'
    }
};

var TD5 = {
    timeline: [TD_target_present_5 , TD_trial_sequence_5],
    randomize_order: false,
    repetitions: 1
};


var TD_target_6 = followup_stimuli[5].TD_target
var TD_target_present_6 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_6, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_6 = string_to_object(followup_stimuli[5].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[5].attention_state
        data.TD_target_position = followup_stimuli[5].TD_target_position

        data.TD_target = TD_target_6
        data.test_part = 'post_TD'
    }
};
var TD6 = {
    timeline: [TD_target_present_6 , TD_trial_sequence_6],
    randomize_order: false,
    repetitions: 1
};


var TD_target_7 = followup_stimuli[6].TD_target
var TD_target_present_7 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_7, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_7 = string_to_object(followup_stimuli[6].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[6].attention_state
        data.TD_target_position = followup_stimuli[6].TD_target_position

        data.TD_target = TD_target_7
        data.test_part = 'post_TD'
    }
};
var TD7 = {
    timeline: [TD_target_present_7 , TD_trial_sequence_7],
    randomize_order: false,
    repetitions: 1
};


var TD_target_8 = followup_stimuli[7].TD_target
var TD_target_present_8 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_8, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_8 = string_to_object(followup_stimuli[7].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[7].attention_state
        data.TD_target_position = followup_stimuli[7].TD_target_position

        data.TD_target = TD_target_8
        data.test_part = 'post_TD'
    }
};
var TD8 = {
    timeline: [TD_target_present_8 , TD_trial_sequence_8],
    randomize_order: false,
    repetitions: 1
};


var TD_target_9 = followup_stimuli[8].TD_target
var TD_target_present_9 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_9, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_9 = string_to_object(followup_stimuli[8].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[8].attention_state
        data.TD_target_position = followup_stimuli[8].TD_target_position

        data.TD_target = TD_target_9
        data.test_part = 'post_TD'
    }
};
var TD9 = {
    timeline: [TD_target_present_9 , TD_trial_sequence_9],
    randomize_order: false,
    repetitions: 1
};


var TD_target_10 = followup_stimuli[9].TD_target
var TD_target_present_10 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_10, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_10 = string_to_object(followup_stimuli[9].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[9].attention_state
        data.TD_target_position = followup_stimuli[9].TD_target_position

        data.TD_target = TD_target_10
        data.test_part = 'post_TD'
    }
};
var TD10 = {
    timeline: [TD_target_present_10 , TD_trial_sequence_10],
    randomize_order: false,
    repetitions: 1
};


var TD_target_11 = followup_stimuli[10].TD_target
var TD_target_present_11 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_11, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_11 = string_to_object(followup_stimuli[10].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[10].attention_state
        data.TD_target_position = followup_stimuli[10].TD_target_position

        data.TD_target = TD_target_11
        data.test_part = 'post_TD'
    }
};
var TD11 = {
    timeline: [TD_target_present_11, TD_trial_sequence_11],
    randomize_order: false,
    repetitions: 1
};


var TD_target_12 = followup_stimuli[11].TD_target
var TD_target_present_12 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_12, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_12 =  string_to_object(followup_stimuli[11].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[11].attention_state
        data.TD_target_position = followup_stimuli[11].TD_target_position

        data.TD_target = TD_target_12
        data.test_part = 'post_TD'
    }
};
var TD12 = {
    timeline: [TD_target_present_12, TD_trial_sequence_12],
    randomize_order: false,
    repetitions: 1
};


var TD_target_13 = followup_stimuli[12].TD_target
var TD_target_present_13 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_13, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_13 = string_to_object(followup_stimuli[12].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[12].attention_state
        data.TD_target_position = followup_stimuli[12].TD_target_position

        data.TD_target = TD_target_13
        data.test_part = 'post_TD'
    }
};
var TD13 = {
    timeline: [TD_target_present_13, TD_trial_sequence_13],
    randomize_order: false,
    repetitions: 1
};

var TD_target_14 = followup_stimuli[13].TD_target
var TD_target_present_14 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_14, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_14 = string_to_object(followup_stimuli[13].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[13].attention_state
        data.TD_target_position = followup_stimuli[13].TD_target_position

        data.TD_target = TD_target_14
        data.test_part = 'post_TD'
    }
};
var TD14 = {
    timeline: [TD_target_present_14, TD_trial_sequence_14],
    randomize_order: false,
    repetitions: 1
};


var TD_target_15 = followup_stimuli[14].TD_target
var TD_target_present_15 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_15, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_15 = string_to_object(followup_stimuli[14].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[14].attention_state
        data.TD_target_position = followup_stimuli[14].TD_target_position

        data.TD_target = TD_target_15
        data.test_part = 'post_TD'
    }
};
var TD15 = {
    timeline: [TD_target_present_15, TD_trial_sequence_15],
    randomize_order: false,
    repetitions: 1
};


var TD_target_16 = followup_stimuli[15].TD_target
var TD_target_present_16 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_16, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_16 = string_to_object(followup_stimuli[15].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[15].attention_state
        data.TD_target_position = followup_stimuli[15].TD_target_position

        data.TD_target = TD_target_16
        data.test_part = 'post_TD'
    }
};
var TD16 = {
    timeline: [TD_target_present_16, TD_trial_sequence_16],
    randomize_order: false,
    repetitions: 1
};


var TD_target_17 = followup_stimuli[16].TD_target
var TD_target_present_17 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_17, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_17 = string_to_object(followup_stimuli[16].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[16].attention_state
        data.TD_target_position = followup_stimuli[16].TD_target_position

        data.TD_target = TD_target_17
        data.test_part = 'post_TD'
    }
};
var TD17 = {
    timeline: [TD_target_present_17, TD_trial_sequence_17],
    randomize_order: false,
    repetitions: 1
};


var TD_target_18 = followup_stimuli[17].TD_target
var TD_target_present_18 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_18, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_18 = string_to_object(followup_stimuli[17].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[17].attention_state
        data.TD_target_position = followup_stimuli[17].TD_target_position

        data.TD_target = TD_target_18
        data.test_part = 'post_TD'
    }
};
var TD18 = {
    timeline: [TD_target_present_18, TD_trial_sequence_18],
    randomize_order: false,
    repetitions: 1
};


var TD_target_19 = followup_stimuli[18].TD_target
var TD_target_present_19 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_19, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_19 = string_to_object(followup_stimuli[18].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[18].attention_state
        data.TD_target_position = followup_stimuli[18].TD_target_position

        data.TD_target = TD_target_19
        data.test_part = 'post_TD'
    }
};
var TD19 = {
    timeline: [TD_target_present_19, TD_trial_sequence_19],
    randomize_order: false,
    repetitions: 1
};


var TD_target_20 = followup_stimuli[19].TD_target
var TD_target_present_20 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_20, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_20 = string_to_object(followup_stimuli[19].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[19].attention_state
        data.TD_target_position = followup_stimuli[19].TD_target_position

        data.TD_target = TD_target_20
        data.test_part = 'post_TD'
    }
};
var TD20 = {
    timeline: [TD_target_present_20, TD_trial_sequence_20],
    randomize_order: false,
    repetitions: 1
};


var TD_target_21 = followup_stimuli[20].TD_target
var TD_target_present_21 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_21, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_21 = string_to_object(followup_stimuli[20].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[20].attention_state
        data.TD_target_position = followup_stimuli[20].TD_target_position

        data.TD_target = TD_target_21
        data.test_part = 'post_TD'
    }
};
var TD21 = {
    timeline: [TD_target_present_21, TD_trial_sequence_21],
    randomize_order: false,
    repetitions: 1
};


var TD_target_22 = followup_stimuli[21].TD_target
var TD_target_present_22 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_22, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_22 = string_to_object(followup_stimuli[21].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[21].attention_state
        data.TD_target_position = followup_stimuli[21].TD_target_position

        data.TD_target = TD_target_22
        data.test_part = 'post_TD'
    }
};
var TD22 = {
    timeline: [TD_target_present_22, TD_trial_sequence_22],
    randomize_order: false,
    repetitions: 1
};


var TD_target_23 = followup_stimuli[22].TD_target
var TD_target_present_23 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_23, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_23 = string_to_object(followup_stimuli[22].TD_stim_list)
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
        data.onset = onset
        data.offset = offset
        data.attention_state = followup_stimuli[22].attention_state
        data.TD_target_position = followup_stimuli[22].TD_target_position

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


var TD_target_24 = followup_stimuli[23].TD_target
var TD_target_present_24 = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_24, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_24 = string_to_object(followup_stimuli[23].TD_stim_list)
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
        data.onset = onset
        data.offset = offset

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        data.attention_state = followup_stimuli[23].attention_state
        data.TD_target_position = followup_stimuli[23].TD_target_position

        data.TD_target = TD_target_24
        data.test_part = 'post_TD'
    }
};
var TD24 = {
    timeline: [TD_target_present_24, TD_trial_sequence_24],
    randomize_order: false,
    repetitions: 1
};

//--------- TD practice --------- //

var prac_trial1_number = getRandomInt(0,23);
console.log(prac_trial1_number)
var TD_target_prac_1 = followup_stimuli[prac_trial1_number].TD_target
var TD_target_present_1_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_1, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_1 = shuffle(string_to_object(followup_stimuli[prac_trial1_number].TD_stim_list));
console.log(string_to_object(followup_stimuli[prac_trial1_number].TD_stim_list))
console.log(animation_sequence_prac_1)
var TD_trial_sequence_1_prac = {
    type: 'animation',
    frame_time: 1000,
    stimuli: animation_sequence_prac_1 ,
    frame_isi: 800,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)
        console.log(response)

        var onset = get_target_time(animation_sequence,response, TD_target_prac_1,'onset')
        var offset = get_target_time(animation_sequence,response, TD_target_prac_1,'offset')

        var TD_rt = offset - onset
        data.TD_rt = TD_rt
        console.log(TD_rt)

        data.TD_target = TD_target_prac_1
        data.test_part = 'post_prac'
    }
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

var TD1_prac = {
    timeline: [TD_target_present_1_prac , TD_trial_sequence_1_prac,debrief_TD_prac],
    randomize_order: false,
    repetitions: 1
};

var prac_trial2_number = getRandomInt(0,23);
console.log(prac_trial2_number)
var TD_target_prac_2 = followup_stimuli[prac_trial2_number].TD_target
var TD_target_present_2_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_2, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_2 = string_to_object(followup_stimuli[prac_trial2_number].TD_stim_list);
var  TD_trial_sequence_2_prac = {
    type: 'animation',
    frame_time: 1000,
    stimuli: animation_sequence_prac_2,
    frame_isi: 800,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)
        console.log(response)

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
var prac_trial3_number = getRandomInt(0,23);
console.log(prac_trial3_number)
var TD_target_prac_3 = followup_stimuli[prac_trial3_number].TD_target
var TD_target_present_3_prac = {
    type: "image-keyboard-response",
    prompt: '<p>On this trial, press the SPACEBAR when you see the shape above. Do not press anything when you see any other shapes. <br> Press enter to start this trial. </p>',
    stimulus: TD_target_prac_3, //TD_stimuli.slice(0): (0,1,2...23); TD_stimulus[3]: [3,4,5,4,5,6,5,6,7,6,7,8,3,4,5,4,5,6,5,6,7,6,7,8]
                                                  //24 trials; 24 targets at different positions
    choices: ['Enter']
};
var animation_sequence_prac_3 = string_to_object(followup_stimuli[prac_trial3_number].TD_stim_list);
var TD_trial_sequence_3_prac = {
    type: 'animation',
    frame_time: 1000,
    stimuli: animation_sequence_prac_3,
    frame_isi: 800,
    choices: ['space'],
    sequence_reps: 1,
    on_finish: function (data) {
        var animation_sequence = JSON.parse(jsPsych.data.get().last(1).select('animation_sequence').values)
        console.log(animation_sequence)
        var response = JSON.parse(jsPsych.data.get().last(1).select('response').values)
        console.log(response)

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
//var shuffledTD_prac = jsPsych.randomization.repeat(Array_TD_prac, 1)
var practice_presentation = {
    timeline: Array_TD_prac,
    randomize_order: false,
    repetitions: 1
}
timeline.push(practice_presentation);
timeline.push(instruction2);


//real TD block
var Array_TD = [TD1, TD2 , TD3, TD4, TD5, TD6,
               TD7, TD8 ,TD9, TD10, TD11, TD12,
               TD13, TD14 ,TD15, TD16, TD17, TD18,
               TD19, TD20 ,TD21, TD22, TD23, TD24];

var target_presentation = {
    timeline: Array_TD,
    randomize_order: false,
    repetitions: 1
}
timeline.push(target_presentation);

//-----Awareness Question 1-----//
var FR_Q1 = {
    type: 'survey-text',
    questions: [
    {prompt: '<p> Did you use any strategies to complete the first part of the study? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p>', name: FR_Q1, rows: 5, columns: 80, required: true},
  ],
};
timeline.push(FR_Q1);

//-----Awareness Question 2-----//
var FR_Q2 = {
    type: 'survey-text',
    questions: [
    {prompt: '<p> Did you notice any patterns in the shapes in the first part of the study? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p>', name: FR_Q1, rows: 5, columns: 80, required: true},
  ],
};
timeline.push(FR_Q2);

/* -----Part 2: Recreate----- */
var instruction3 = {
    type: 'instructions',
    pages: [
        /* -----instr_9----- */
        '<p style="color:black;font-size: 26px">\n' +
        '        Please read the instructions for the second part of the study. <br>\n' +
        '        Some of the shapes you saw in the first part of the study in fact appeared in a regular order. <br>\n' +
        '        <br>\n' +
        '        Therefore, in this section, we will ask you to recreate groups of 3 shapes that you remember from the first part of the study. <br>\n' +
        '        <br>\n' +
        '        Now, click on "Next" to move on. <br> \n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
timeline.push(instruction3);



//-------------Drag and drop-------------//

sort_trial_1_stimuli = string_to_object(followup_stimuli_DD[0].DD_stim_list)
var sort_trial_1 = {
    type: 'free-sort',
    stimuli: sort_trial_1_stimuli,
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the study. <br>  <br> Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, <br>and the shape that you remember seeing third to the right. <br>  <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box. <br>  <br> If you are not sure about the order, just make your best guess. <br>  <br>   <br></p>',
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
        data.attention_state = followup_stimuli_DD[0].attention_state
    }

};
timeline.push(sort_trial_1);

sort_trial_2_stimuli = string_to_object(followup_stimuli_DD[1].DD_stim_list)
var sort_trial_2 = {
    type: 'free-sort',
    stimuli: sort_trial_2_stimuli,
    prompt: '<p>Drag the 3 shapes outside of the box and drop them below in the order that you remember seeing them during the first part of the study.<br>  <br> Place the shape that you remember seeing first to the left, the shape you remember seeing second in the middle, <br> and the shape that you remember seeing third to the right. <br>  <br> When you drag and drop the three shapes, you should make sure that there are space in between them in the box. <br>  <br> If you are not sure about the order, just make your best guess. <br>  <br>  <br></p>',
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
        data.attention_state = followup_stimuli_DD[1].attention_state
    }
};
timeline.push(sort_trial_2);



//-----Final Multiple Choice-----//
var MC_Q3_options = ["Yes", "No", "Not sure"];
var MC_Q4_options = ["Press SPACEBAR to a target", "Press ENTER to a target"];

var multi_choice_Demo = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: 'Please answer some further questions on the study.',
    questions: [
        { prompt: "Did you notice regular sequences of 3 shapes in the first part of the study, before the instructions told you that they were present?", name: 'awareness', options: MC_Q3_options, required: true },
        { prompt: "What is the rule of the first part of the study?", name: 'attention_check', options: MC_Q4_options, required: true },
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
