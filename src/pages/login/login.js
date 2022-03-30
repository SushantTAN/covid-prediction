import React, { useState } from 'react';
import MarginLayout from "../../components/marginLayout";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { apiBaseURL } from '../../repository/repository';
import {Navigate} from 'react-router-dom';

const Login = (props) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const [refresh, setRefresh] = useState(1);

  const handleChangeUsername = (e) => {
    // console.log(e.target.value)
    setUsername(e.target.value);
    setUsernameError(false);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    // console.log("submit..", username, password)

    setPasswordError(false);
    setUsernameError(false);

    if (username === '') { setUsernameError(true) }
    if (password === '') { setPasswordError(true) }

    if (usernameError || passwordError) { return 0; }

    try {
      const response = await fetch(apiBaseURL + 'api/token/',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        });
      // console.log(response)
      if (response.status === 200) {
        const responseJson = await response.json();
        // console.log(responseJson);

        localStorage.setItem('token', responseJson.access);
        localStorage.setItem('user_id', responseJson.user_id);

        setRefresh(refresh + 1);

        props.handleRefresh();

        // return <Navigate to="/form" replace/>
      }
      else if (response.status === 401) {
        const responseJson = await response.json();
        alert(`Error! ${responseJson.detail}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(localStorage.getItem("token")){
    return (
      <Navigate to="/form" replace />
    )
  }

  return (
    <div className="flex_container">
      <div className="container">
        <MarginLayout error={usernameError}>
          <TextField
            error={usernameError}
            // helperText="Required"
            id="username"
            label="Username"
            placeholder="Your name here"
            // inputProps={{ inputMode: 'numeric' }}
            variant="outlined"
            onChange={handleChangeUsername}
          />


        </MarginLayout>

        <MarginLayout error={passwordError}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            error={passwordError}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </MarginLayout>

        <Button variant="contained" sx={{ backgroundColor: '#A50003' }} size="large" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;