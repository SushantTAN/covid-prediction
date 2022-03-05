import DialogContentText from '@mui/material/DialogContentText';

const AdviceText = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
      <i className="material-icons">more</i>
      <p style={{ width: 10 }}></p>
      <DialogContentText id="alert-dialog-description" sx={{ color: 'white' }}>
        {props.message}
      </DialogContentText>
    </div>
  );
}

export default AdviceText;