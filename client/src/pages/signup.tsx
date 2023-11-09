import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tooth Talks Dental Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();


export default function SignUp() {
  const navigate = useNavigate();

  // Define state variables for email and password errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
  
    // Perform client-side validation
    if (!userData.email) {
      // Display an error message for the email field
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  
    if (!userData.password) {
      // Display an error message for the password field
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  
    // Check if there are validation errors before sending the request
    if (!emailError && !passwordError) {
      // Check if all input values are empty
      if (!userData.firstName && !userData.lastName && !userData.email && !userData.password) {
        console.error('All input values are empty. Please fill in the required fields.');
        return; // Prevent the registration request
      }
  
      try {
        // Send the registration request
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status === 201) {
          // User was successfully registered
          console.log('User registered successfully');
          // Redirect to the login page
          navigate('/login');
        } else if (response.status === 400) {
          // Bad request (e.g., invalid input)
          console.error('Bad request. Please check your input.');
        } else if (response.status === 409) {
          // Conflict (e.g., user with the same email already exists)
          console.error('User with the same email already exists.');
          // You can display an error message to the user, e.g., using state
        } else {
          // Handle other error cases
          console.error('Error registering user');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#FFFF',
            padding: '30px',
            borderRadius: '10px',
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img src={require('../assets/client-logo.png')} alt="Logo" style={{ width: '100px', height: '100px', margin: "auto auto 20px auto" }} />
          <Typography component="div" variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, color: '#0C6078' }}>Sign Up</span>
            <LoginIcon sx={{ color: "#B1B1B1" }} />
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {emailError && <div className="error-message">Email is required.</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#0C6078', textTransform: 'none', '&:hover': { backgroundColor: '#0C6078'} }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login"  variant="body2" sx={{ fontSize: '12px'}}>
                  Already have an account? <span style={{ fontWeight: '600' }}>Sign in</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4, color: "#535353", fontSize: "12px" }} />
      </Container>
    </ThemeProvider>
  );
}