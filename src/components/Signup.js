//functional imports
import React, { useState } from 'react';

//material imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

 const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Signup () {
  const defaultValues = {
    username: '',
    password: '',
    passwordAuth: '',
    role: ''
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [freshestUserInfo, setFreshestUserInfo] = useState({
    username: '',
    role: ''
  });

  const handleInputChange = (e) => {
    console.log(e)
    let name = e.target.name === 'role' ? 'role' : e.target.name
    let value = e.target.name === 'role' ? e.target.checked === true ? e.target.value : null : e.target.value
    console.log('name', name)
    console.log('value', value)
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const post = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formValues)
    }
    if (formValues.password === formValues.passwordAuth && formValues.password !== '') {
      fetch(`http://localhost:3001/login`, post)
        .then((r) => r.json())
        .then((data) => console.log(data))
      return cleanUpForm(formValues.username, formValues.role)
    } else if (formValues.password !== formValues.passwordAuth) {
      return handleDialog()
    } else return null
  };

  const handleDialog = () => {
    setOpen(true)
  }

  const cleanUpForm = (username, role) => {  
    setSnackOpen(true)  
    setFreshestUserInfo({
      "username": username,
      "role": role
    })
    setFormValues(defaultValues)
  }

  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  return (
    <>
      <form onSubmit={handleSignupSubmit}>
        <Grid container  style={{marginTop: '40px'}} alignItems="center" justify="center" direction="column">
          <strong>Sign Up Form</strong>
          <Grid item>
            <TextField
              id="username-input"
              name="username"
              label="User Name"
              type="text"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-password-input"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-password-input-Auth"
              name="passwordAuth"
              label="Re-enter Password"
              type="password"
              autoComplete="current-password"
              value={formValues.passwordAuth}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item style={{marginTop: '15px'}}>
            <FormControl>
              <FormLabel style={{marginLeft: '80px'}}>Role</FormLabel>
              <RadioGroup
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  key="Professor"
                  value="professor"
                  control={<Radio size="small" />}
                  label="Professor"
                />
                <FormControlLabel
                  key="Student"
                  value="student"
                  control={<Radio size="small" />}
                  label="Student"
                />
              </RadioGroup>
            </FormControl>
          </Grid >
          <Grid style={{marginTop: '15px'}}>
            <Button variant="contained" color="primary" type="submit">
            Submit
            </Button>
          </Grid >
        </Grid>
      </form>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"The passwords you entered do not match!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Re-enter your passwords and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Acknowlegde</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        message={`Thank you for signing up, ${freshestUserInfo.username}. Enjoy ${freshestUserInfo.role === 'student' ? 'learning' : 'teaching'}!`}
      />
    </> 
  )
}

export default Signup;