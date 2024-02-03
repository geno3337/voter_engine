import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthService from '../../../service/auth-service';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {deepOrange, red} from '@mui/material/colors'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";

export default function AdminPasswordChange(){

  const [showPassword, setShowPassword] = React.useState(false);
  const [submitResponse,setSubmitResponse]=React.useState("")
  const [submitError,setSubmitError]=React.useState("")
  const [backdrop,setBackDrop]=React.useState()


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
    )
    .max(12,'Password must be at max of 12 characters'),
    newPassword: Yup.string().required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
    )
    .max(12,'Password must be at max of 12 characters'),
    conformPassword: Yup.string().required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)'
    )
    .max(12,'Password must be at max of 12 characters')
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {handleSubmit,setValue,register,formState: { errors },} = useForm(
    { resolver: yupResolver(validationSchema) }
    );



  const formData = (data) => {
    console.log(data)
    AuthService.adminChangePassword(data,AuthService.getCurrentUser().email).then(
      (response) => {
        console.log(response?.data);
        setSubmitResponse(response?.data)
                console.log(response?.data);
                setBackDrop(false)
                setValue("conformPassword","")
                setValue("currentPassword","")
                setValue("newPassword","")
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
      }
    ).catch((err) => {
      console.log("error:", err?.response?.data?.message);
      setSubmitError(err?.response?.data?.message)
      setBackDrop(false)
      setTimeout(() => {
          setSubmitError();
      }, 5000);
    })
  };


    return(
        <>
        <Box  component="form" onSubmit={handleSubmit(formData)}>
            <Grid container>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={12} sm={4} md={4} sx={{display:"flex",alignItems:"center"}}><Typography component="h2" variant="h6">Current Password</Typography></Grid>
                  <Grid item xs={12} sm={8} md={8}>
                  <TextField
              margin="normal"
              required
              fullWidth
              id="Current Password"
              label="Current Password"
              name="Current Password"
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
              {...register('currentPassword')}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              autoFocus
            /></Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={12} sm={4} md={4} sx={{display:"flex",alignItems:"center"}}><Typography component="h1" variant="h6">New Password</Typography></Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    {/* <TextField required fullWidth id="New Password" label="New Password" type="password" 
                    name="New Password" autoComplete="New Password" defaultValue="Kevin Anderson" autoFocus /> */}
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
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              autoFocus
            />
                    </Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={12} sm={4} md={4} sx={{display:"flex",alignItems:"center"}}><Typography component="h1" variant="h6">Re-enter New Password</Typography></Grid>
                  <Grid item xs={12} sm={8} md={8}>
                  <TextField
              margin="normal"
              required
              fullWidth
              id="Conform Password"
              label="Conform Password"
              name="Conform Password"
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
              autoFocus
            /></Grid>
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} xs={12} sm={12} md={12}>
                    <Button variant="contained" type="submit" >Change Password</Button>
                </Grid>
              </Grid>
          </Box>
          {
              submitResponse && <ResponseAlert 
              type="success"
              handleClick={()=>setSubmitResponse()} 
              >
                {submitResponse}
              </ResponseAlert>
            }
            {
              submitError && <ResponseAlert 
              type="error"
              handleClick={()=>setSubmitError()} 
              >
                {submitError}
              </ResponseAlert>
            }
             {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        // onClick={()=>{setBackDrop(false)}}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
        </>
    )
}