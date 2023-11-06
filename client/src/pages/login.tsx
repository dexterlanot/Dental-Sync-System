import * as React from 'react';
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
import '../index.css'
import LoginIcon from '@mui/icons-material/Login';

const customTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/" >
        Tooth Talks Dental Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        // User was successfully logged in
        console.log('Login successful');
        // You can add a redirect to the dashboard or do other actions here
      } else if (response.status === 401) {
        // Invalid credentials
        console.error('Invalid credentials');
        // Display a message to the user
      } else {
        // Handle other login errors
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#FFFF',
            padding: '40px',
            borderRadius: '10px',
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img src={require('../assets/client-logo.png')} alt="Logo" style={{ width: '100px', height: '100px', margin: "auto auto 20px auto" }} />
          <Typography component="div" variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, color: '#0C6078' }}>Login</span>
            <LoginIcon sx={{ color: "#B1B1B1" }} />
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Grid container>
              <Grid item xs sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" size="small" />}
                  label={<Typography sx={{ color: "#535353", fontSize: '12px', marginRight: '8px' }}>Remember me</Typography>}
                />
                <Link href="#" variant="body2" sx={{ fontSize: '12px' }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#0C6078', textTransform: 'none', '&:hover': { backgroundColor: '#0C6078' } }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ fontSize: '12px' }}>
                  Don't have an account? <span style={{ fontWeight: '600' }}>Sign Up</span>
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
