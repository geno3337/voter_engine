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
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Copyright from "../../component/copyright/copyright.jsx";
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/auth-service.js';
// import useForm from '../../hooks/useForm.jsx';

// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange, red } from '@mui/material/colors'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from 'react-bootstrap/Alert';




const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

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



export default function SignIn() {


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [responseError, setResponseError] = React.useState("")

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  let navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('enter a valid email').test(
      'is-gmail',
      'Email must be a valid Gmail address',
      (value) => value.endsWith('@gmail.com')
    ),
    password: Yup.string().required('Password is required')
      .min(4, 'Password must be at least 6 characters')
      .max(12, 'Password must be at max of 12 characters')
  });


  const formLogin = (data) => {

    console.log("Callback function when form is submitted!");
    console.log("Form Values ", data);
    AuthService.login(data).then(
      () => {
        const user = AuthService.getCurrentUser();
        console.log(user.authorities.includes('user'))
        if (user.authorities.includes('admin')) {
          navigate("/adminlayout/dashboard");
          window.location.reload();
        }
        else {
          navigate('/home');
          window.location.reload();
        }

      }
    ).catch((err) => {
      console.log("error: ", err.response.data.message);
      setResponseError(err.response.data.message)
      setTimeout(() => {
        setResponseError();
      }, 5000);
    })

  }

  const { handleSubmit, register, formState: { errors }, } = useForm({ resolver: yupResolver(validationSchema) });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography color="red">{responseError}</Typography>
          <Box component="form" onSubmit={handleSubmit(formLogin)} sx={{ mt: 1 }}>
          <Alert variant="success" className="mb-0"  >
            {/* <Alert.Heading>Hey, nice to see you</Alert.Heading> */}
            {/* <p>
                Aww yeah, you successfully read this important alert message. This
                example text is going to run a bit longer so that you can see how
                spacing within an alert works with this kind of content.
              </p> */}
            <h6><b>Admin login credentials</b></h6>
            <p 
            className="mb-0"
            >
              email : geno3337@gmail.com<br/>
              password : Geno@2002
            </p>
            <hr/>
            <h6 ><b>User login credentials</b></h6>
            <p className="mb-0">
              email : geno7773@gmail.com<br/>
              password : Geno@2002
            </p>
          </Alert>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>,
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item xs>
              <Link href="forgetPasswordPage" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
