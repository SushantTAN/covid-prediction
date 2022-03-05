export const calculate = async (data) => {
  var Pof_Fever = { infectionYes: { high: 0, low: 0 }, infectionNo: { high: 0, low: 0 } };

  var Pof_Bodypain = { infectionYes: { yes: 0, no: 0 }, infectionNo: { yes: 0, no: 0 } };

  var Pof_Runnynose = { infectionYes: { yes: 0, no: 0 }, infectionNo: { yes: 0, no: 0 } };

  var Pof_Difficultybreathing = { infectionYes: { difficult: 0, mild: 0, none: 0 }, infectionNo: { difficult: 0, mild: 0, none: 0 } };

  var Pof_yes = 0;
  var Pof_no = 0;

  //Calculations...

  //USing the first two thirds of the dataset as trainning data
  var trainningData = data.slice(1, Math.ceil(data.length * 2 / 3));
  // console.log("test0, ", trainningData[0]);

  var total_length = trainningData.length;

  trainningData.forEach(el => {

    if (el.infectionProb === 0) { Pof_no += 1 }
    else { Pof_yes += 1 }

    //Calculate probablities of fever
    if (el.feverClass === 'high') {
      if (el.infectionProb === 1) { Pof_Fever.infectionYes.high = Pof_Fever.infectionYes.high + 1 }
      if (el.infectionProb === 0) { Pof_Fever.infectionNo.high = Pof_Fever.infectionNo.high + 1 }
    }
    if (el.feverClass === 'low') {
      if (el.infectionProb === 1) { Pof_Fever.infectionYes.low = Pof_Fever.infectionYes.low + 1 }
      if (el.infectionProb === 0) { Pof_Fever.infectionNo.low = Pof_Fever.infectionNo.low + 1 }
    }


    //Calculate probalilities of body pain ......
    if (el.bodyPain === 1) {
      if (el.infectionProb === 1) { Pof_Bodypain.infectionYes.yes = Pof_Bodypain.infectionYes.yes + 1 }
      if (el.infectionProb === 0) { Pof_Bodypain.infectionNo.yes = Pof_Bodypain.infectionNo.yes + 1 }
    }
    if (el.bodyPain === 0) {
      if (el.infectionProb === 1) { Pof_Bodypain.infectionYes.no = Pof_Bodypain.infectionYes.no + 1 }
      if (el.infectionProb === 0) { Pof_Bodypain.infectionNo.no = Pof_Bodypain.infectionNo.no + 1 }
    }


    //Calculate probabilities of runny nose ......
    if (el.runnyNose === 1) {
      if (el.infectionProb === 1) { Pof_Runnynose.infectionYes.yes = Pof_Runnynose.infectionYes.yes + 1 }
      if (el.infectionProb === 0) { Pof_Runnynose.infectionNo.yes = Pof_Runnynose.infectionNo.yes + 1 }
    }
    if (el.runnyNose === 0) {
      if (el.infectionProb === 1) { Pof_Runnynose.infectionYes.no = Pof_Runnynose.infectionYes.no + 1 }
      if (el.infectionProb === 0) { Pof_Runnynose.infectionNo.no = Pof_Runnynose.infectionNo.no + 1 }
    }


    //Calculate probabilities of difficulty breathing ......
    if (el.diffBreath === 0) {
      if (el.infectionProb === 1) { Pof_Difficultybreathing.infectionYes.difficult = Pof_Difficultybreathing.infectionYes.difficult + 1 }
      if (el.infectionProb === 0) { Pof_Difficultybreathing.infectionNo.difficult = Pof_Difficultybreathing.infectionNo.difficult + 1 }
    }
    if (el.diffBreath === 1) {
      if (el.infectionProb === 1) { Pof_Difficultybreathing.infectionYes.mild = Pof_Difficultybreathing.infectionYes.mild + 1 }
      if (el.infectionProb === 0) { Pof_Difficultybreathing.infectionNo.mild = Pof_Difficultybreathing.infectionNo.mild + 1 }
    }
    if (el.diffBreath === -1) {
      if (el.infectionProb === 1) { Pof_Difficultybreathing.infectionYes.none = Pof_Difficultybreathing.infectionYes.none + 1 }
      if (el.infectionProb === 0) { Pof_Difficultybreathing.infectionNo.none = Pof_Difficultybreathing.infectionNo.none + 1 }
    }
    
  });

  //Fever probabilities
  Pof_Fever.infectionYes.high = Pof_Fever.infectionYes.high / Pof_yes;
  Pof_Fever.infectionYes.low = Pof_Fever.infectionYes.low / Pof_yes;
  Pof_Fever.infectionNo.high = Pof_Fever.infectionNo.high / Pof_no;
  Pof_Fever.infectionNo.low = Pof_Fever.infectionNo.low / Pof_no;

  //Body pain probabilities....
  Pof_Bodypain.infectionYes.yes = Pof_Bodypain.infectionYes.yes / Pof_yes;
  Pof_Bodypain.infectionYes.no = Pof_Bodypain.infectionYes.no / Pof_yes;
  Pof_Bodypain.infectionNo.yes = Pof_Bodypain.infectionNo.yes / Pof_no;
  Pof_Bodypain.infectionNo.no = Pof_Bodypain.infectionNo.no / Pof_no;

  //Runny nose probabilities...
  Pof_Runnynose.infectionYes.yes = Pof_Runnynose.infectionYes.yes / Pof_yes;
  Pof_Runnynose.infectionYes.no = Pof_Runnynose.infectionYes.no / Pof_yes;
  Pof_Runnynose.infectionNo.yes = Pof_Runnynose.infectionNo.yes / Pof_no;
  Pof_Runnynose.infectionNo.no = Pof_Runnynose.infectionNo.no / Pof_no;

  //Difficulty breathing probabilities...
  Pof_Difficultybreathing.infectionYes.difficult = Pof_Difficultybreathing.infectionYes.difficult / Pof_yes;
  Pof_Difficultybreathing.infectionYes.mild = Pof_Difficultybreathing.infectionYes.mild / Pof_yes;
  Pof_Difficultybreathing.infectionYes.none = Pof_Difficultybreathing.infectionYes.none / Pof_yes;

  Pof_Difficultybreathing.infectionNo.difficult = Pof_Difficultybreathing.infectionNo.difficult / Pof_no;
  Pof_Difficultybreathing.infectionNo.mild = Pof_Difficultybreathing.infectionNo.mild / Pof_no;
  Pof_Difficultybreathing.infectionNo.none = Pof_Difficultybreathing.infectionNo.none / Pof_no;
  

  //Overall infection probabilities
  Pof_yes = Pof_yes / total_length;
  Pof_no = Pof_no / total_length;



  // console.log("test 1", Pof_Fever);

  return {
    Pof_Fever,
    Pof_Bodypain,
    Pof_Runnynose,
    Pof_Difficultybreathing,
    Pof_yes,
    Pof_no,
  }

}