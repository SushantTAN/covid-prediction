export const calculate = async (data) => {
  var Pof_Fever = { infectionYes: { yes: 0, no:0 }, infectionNo: { yes: 0, no:0 } };

  var Pof_Bodypain = { infectionYes: { yes: 0, no:0 }, infectionNo: { yes: 0, no:0 } };

  var Pof_Runnynose = { infectionYes: { yes: 0, no:0 }, infectionNo: { yes: 0, no:0 } };

  var Pof_Difficultybreathing = { infectionYes: {difficult: 0, mild: 0, none:0}, infectionNo: {difficult: 0, mild: 0, none:0} };

  //Calculations...

  return {
    Pof_Fever,
    Pof_Bodypain,
    Pof_Runnynose,
    Pof_Difficultybreathing,
  }

}