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
import {deepOrange, red} from '@mui/material/colors'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../../service/auth-service';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

const defaultTheme = createTheme();

export default function ForgotPasswordPage() {

  const [response,setResponse]=React.useState("")
  const [backdrop,setBackDrop]=React.useState()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('enter a valid email').test(
      'is-gmail',
      'Email must be a valid Gmail address',
      (value) => value.endsWith('@gmail.com')
    ),
  });

  const formData = (data) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    console.log("Callback function when form is submitted!");
    console.log("Form Values ", data.email);
    setBackDrop(true)
    AuthService.forgetPassword(data.email).then(
      (response) => {
        let updatedValue = {};
 updatedValue = {color:"green",message:response.data};
        setResponse(updatedValue)
        console.log(updatedValue)
        setBackDrop(false)
        setTimeout(() => {
          setResponse("");
        }, 5000);
      }
    ).catch((err) => {
      // console.log("error: ", err.response.data.message);
      let updatedValue = {};
 updatedValue = {color:"red",message:err.response.data.message};
        setResponse(updatedValue)
        setBackDrop(false)
        console.log(updatedValue)
        setTimeout(() => {
          setResponse("");
        }, 5000);
    })
  };

  const {handleSubmit,register,formState: { errors },} = useForm({ resolver: yupResolver(validationSchema) });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit(formData)} noValidate sx={{ mt: 1 }}>

          <Typography component="h2" variant="h5" align='center' mb={4}>
            Forgot Your Password?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your Email and we will send a link to reset your password
          </Typography>
          <Typography color={response?.color}>{response?.message}</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Email"
              label="Email"
              type="Email"
              id="Email"
              {...register('email')}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={formData}>
                  Resend email
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            {/* </Grid> */} 
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        // onClick={()=>{setBackDrop(false)}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}