import React, { useState } from 'react';
import '../../App.css';
import MarginLayout from "../../components/marginLayout";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Register = () => {
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChangeUsername = (e) => {
    // setUsername(e.target.value);
    setUsernameError(false);
  }

  const handleChangeEmail = (e) => {
    // setEmail(e.target.value);
    setEmailError(false);
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

  const handleSubmit = () => {

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

        <MarginLayout error={emailError}>
          <TextField
            error={emailError}
            // helperText="Required"
            id="email"
            label="Email"
            placeholder="Your email here"
            // inputProps={{ inputMode: 'numeric' }}
            variant="outlined"
            onChange={handleChangeEmail}
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
          Register User
        </Button>
      </div>
    </div>
  );
}

export default Register;