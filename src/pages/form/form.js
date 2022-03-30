import React, { useEffect, useState } from "react";

import '../../App.css';

// import * as XLSX from "xlsx";
import { calculate } from "../../functions/functions";
import { data } from "../../datasets/DataObject";

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MarginLayout from "../../components/marginLayout";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdviceText from "../../components/AdviceText";
import AccuracyView from "../../modules/AccuracyView";
import { apiBaseURL } from "../../repository/repository";

import Typography from '@mui/material/Typography';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Form() {

  // const [items, setItems] = useState([]);

  const [probabilities, setProbabilities] = useState([]);

  //Input values
  const [fever, setFever] = useState('');
  const [feverInt, setFeverInt] = useState('');
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

  //Dialog Status
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    calculations();
  }, []);

  const calculations = async () => {
    const p = await calculate(data);
    setProbabilities(p);
  }

  // const readExcel = (file) => {
  //   // console.log("ggg", file)
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);

  //     fileReader.onload = async (e) => {
  //       const bufferArray = e.target.result;

  //       const wb = XLSX.read(bufferArray, { type: "buffer" });

  //       const wsname = wb.SheetNames[0];

  //       const ws = wb.Sheets[wsname];

  //       const data = XLSX.utils.sheet_to_json(ws);
  //       // console.log(data);

  //       //Probability calculations
  //       const p = await calculate(data);
  //       // console.log("llll", p)
  //       setProbabilities(p);

  //       resolve(data);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });

  //   promise.then((d) => {
  //     // setItems(d);
  //   });
  // };

  const handleSubmit = async () => {
    // console.log("button click", fever);

    //Validation
    setFeverError(false);
    setBodyPainError(false);
    setRunnyNoseError(false);
    setDiffBreathError(false);

    if (fever === '' || Number(feverInt) > 108.14 || Number(feverInt) < 75 ) { setFeverError(true); }
    if (bodyPain === '') { setBodyPainError(true); }
    if (runnyNose === '') { setRunnyNoseError(true); }
    if (diffBreath === '') { setDiffBreathError(true); }

    // console.log("fev error", feverError)

    if (feverError || bodyPainError || runnyNoseError || diffBreathError || diffBreath === ''|| Number(feverInt) > 108.14 || Number(feverInt) < 75) { return 0; }

    var yfever;
    var nfever;
    var ybodyPain;
    var nbodyPain;
    var yrunnyNose;
    var nrunnyNose;
    var ydiffBreath;
    var ndiffBreath;

    if (feverError || bodyPainError || runnyNoseError || diffBreathError) { return 0; }

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
      case 'Yes':
        ybodyPain = probabilities.Pof_Bodypain.infectionYes.yes;
        nbodyPain = probabilities.Pof_Bodypain.infectionNo.yes;
        break;
      case 'No':
        ybodyPain = probabilities.Pof_Bodypain.infectionYes.no;
        nbodyPain = probabilities.Pof_Bodypain.infectionNo.no;
        break;
      default:
        break;
    }

    switch (runnyNose) {
      case 'Yes':
        yrunnyNose = probabilities.Pof_Runnynose.infectionYes.yes;
        nrunnyNose = probabilities.Pof_Runnynose.infectionNo.yes;
        break;
      case 'No':
        yrunnyNose = probabilities.Pof_Runnynose.infectionYes.no;
        nrunnyNose = probabilities.Pof_Runnynose.infectionNo.no;
        break;
      default:
        break;
    }

    switch (diffBreath) {
      case 'Difficult':
        ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.difficult;
        ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.difficult;
        break;
      case 'Mild':
        ydiffBreath = probabilities.Pof_Difficultybreathing.infectionYes.mild;
        ndiffBreath = probabilities.Pof_Difficultybreathing.infectionNo.mild;
        break;
      case 'None':
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

    // console.log("final", yes, no);

    if (yes > no) { setInfectionClass('Yes'); } else { setInfectionClass('No'); }

    if (fever === '' || bodyPain === '' || runnyNose === '' || fever === '') { } else { setDialogOpen(true); }


  }

  const handleChangeFerver = (e) => {
    // console.log(e.target.value);
    // if( typeof(Number(e.target.value)) === 'number'){
    //   setFeverError(false);
    // }

    // if(Number(e.target.value) == 'NaN'){
    //   console.log("happy")
    // }

    if (!isNaN(e.target.value)) {
      setFeverError(false);
    }

    if (e.target.value > 99.5)
      setFever('high');
    else if (e.target.value <= 99.5) {
      setFever('low');
      // console.log("ytest fev") 
    }
    else
      setFever('');

      setFeverInt(e.target.value);
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

  const handleAgree = async () => {

    // console.log("aaaaa", localStorage.getItem('token'));
    try{const response = await fetch(apiBaseURL + 'predictor/api/create/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          // fever,
          // bodyPain,
          // runnyNose,
          // diffBreath,
          // infectionClass,
          // user: "user",

          "fever": feverInt,
          "body_pain": bodyPain,
          "runny_nose": runnyNose,
          "infected": infectionClass,
          "difficulty_breathing": diffBreath,
        })
      });
    console.log(response)
    if (response.status === 404) {
      const responseJson = await response.json();
      alert(`Error! ${responseJson.detail}`);
    }
  }catch(error){
    console.log("error", error);
  }

    setDialogOpen(false);
  }

  if([null, undefined].includes(localStorage.getItem('token')))
  return (
    <div className="flex_container">
      <div className="column center">
        <img src="https://www.mykhaana.in/assets/img/login.png" alt="lock" className="lockImage" />
        <Typography variant="h4" gutterBottom component="div" sx={{ margin: '20px 0px' }}>
          Login to continue
        </Typography>

        <a href='/login'>
        <Typography variant="h5" sx={{ color: "blue", }} className="link" gutterBottom component="div">
          Go to Login <ArrowRightAltIcon />
        </Typography>
        </a>
      </div>
    </div>
  );

  return (
    <div className="flex_container">
      <div className="container">
        {/* <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        /> */}

        <MarginLayout error={feverError}>
          <TextField
            error={feverError}
            // helperText="Required"
            id="fever"
            label="Fever (Fahrenheit)"
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
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
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
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
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
            <MenuItem value={'None'}>None</MenuItem>
            <MenuItem value={'Mild'}>Mild</MenuItem>
            <MenuItem value={'Difficult'}>Difficult</MenuItem>
          </Select>
        </MarginLayout>

        <Button variant="contained" sx={{ backgroundColor: '#A50003' }} size="large" onClick={handleSubmit}>
          Submit
        </Button>

        <Dialog

          open={dialogOpen}
          onClose={() => { }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: infectionClass === 'Yes' ? '#FF4E86' : '#00B305', color: 'white' }}>
            {infectionClass === 'Yes' ? 'You may have covid' : 'You have a low risk of infection'}
          </DialogTitle>
          {infectionClass === 'Yes' ? <DialogContent sx={{ backgroundColor: infectionClass === 'Yes' ? '#FF4E86' : '#00B305', color: 'white' }}>
            <AdviceText message="Consult a doctor" />
            <AdviceText message="Keep a distance of at least 1 metre from others" />
            <AdviceText message="Open windows when possible" />
            <AdviceText message="Wear a mask" />
            <AdviceText message="Clean hands" />
            <AdviceText message="Cover coughs and sneezes" />
            <AdviceText message="Take Care" />
          </DialogContent>
            : <DialogContent sx={{ backgroundColor: infectionClass === 'Yes' ? '#FF4E86' : '#00B305', color: 'white' }}>
              <AdviceText message="But still take precautions" />
              <AdviceText message="Wear a mask" />
              <AdviceText message="Clean hands" />
              <AdviceText message="Maintain social distancing" />
              <AdviceText message="Stay safe" />
            </DialogContent>
          }
          <DialogActions sx={{ backgroundColor: infectionClass === 'Yes' ? '#FF4E86' : '#00B305', color: 'white' }}>
            <Button onClick={() => { setDialogOpen(false) }} sx={{ color: 'white' }}>Disagree</Button>
            <Button onClick={handleAgree} sx={{ color: 'white' }} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AccuracyView />
    </div>
  );
}

export default Form;
