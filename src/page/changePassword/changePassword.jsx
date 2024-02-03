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

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
  },
});

export default function ChangePassword() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [response,setResponse]=React.useState("")
  const [backdrop,setBackDrop]=React.useState()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required')
    .min(4, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
    )
    .max(12,'Password must be at max of 12 characters'),
    conformPassword: Yup.string().required('Password is required')
    .min(4, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
    )
    .max(12,'Password must be at max of 12 characters')
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {handleSubmit,register,formState: { errors },} = useForm({ resolver: yupResolver(validationSchema) });



  const formData = (data) => {
    console.log(data)
    console.log(window.location.search)
    let token=window.location.search
    AuthService.changePassword(data,token).then(
      (response) => {
        let updatedValue = {};
 updatedValue = {color:"green",message:response?.data};
        setResponse(updatedValue)
        console.log(updatedValue)
        setBackDrop(false)
        setTimeout(() => {
          setResponse();
        }, 5000);
      }
    ).catch((err) => {
      console.log("error: ", err?.response?.data?.message);
      let updatedValue = {};
 updatedValue = {color:"red",message:err.response.data.message};
        setResponse(updatedValue)
        setBackDrop(false)
        console.log(updatedValue)
        setTimeout(() => {
          setResponse();
        }, 5000);
    })
  };

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
          
          <Typography component="h1" variant="h5" mb={2}>
            Password reset
          </Typography>
          <Typography color={response?.color}>{response?.message}</Typography>
          <Box component="form" onSubmit={handleSubmit(formData)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="New password"
              label="New password"
              name="New password"
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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Conform new password"
              label="Conform new password"
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
              {...register('conformPassword')}
              error={!!errors.conformPassword}
              helperText={errors.conformPassword?.message}
              id="Conform new password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set password
            </Button>
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