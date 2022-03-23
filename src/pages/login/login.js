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

const Login = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const handleChangeUsername = (e) => {
    console.log(e.target.value)
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
    console.log("submit..", username, password)
    const response = await fetch(apiBaseURL + 'accounts/api/login/',
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
      console.log(response)
    //   const responseJson = await response.json();
    // console.log(responseJson);
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