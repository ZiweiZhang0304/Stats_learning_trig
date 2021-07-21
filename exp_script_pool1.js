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

/* -----ITI----- */
var iti_200 = {
  type: "image-keyboard-response",
  stimulus: repo_site + "img/Stim/gray_bdot.png",
  choices: jsPsych.NO_KEYS,
  trial_duration: 200,
}

/* -----Preload Images----- */
preload_list = [repo_site + 'img/Stim/FN_001_g.png', repo_site + 'img/Stim/FN_002_g.png', repo_site + 'img/Stim/FN_003_g.png',
repo_site +'img/Stim/FN_004_g.png', repo_site + 'img/Stim/FN_005_g.png', repo_site + 'img/Stim/FN_006_g.png',
repo_site +'img/Stim/FN_007_g.png', repo_site + 'img/Stim/FN_008_g.png', repo_site + 'img/Stim/FN_009_g.png',
repo_site +'img/Stim/FN_010_g.png', repo_site + 'img/Stim/FN_011_g.png', repo_site + 'img/Stim/FN_012_g.png',
repo_site + 'img/Stim/FT_001_g.png', repo_site + 'img/Stim/FT_002_g.png', repo_site + 'img/Stim/FT_003_g.png',
repo_site + 'img/Stim/FT_004_g.png', repo_site + 'img/Stim/FT_005_g.png', repo_site + 'img/Stim/FT_006_g.png',
repo_site + 'img/Stim/FT_007_g.png', repo_site + 'img/Stim/FT_008_g.png', repo_site + 'img/Stim/FT_009_g.png',
repo_site + 'img/Stim/IF_001_g.png',repo_site + 'img/Stim/IF_002_g.png',repo_site + 'img/Stim/IF_003_g.png',repo_site + 'img/Stim/IF_004_g.png',
repo_site + 'img/Stim/FN_001_w.png', repo_site + 'img/Stim/FN_002_w.png', repo_site + 'img/Stim/FN_003_w.png',
repo_site +'img/Stim/FN_004_w.png', repo_site + 'img/Stim/FN_005_w.png', repo_site + 'img/Stim/FN_006_w.png',
repo_site +'img/Stim/FN_007_w.png', repo_site + 'img/Stim/FN_008_w.png', repo_site + 'img/Stim/FN_009_w.png',
repo_site +'img/Stim/FN_010_w.png', repo_site + 'img/Stim/FN_011_w.png', repo_site + 'img/Stim/FN_012_w.png',
repo_site + 'img/Stim/FT_001_w.png', repo_site + 'img/Stim/FT_002_w.png', repo_site + 'img/Stim/FT_003_w.png',
repo_site + 'img/Stim/FT_004_w.png', repo_site + 'img/Stim/FT_005_w.png', repo_site + 'img/Stim/FT_006_w.png',
repo_site + 'img/Stim/FT_007_w.png', repo_site + 'img/Stim/FT_008_w.png', repo_site + 'img/Stim/FT_009_w.png',
repo_site + 'img/Stim/IF_001_w.png',repo_site + 'img/Stim/IF_002_w.png',repo_site + 'img/Stim/IF_003_w.png',repo_site + 'img/Stim/IF_004_w.png',
repo_site +'img/Stim/gray_bdot.png']

/* -----Instructions----- */
var instruction = {
    type: 'instructions',
    pages: [
        /* -----instr_1----- */
        '<p style="color:black;font-size:26px">\n' +
        '        Welcome to the Gemstone Expedition! <br>\n' +
        '        <br>\n' +
        '        In this game, you are training to become a gemologist—an expert in gemstones. <br>\n' +
        '        <br>\n' +
        '        During the game, you will discover beautiful gemstones, like these: <br>\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    <p>\n' +
        '       <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem01.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem02.png" />\n' +
        '       <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem03.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem04.png" />\n' +
        '\n' +
        '    </p>\n' +
        '        <br>\n' +
        '    <p style="color:black;font-size:26px">\n' +
        '        When you find a gem, your job is to identify where the gem came from <br>\n' +
        '        by pressing a button on your keyboard. <br>\n' +
        '        <br>\n' +
        '        If you correctly identify where the gem came from, you earn a gold star! <br>\n' +
        '        You do not earn a gold star for incorrectly identified gems. <br>\n' +
        '\n' +
        '    </p>',

        /* -----instr_2----- */
        '<p style="color:black;font-size:26px">\n' +
        '    Your gemology training will take place in two different locations: <br>\n' +
        '    a faraway mountain and a deserted road, like this:\n' +
        '</p>\n' +
        '<br>\n' +
        '     <img src="https://zz112duke.github.io/Gem_learning/img/Stim/TS232_ex.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/TS110_ex.png" />\n' +
        '<br>\n' +
        '\n' +
        '<p style="color:black;font-size:26px">\n' +
        '\n' +
        '        When you are on the mountain, indicate whether the gem came from <br>\n' +
        '        the top of the mountain by pressing the <span style="font-size: 26px"><b><kbd>Up</kbd></b></span> arrow key <br>\n' +
        '        or the bottom of the mountain by pressing the <span style="font-size: 26px"><b><kbd>Down</kbd></b></span> arrow key on the keyboard. <br>\n' +
        '        <br>\n' +
        '        When you are on the road, indicate whether the gem originated from <br>\n' +
        '        the left side of the road by pressing the <span style="font-size: 26px"><b><kbd>Left</kbd></b></span> arrow key <br>\n' +
        '        or the right side of the road by pressing the <span style="font-size: 26px"><b><kbd>Right</kbd></b></span> arrow key on the keyboard. <br>\n' +
        '</p>',

        /* -----instr_3----- */
        '<p style="color:black;font-size: 26px">\n' +
        '    Notice that the gemstones come in different cuts: <br>\n' +
        '    straight-edged (square and rounded square) and round (circle and oval). <br>\n' +
        '    <br>\n' +
        '    They also come in different colors: <br>\n' +
        '    warm-toned colors (yellow and orange) and cool-toned colors (light blue and dark blue). <br>\n' +
        '    Like this: <br>\n' +
        '</p>\n' +
        '\n' +
        '    <br>\n' +
        '<p>\n' +
        '\n' +
        '    <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem01.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem03.png" />\n' +
        '    <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem02.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/gem04.png" /><br>\n' +
        '</p>\n' +
        '<br>\n' +
        '<p style="color:black;font-size: 26px">\n' +
        '    This information may be helpful for figuring out where the gems came from.<br>\n' +
        '</p>',

        /* -----instr_4----- */
        '<p style="color:black;font-size: 26px">\n' +
        '    Because you are still a gemologist-in-training,  <br>\n' +
        '    you will have to learn where the gems came from. <br>\n' +
        '    <br>\n' +
        '    There are only two possible responses in each location: <br>\n' +
        '\n' +
        '    <span style="font-size: 26px"><b><kbd>Up</kbd></b></span> or <span style="font-size: 26px"><b><kbd>Down</kbd></b></span> on the mountain, <br>\n' +
        '    and <span style="font-size: 26px"><b><kbd>Left</kbd></b></span> or <span style="font-size: 26px"><b><kbd>Right</kbd></b></span> on the road.<br>\n' +
        '    <br>\n' +
        '    You will learn where different types of gems come from <br>\n' +
        '    based on the feedback you receive after each response. <br>\n' +
        '    <br>\n' +
        '    A gold star indicates a correct response, and a red X indicates an incorrect response, like this:\n' +
        '    </p>\n' +
        '    <br>\n' +
        '    <img src="https://zz112duke.github.io/Gem_learning/img/Stim/correct_ex.png" /> <img src="https://zz112duke.github.io/Gem_learning/img/Stim/incorrect_ex.png" />',

        /* -----instr_5----- */
        '<p style="color:black;font-size:26px">\n' +
        '\n' +
        '    Every time you see a gem, please respond as quickly and accurately as you can. <br>\n' +
        '<br>\n' +
        '    It is very important that you do your best. <br>\n' +
        '<br>\n' +
        '    Although the expedition may seem difficult at first, it should be do-able, especially if you are focused. <br>\n' +
        '</p>\n' +
        '<br>\n' +
        '<p style="color:black;font-size: 26px">\n' +
        '        Please DO NOT quit or refresh the webpage. <br>\n' +
        '        Unfortunately, we are unable to accept your HIT if you exit out of the page or refresh it.<br>\n' +
        '        Now, click on "Next" to start the main experiment. <br> \n' +
        '        <br> Happy exploring!\n' +
        '</p> <br>'
    ],
    show_clickable_nav: true,
}
//timeline.push(instruction);


/* -----define learning triplet stimuli----- */
var frequent_nontrigger = ["img/Stim/FN_001_g.png", "img/Stim/FN_002_g.png", "img/Stim/FN_003_g.png", "img/Stim/FN_004_g.png", "img/Stim/FN_005_g.png", "img/Stim/FN_006_g.png"
, "img/Stim/FN_007_g.png", "img/Stim/FN_008_g.png","img/Stim/FN_009_g.png", "img/Stim/FN_010_g.png", "img/Stim/FN_011_g.png", "img/Stim/FN_012_g.png"]
var infrequent_target = ["img/Stim/IF_001_g.png", "img/Stim/IF_002_g.png", "img/Stim/IF_003_g.png", "img/Stim/IF_004_g.png"]

var frequent_trigger = ["img/Stim/FT_001_g.png", "img/Stim/FT_002_g.png", "img/Stim/FT_003_g.png", "img/Stim/FT_004_g.png", "img/Stim/FT_005_g.png", "img/Stim/FT_006_g.png"
, "img/Stim/FT_007_g.png", "img/Stim/FT_008_g.png", "img/Stim/FT_009_g.png"]
/* -----define attention stimuli----- */

var repetition = []
for (i = 0; i < 108; i++) { //1080

    stimuli_freq = frequent_nontrigger[Math.floor((Math.random()) * frequent_nontrigger.length)];
    repetition.push(String(stimuli_freq.charAt(9)) + String(stimuli_freq.charAt(10)) + String(stimuli_freq.charAt(11)) + String(stimuli_freq.charAt(12)) + String(stimuli_freq.charAt(13)) + String(stimuli_freq.charAt(14)) );


    if (i != 0) {

        while (repetition[i] == repetition[i - 1]) {
            stimuli_freq = frequent_nontrigger[Math.floor((Math.random()) * frequent_nontrigger.length)];
            repetition[i] = (String(stimuli_freq.charAt(9)) + String(stimuli_freq.charAt(10)) + String(stimuli_freq.charAt(11)) + String(stimuli_freq.charAt(12)) + String(stimuli_freq.charAt(13)) + String(stimuli_freq.charAt(14)) );
            if (repetition[i] != repetition[i - 1]) { break };
        }
    }

}
//console.log(repetition,repetition.length)

var repetition_1 = []
for (i = 0; i < 12; i++) {//120

    stimuli_infreq = infrequent_target[Math.floor((Math.random()) * infrequent_target.length)];
    repetition_1.push(String(String(stimuli_infreq.charAt(9)) + String(stimuli_infreq.charAt(10)) + String(stimuli_infreq.charAt(11)) + stimuli_infreq.charAt(12)) + String(stimuli_infreq.charAt(13)) + String(stimuli_infreq.charAt(14)) );


    if (i != 0) {

        while (repetition_1[i] == repetition_1[i - 1]) {
            stimuli_infreq = infrequent_target[Math.floor((Math.random()) * infrequent_target.length)];
            repetition_1[i] = (String(stimuli_infreq.charAt(9)) + String(stimuli_infreq.charAt(10)) + String(stimuli_infreq.charAt(11)) + String(stimuli_infreq.charAt(12)) + String(stimuli_infreq.charAt(13)) + String(stimuli_infreq.charAt(14)) );
            if (repetition_1[i] != repetition_1[i - 1]) { break };
        }
    }

}
//console.log(repetition_1,repetition_1.length)


var repetition_1_attention = repetition_1.slice(0, 12);
var repetition_attention = repetition.slice(0, 108);

var at_stimuli = []
for (i = 0; i < repetition_1_attention.length; i++) {
    repetition_attention.splice(Math.floor((Math.random() * repetition_attention.length)), 0, repetition_1_attention[i]);
};

/* -----attention task stimuli----- */
for (j = 0; j < repetition_attention.length; j++) {
    var stimuli = new Object();
    stimuli.at_stimulus = repo_site  + 'img/Stim/' + repetition_attention[j] + '.png';

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


/*var lr_triplet_1 = [
    { lr_stimulus: repo_site + "img/Stim/FT_001.png", data: {TaskType: 'lr'}},
    { lr_stimulus: repo_site + "img/Stim/FT_002.png", data: {TaskType: 'lr'}},
    { lr_stimulus: repo_site + "img/Stim/FT_003.png", data: {TaskType: 'lr'}},
];


/* -----randomize triplet-attention state pair----- */
var lr_stimuli_1 = []
var lr_stimuli_2 = []
var lr_stimuli_3 = []
var attention_state_list = shuffle(['fast', 'slow', 'medium']);
//var index = Math.floor((Math.random()) * lr_triplet_list.length);

for (i = 0; i < lr_triplet_1.length; i++) {
    var stimuli = new Object();
    stimuli.lr_stimulus = repo_site + lr_triplet_1[i] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[0];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.at_fix = rep(stimuli.lr_stimulus); //rep???

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

    stimuli.at_fix = rep(stimuli.lr_stimulus); //rep???

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'lr';
    lr_stimuli_2.push(stimuli);
};

for (i = 0; i < lr_triplet_3.length; i++) {
    var stimuli = new Object();
    stimuli.lr_stimulus = repo_site + lr_triplet_3[i] ;
    stimuli.data = new Object();

    stimuli.data.attention_state = attention_state_list[2];
    stimuli.allowed_keys = 'space';
    stimuli.data.correct_response = 'space';
    stimuli.data.at_TrialType = 'frequent';

    stimuli.at_fix = rep(stimuli.lr_stimulus); //rep???

    stimuli.data.test_part = 'test';
    stimuli.data.TaskType = 'lr';
    lr_stimuli_3.push(stimuli);
};

var lr_triplet_complete = lr_stimuli_1.concat(lr_stimuli_2, lr_stimuli_3);
console.log(lr_triplet_complete);


var learning = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('lr_stimulus'),
  data: jsPsych.timelineVariable('data'),
  choices: ['space'],
  trial_duration: 800,
  response_ends_trial: true,
  on_finish: function(data){
    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var counter = jsPsych.data.get().filter({TaskType: 'lr'}).select('rt').values.length;
    data.counter = counter;
  }
}



var lr_test_TS1 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_1,
  sample: {
  type: 'with-replacement',
  size: 1,
},
  randomize_order: true,
  repetitions: 1
};

var lr_test_TS2 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_2,
  sample: {
  type: 'with-replacement',
  size: 1,
},
  randomize_order: true,
  repetitions: 1
};

var lr_test_TS3 = {
  timeline: [learning],
  timeline_variables: lr_stimuli_3,
  sample: {
  type: 'with-replacement',
  size: 1,
},
  randomize_order: true,
  repetitions: 1
};


/* Combine learning trials */
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
    var lr_counter = jsPsych.data.get().filter({TaskType: 'lr'}).select('rt').values.length //CHECK!!!

    data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    var rt_mean = jsPsych.data.get().filter({ at_TrialType: 'frequent', key_press: 32}).select('rt').mean(); //if you change response key, don't forget to search for key code
    var rt_sd = jsPsych.data.get().filter({at_TrialType: 'frequent', key_press: 32}).select('rt').sd();

    data.at_counter = at_counter
    data.lr_counter = lr_counter
    console.log(at_counter)

    data.at_RunningMean = rt_mean
    data.sd = rt_sd
    data.slow = rt_mean + 0.8*rt_sd
    data.fast = Math.abs(rt_mean - 0.8*rt_sd)
    data.medhigh = rt_mean + 0.2*rt_sd
    data.medlow = Math.abs(rt_mean - 0.2*rt_sd)


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



    if (at_counter < 10 || last_infreq.includes('infrequent') || last_correct.includes(false) || last_rt.includes(true) || last_lr.includes('lr')){
        lr_node = 0 //80th trial
    }
    else {

      if(rt_three > rt_mean+ 0.8 * rt_sd){
            lr_node = 1; //lr_node = true;
            data.diff = 'slow'
            console.log('slow')
            } else if (rt_three < Math.abs(rt_mean- 0.8 * rt_sd)){
                lr_node = 2; //lr_node = false;
                data.diff = 'fast'
                console.log('fast')
            } else if (rt_three < rt_mean+ 0.2 * rt_sd && rt_three > Math.abs(rt_mean- 0.2 * rt_sd)){
                lr_node = 3; //medium triggering should use three nodes...
                console.log('lr_node = true')
            }
            else {lr_node = 0}
      }
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
}


/*var if_node_1= { //fast node --> TS1
  timeline: [iti_200,lr_test_TS1,lr_feedback,iti_200],
  conditional_function: function(data){
    if (lr_node === false){
      return true;
    } else if (lr_node === true){
      return false;
    } else {return false;}
  }
};

var if_node_2= { //slow node --> TS2
  timeline: [iti_200,lr_test_TS2,lr_feedback,iti_200],
  conditional_function: function(data){
    if (lr_node === true){
      return true;
    }else if (lr_node === false){
      return false;
    } else{return false;}
  }
};

var if_node_3= { //medium node --> TS3
  timeline: [iti_200,lr_test_TS3,lr_feedback,iti_200],
  conditional_function: function(data){
    if (lr_node === true){
      return true;
    }else if (lr_node === false){
      return false;
    } else{return false;}
  }
};

*/

var if_node_1= { //fast node --> TS1
  timeline: [iti_200,lr_test_TS1,iti_200],
  conditional_function: function(data){
    if (lr_node == 1){
      return true;
    } else {return false}
  }
};

var if_node_2= { //slow node --> TS2
  timeline: [iti_200,lr_test_TS2,iti_200],
  conditional_function: function(data){
    if (lr_node == 2){
      return true;
    } else{return false}
  }
};

var if_node_3= { //medium node --> TS3
  timeline: [iti_200,lr_test_TS3,iti_200],
  conditional_function: function(data){
    if (lr_node == 3){
      return true;
    } else{return false}
  }
};

var at_test_procedure = {
  timeline: [attention,if_node_1,if_node_2,if_node_3,iti_200],
  timeline_variables: at_stimuli,
  randomize_order: false,
  repetitions: 1
}
timeline.push(at_test_procedure);



/* --------------- Post Tests --------------- */
/* -----Part 1: 2AFC----- */




/* -----Part 2: Recreate----- */
//drag and drop


/* -----Post Questionnaires----- */
var Q0_options = ['1 and 2', '3 and 4','All of the above'];
var multi_choice_Q0 = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: '<p> You have finished the Study! <br> Please answer a few questions about the rules of the game. </p>',
    questions: [
        { prompt: '<p> The possible correct response keys are <br> 1. Up <br> 2. Down <br> 3. Left <br> 4. Right </p>', name: 'Q0', options: Q0_options, required: true, horizontal: false },
    ],
};
timeline.push(multi_choice_Q0);

/* -----A Few Q on Rules----- */
var FR_Q1 = {
    type: 'survey-text',
    questions: [
    {prompt: '<p> When you were playing the game, what determined the correct response to a gem? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p>', name: FR_Q1, rows: 5, columns: 80, required: true},
  ],
};
timeline.push(FR_Q1);


var confidence = {
    type: 'html-slider-response',
    stimulus: '<p>On a scale of 1-5, how confident are you in your answer to the last question? <br> Adjust the slider bar to indicate your answer.</p>',
    labels: ['Not confident 0', '1','2','3','4','Confident 5'],
    min: 0,
    max: 5,
    slider_start: 3,
};
timeline.push(confidence);

var yn_options = ["Definitely No","Maybe No","Maybe Yes","Definitely Yes" ];
var multi_choice_Q2 = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: 'Please answer a few questions regarding the rules of the game.',
    questions: [
        { prompt: "<p> Did the same thing determine the correct response to each gem on the mountain and the road? <br> </p>", name: 'Q2', options: yn_options, required: true, horizontal: false },
    ],
};
timeline.push(multi_choice_Q2);


var FR_Q2 = {
    type: 'survey-text',
    preamble: '<p> Please answer a few questions regarding the rules of the game. </p>',
    questions: [
        { prompt: '<p> What determined the correct response to a gem when you were on the mountain? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess. </p> ',name: FR_Q2, rows: 5, columns: 80, required: true}
    ],
};
timeline.push(FR_Q2);

timeline.push(confidence);

var FR_Q3 = {
    type: 'survey-text',
    preamble: '<p> Please answer a few questions regarding the rules of the game. </p>',
    questions: [
        { prompt:  '<p> What determined the correct response to a gem when you were on the road? <br> Please describe in as much detail as you can. <br> If you are not sure, please share your best guess.</p> ',name: FR_Q3, rows: 5, columns: 80, required: true}
    ],
};
timeline.push(FR_Q3);

timeline.push(confidence);


var Q3P1_options = ["The color of the gems", "The shape of the gems"];
var multi_choice_Q3 = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: 'Now, we will ask you to pick between different options to see how you learned the rules of the game.',
    questions: [
        { prompt: "<p> What determined the correct response to a gem when you were on the mountain? <br> If you do not know for sure, please make your best guess.</p>", name: 'Q3P1', options: Q3P1_options, required: true },
    ],
};
timeline.push(multi_choice_Q3);
timeline.push(confidence);

var multi_choice_Q4 = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: 'Now, we will ask you to pick between different options to see how you learned the rules of the game.',
    questions: [
        { prompt: "<p>What determined the correct response to a gem when you were on the road? <br> If you do not know for sure, please make your best guess.</p>", name: 'Q4P1', options: Q3P1_options, required: true },
    ],
};
timeline.push(multi_choice_Q4);
timeline.push(confidence);


var multi_choice_Q6 = {
    type: 'survey-multi-choice',
    button_label: 'Next',
    preamble: '',
    questions: [
        { prompt: "<p>What were the rules of the game when you were on the mountain? <br> If you do not know for sure, please make your best guess.</p>", name: 'Q6P1', options: Q6P1_options, required: true },
    ],
};
timeline.push(multi_choice_Q6);
timeline.push(confidence);

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

/*jsPsych.init({
    timeline: timeline,
    preload_images: preload_list,
    on_finish: function(){
      var csv = jsPsych.data.get().csv();
      var filename = 'gem_test_00.csv';
      downloadCSV(csv, filename);
      jsPsych.data.displayData()}
});*/
