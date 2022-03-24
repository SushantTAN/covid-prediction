import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';

const Profile = () => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ff667d",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [rows, setRows] = useState([]);

  useEffect(()=> {
    setRows([
      {
        fever: 'Frozen yoghurt',
        body_pain: 159,
        runny_nose: 6.0,
        difficulty_breathing: 24,
        infection_prediction: 4.0
      },
      {
        fever: 'Frozen yoghurt',
        body_pain: 159,
        runny_nose: 6.0,
        difficulty_breathing: 24,
        infection_prediction: 4.0
      },
      {
        fever: 'Frozen yoghurt',
        body_pain: 159,
        runny_nose: 6.0,
        difficulty_breathing: 24,
        infection_prediction: 4.0
      },
    ])
  }, [])

  return (
    <div className="flex_container">
      <div className='column'>
      <div className=''>
      <Typography variant="h4" gutterBottom component="div">
        Sushant
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        23, Male
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
      <EmailIcon /> punk1susant@gmail.com
      </Typography>
        {/* <p>User: Sushant</p>
        <p>Age: 23</p>
        <p>Email: punk1susant@gmail.com</p>
        <p>Gender: Male</p> */}
      </div>

      <TableContainer component={Paper} sx={{ margin: '24px 0px' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell>Fever</StyledTableCell>
              <StyledTableCell align="right">Body Pain</StyledTableCell>
              <StyledTableCell align="right">Runny Nose</StyledTableCell>
              <StyledTableCell align="right">Difficulty Breathing</StyledTableCell>
              <StyledTableCell align="right">Infection Prediction</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.fever}
                </StyledTableCell>
                <StyledTableCell align="right">{row.body_pain}</StyledTableCell>
                <StyledTableCell align="right">{row.runny_nose}</StyledTableCell>
                <StyledTableCell align="right">{row.difficulty_breathing}</StyledTableCell>
                <StyledTableCell align="right">{row.infection_prediction}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}

export default Profile;