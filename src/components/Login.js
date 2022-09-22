//functional imports
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedUserContext } from './LoggedUserContext';

//material imports
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

function Login() {
  const defaultValues = {
    username: '',
    password: '',
    role: ''
  }

  const { currentUser, setCurrentUser } = useContext(LoggedUserContext);
  const [formValues, setFormValues] = useState(defaultValues);
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    let name = e.target.name === 'role' ? 'role' : e.target.name
    let value = e.target.name === 'role' ? e.target.checked === true ? e.target.value : null : e.target.value
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/login`)
      .then((r) => r.json())
      .then((loginCredentials) => {
        let validCred = loginCredentials.find((loginCred) => (loginCred.username === formValues.username && (loginCred.password === formValues.password && (loginCred.role === formValues.role))))
        switch (true) {
          case validCred && validCred.role === 'professor': professorLogin(validCred)
          case validCred && validCred.role === 'student': studentLogin(validCred)
          default: return null
        }
      })
    setFormValues(defaultValues)
  };

  const professorLogin = (user) => {
    setCurrentUser(user)
    navigate("/faculty")
  }

  const studentLogin = (user) => {
    setCurrentUser(user)
    navigate("/student")
  }

  return (
    <>
      <form onSubmit={handleLoginSubmit}>
        <Grid container style={{ marginTop: '15px' }} alignItems="center" justify="center" direction="column"><strong>Login Form</strong>
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
          <Grid item style={{ marginTop: '15px' }}>
            <FormControl>
              <FormLabel style={{ marginLeft: '80px' }}>Role</FormLabel>
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
          <Grid style={{ marginTop: '15px' }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid >
        </Grid>
      </form>
      <Container style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link
          underline="hover"
          to="/signup"
        >Not a member yet? Sign Up Here
        </Link>
      </Container>
    </>
  );
}

export default Login;