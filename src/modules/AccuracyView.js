import React, { useEffect, useState } from 'react';
import { data } from '../datasets/DataObject';
import { calculate } from '../functions/functions';

const AccuracyView = () => {
  const [accuracy, setAccuracy] = useState(0);
  const [fmeasure, setFmeasure] = useState(0);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    calculations(data.slice(1, Math.ceil(data.length * 2 / 3)), data.slice(Math.ceil(data.length * 2 / 3), data.length));

    // calculations(data.slice(Math.ceil(data.length * 1 / 3), data.length), data.slice(1, Math.ceil(data.length * 1 / 3)));

    // calculations([...data.slice(1, Math.ceil(data.length * 1 / 3)), ...data.slice(Math.ceil(data.length * 2 / 3), data.length)], data.slice(Math.ceil(data.length * 1 / 3), Math.ceil(data.length * 2 / 3)));
  }, []);

  const calculations = async (trainningData, testData) => {
    // var testData = data.slice(Math.ceil(data.length * 2 / 3), data.length);
    // var trainningData = data.slice(1, Math.ceil(data.length * 2 / 3));
    // console.log("test t=data",testData.length);

    var probabilities = {};

    // var test = [];

    probabilities = await calculate(trainningData);

    var yfever;
    var nfever;
    var ybodyPain;
    var nbodyPain;
    var yrunnyNose;
    var nrunnyNose;
    var ydiffBreath;
    var ndiffBreath;

    var totalCorrect = 0; //True Positive + True Negative

    var truepositive = 0;
    var falsepositive = 0;
    var falsenegative = 0;

    testData.forEach(el => {
      switch (el.feverClass) {
        case 'high':
          yfever = probabilities.Pof_Fever.infectionYes.high;
          nfever = probabilities.Pof_Fever.infectionNo.high;
          break;
        case 'low':
          yfever = probabilities.Pof_Fever.infectionYes.low;
          nfever = probabilities.Pof_Fever.infectionNo.low;
          break;
        default:
          break;
      }

      switch (el.bodyPain) {
        case 1:

          ybodyPain = probabilities.Pof_Bodypain.infectionYes.yes;
          nbodyPain = probabilities.Pof_Bodypain.infectionNo.yes;
          break;
        case 0:
          // console.log('bodypain' )
          ybodyPain = probabilities.Pof_Bodypain.infectionYes.no;
          nbodyPain = probabilities.Pof_Bodypain.infectionNo.no;
          break;
        default:
          break;
      }

      switch (el.runnyNose) {
        case 1:
          yrunnyNose = probabilities.Pof_Runnynose.infectionYes.yes;
          nrunnyNose = probabilities.Pof_Runnynose.infectionNo.yes;
          break;
        case 0:
          yrunnyNose = probabilities.Pof_Runnynose.infectionYes.no;
          nrunnyNose = probabilities.Pof_Runnynose.infectionNo.no;
          break;
        default:
          break;
      }

      switch (el.diffBreath) {
        case 0:
          ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.difficult;
          ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.difficult;
          break;
        case 1:
          ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.mild;
          ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.mild;
          break;
        case -1:
          ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.none;
          ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.none;
          break;
        default:
          break;
      }

      // console.log("yessss", yfever, ybodyPain, yrunnyNose,ydiffBreath)

      var yes = probabilities.Pof_yes
        * yfever
        * ybodyPain
        * yrunnyNose
        * ydiffBreath;

      var no = probabilities.Pof_no
        * nfever
        * nbodyPain
        * nrunnyNose
        * ndiffBreath;

      // console.log("final", yes, no);

      var predictedInfection;
      if (yes > no) { predictedInfection = 1; } else { predictedInfection = 0; }

      if (predictedInfection === el.infectionProb) { totalCorrect += 1 }

      if (predictedInfection === 1 && el.infectionProb === 1) { truepositive += 1; }
      if (predictedInfection === 1 && el.infectionProb === 0) { falsepositive += 1; }
      if (predictedInfection === 0 && el.infectionProb === 1) { falsenegative += 1; }

      // test.push({
      //   "fever": el.fever,
      //   "feverClass": el.feverClass,
      //   "bodyPain": el.bodyPain,
      //   "age": el.age,
      //   "runnyNose": el.runnyNose,
      //   "diffBreath": el.diffBreath,
      //   "infectionProb": predictedInfection
      // })
    })

    // console.log("total correct", totalCorrect)

    var accuracy = totalCorrect / (testData.length);

    console.log("accuracy", accuracy);
    setAccuracy(accuracy * 100);

    var fmeasure = truepositive / (truepositive + 0.5 * (falsepositive + falsenegative))

    console.log("femeasure", fmeasure)
    setFmeasure(fmeasure * 100);

    // console.log("test...", test);
  }

  if (!open)
    return <div onClick={() => { setOpen(true) }} className="openAccuracy">
      View Accuracy of the model
    </div>


  return (
    <div className="openAccuracy" onClick={() => { setOpen(false) }}>
      <div><h4>Accuracy:</h4>  {Math.round((accuracy + Number.EPSILON) * 100) / 100}%</div>
      <div><h4>F-measure:</h4>  {Math.round((fmeasure + Number.EPSILON) * 100) / 100}%</div>
    </div>
  );
}

export default AccuracyView;