import React, { useState } from "react";

import '../../App.css';

import * as XLSX from "xlsx";
import { calculate } from "../../functions/functions";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MarginLayout from "../../components/marginLayout";
import Button from '@mui/material/Button';
import { FlashAuto } from "@mui/icons-material";


function Form() {

  const [items, setItems] = useState([]);

  const [probabilities, setProbabilities] = useState([]);

  //Input values
  const [fever, setFever] = useState('');
  const [bodyPain, setBodyPain] = useState('');
  const [runnyNose, setRunnyNose] = useState('');
  const [diffBreath, setDiffBreath] = useState('');

  //Errors
  const [feverError, setFeverError] = useState(false);
  const [bodyPainError, setBodyPainError] = useState(false);
  const [runnyNoseError, setRunnyNoseError] = useState(false);
  const [diffBreathError, setDiffBreathError] = useState(false);

  //Output class
  const [infectionClass, setInfectionClass] = useState('');

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
    console.log("button click", fever);

    //Validation
    setFeverError(false);
    setBodyPainError(false);
    setRunnyNoseError(false);
    setDiffBreathError(false);

    if(fever === '') { setFeverError(true); }
    if(bodyPain === '') { setBodyPainError(true); }
    if(runnyNose === '') { setRunnyNoseError(true); }
    if(fever === '') { setFeverError(true); }

    if(feverError || bodyPainError || runnyNoseError || diffBreathError ) { return 0; }

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

    if (yes > no) { setInfectionClass('yes'); } else { setInfectionClass('no'); }
  }

  const handleChangeFerver = (e) => {
    console.log(Number(e.target.value));
    // if( typeof(Number(e.target.value)) === 'number'){
    //   setFeverError(false);
    // }

    // if(Number(e.target.value) == 'NaN'){
    //   console.log("happy")
    // }

    if (e.target.value > 99.5)
      setFever('high');
    else
      setFever('low')
  }

  const handleChangeBodyPain = (e) => {
    // console.log(e);
    setBodyPainError(false);
    setBodyPain(e.target.value);
  }

  const handleChangeRunnyNose = (e) => {
    // console.log(e);
    setRunnyNoseError(false);
    setRunnyNose(e.target.value);
  }

  const handleChangeDiffBreath = (e) => {
    // console.log(e);
    setDiffBreathError(false);
    setDiffBreath(e.target.value);
  }

  return (
    <div className="flex_container">
      <div className="container">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />

        <MarginLayout error={feverError}>
          <TextField
            error={feverError}
            // helperText="Required"
            id="fever"
            label="Fever (Farenheight)"
            placeholder="eg: 98.6"
            inputProps={{ inputMode: 'numeric' }}
            variant="outlined"
            onChange={handleChangeFerver}
          />
        </MarginLayout>

        <MarginLayout error={bodyPainError}>

          <InputLabel id="Body-Pain">Body Pain</InputLabel>
          <Select
            labelId="Body-Pain"
            id="bodyPain"
            value={bodyPain}
            label="Body Pain"
            onChange={handleChangeBodyPain}
          >
            <MenuItem value={'yes'}>Yes</MenuItem>
            <MenuItem value={'no'}>No</MenuItem>
          </Select>
          
        </MarginLayout>

        <MarginLayout error={runnyNoseError}>
          <InputLabel id="Runny-Nose">Runny Nose</InputLabel>
          <Select
            labelId="Runny-Nose"
            id="runnyNose"
            value={runnyNose}
            label="Runny Nose"
            onChange={handleChangeRunnyNose}
          >
            <MenuItem value={'yes'}>Yes</MenuItem>
            <MenuItem value={'no'}>No</MenuItem>
          </Select>
        </MarginLayout>

        <MarginLayout error={diffBreathError}>
          <InputLabel id="Difficulty-Breathing">Difficulty Breathing</InputLabel>
          <Select
            labelId="Difficulty-Breathing"
            id="diffBreath"
            value={diffBreath}
            label="Difficulty Breathing"
            onChange={handleChangeDiffBreath}
          >
            <MenuItem value={'none'}>None</MenuItem>
            <MenuItem value={'mild'}>Mild</MenuItem>
            <MenuItem value={'difficult'}>Difficult</MenuItem>
          </Select>
        </MarginLayout>

        <Button variant="contained" size="large" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Form;
