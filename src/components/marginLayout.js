import FormControl from '@mui/material/FormControl';
import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const MarginLayout = (props) => {
  return (
    <div
      style={{
        margin: 20,
      }}>
      <FormControl fullWidth error={props.error}>
        {props.children}
        { props.error && <FormHelperText>Required</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default MarginLayout;