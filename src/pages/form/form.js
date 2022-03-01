import React, { useState } from "react";
import * as XLSX from "xlsx";
import { calculate } from "../../functions/functions";

function Form() {

  const [items, setItems] = useState([]);

  const [probabilities, setProbabilities] = useState([]);

  //input values
  const [fever, setFever] = useState('high');
  const [bodyPain, setBodyPain] = useState('yes');
  const [runnyNose, setRunnyNose] = useState('yes');
  const [diffBreath, setDiffBreath] = useState('difficult');

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data[0]);

        //Probability calculations
        const p = await calculate(data);
        // console.log("llll", p)
        setProbabilities(p);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const handleSubmit = async () => {
    console.log("button click", probabilities.Pof_Runnynose)
    var yfever;
    var nfever;
    var ybodyPain;
    var nbodyPain;
    var yrunnyNose;
    var nrunnyNose;
    var ydiffBreath;
    var ndiffBreath;

    switch (fever) {
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

    switch (bodyPain) {
      case 'yes':
        ybodyPain = probabilities.Pof_Bodypain.infectionYes.yes;
        nbodyPain = probabilities.Pof_Bodypain.infectionNo.yes;
        break;
      case 'no':
        ybodyPain = probabilities.Pof_Bodypain.infectionYes.no;
        nbodyPain = probabilities.Pof_Bodypain.infectionNo.no;
        break;
      default:
        break;
    }

    switch (runnyNose) {
      case 'yes':
        yrunnyNose = probabilities.Pof_Runnynose.infectionYes.yes;
        nrunnyNose = probabilities.Pof_Runnynose.infectionNo.yes;
        break;
      case 'no':
        yrunnyNose = probabilities.Pof_Runnynose.infectionYes.no;
        nrunnyNose = probabilities.Pof_Runnynose.infectionNo.no;
        break;
      default:
        break;
    }

    switch (diffBreath) {
      case 'difficult':
        ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.difficult;
        ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.difficult;
        break;
      case 'mild':
        ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.mild;
        ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.mild;
        break;
      case 'none':
        ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.none;
        ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.none;
        break;
      default:
        break;
    }

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

    console.log("final", yes, no);
  }

  return (
    <div>
      <div
        style={{
          margin: 10,
          // minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />

        <input type='submit' onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Form;
