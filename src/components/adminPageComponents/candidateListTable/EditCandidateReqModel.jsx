import AdminModal from "../adminModel/adminModel";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AuthService from "../../../service/auth-service";
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";
import MenuItem from '@mui/material/MenuItem';


export default function EditCandidateReqModel(props) {

  const [editId, setEditId] = useState(props?.userid)

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
    gmail: Yup.string().required('Email is required').email("Enter a valid email").test(
      'is-gmail',
      'Email must be a valid Gmail address',
      (value) => value.endsWith('@gmail.com')
    ),
    role: Yup.string().required().oneOf(['user', 'admin'], "the role must be either user or admin")
  });


  const { control, handleSubmit, setValue, register, formState: { errors }, setError } = useForm(
    // { resolver: yupResolver(validationSchema) }
  );

  const [submitResponse, setSubmitResponse] = useState()
  const [submitError, setSubmitError] = useState()
  const [Data, setData] = useState()
  const [response, setResponse] = useState("")

  const gender = [
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  useEffect(() => {
    getCandidateListById();
  }, [props])


  const getCandidateListById = async () => {
    await AuthService.getCandidateListById(props?.id).then(
      (response) => {
        setData(response.data)
        setValue("name", response?.data?.name)
        setValue("gmail", response?.data?.gmail)
        setValue("place", response?.data?.place)
        setValue("gender", response?.data?.gender)
      }
    )
  }


  const formData = (data) => {
    console.log("Callback function when form is submitted!");
    console.log(data)
      AuthService.adminEditCandidateList(props?.id,data).then(
          (response) => {
              // setSubmitResponse(response.data)
              let updatedValue = {};
              updatedValue = {color:"green",message:response.data};
                     setResponse(updatedValue)
                     console.log(updatedValue)
                     setTimeout(() => {
                      setResponse();
                  }, 5000);

      }
      )
      .catch((err) => {
        // console.log("err",err)
        //   err?.response?.data?.violations||data.forEach((error) => {
        //     setError(error.fieldName, {
        //       type: 'manual',
        //       message: error.message,
        //     });
        //   });
          // console.log("error: ", err.response?.data?.message);
          // setSubmitError(err.response?.data?.message)
          console.log("error: ", err.response.data.message);
          let updatedValue = {};
     updatedValue = {color:"red",message:err.response.data.message};
            setResponse(updatedValue)
            console.log(updatedValue)
            setTimeout(() => {
              setResponse();
          }, 5000);
        }
      // }
      )
      // props.onSubmit
  };
  return (
    <>
      <AdminModal {...props}>
        <Box
          sx={{
            // marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Form
          </Typography>
          <Typography color={response?.color}>{response?.message}</Typography>
          <Box component="form"
            //   onSubmit={addFormhandleSubmit}
            onSubmit={handleSubmit(formData)}
            sx={{
              mt: 1,
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* <Typography sx={{width:"inherit",m:1}}>Gmail:</Typography> */}
            <TextField variant="standard"
              margin="normal"
              required
              fullWidth
              label="Gmail"
              // color="warning"
              focused
              name="gmail"
              id="gmail"
              {...register('gmail')}
              error={!!errors.gmail}
              helperText={errors.gmail?.message}
            />
            {/* <Typography sx={{width:"inherit",m:1}}>UserName:</Typography> */}
            <TextField variant="standard"
              margin="normal"
              required
              fullWidth
              label="Name"
              // color="warning"
              focused
              name="name"
              id="name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            {/* <TextField label="Password" variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                id="password"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              /> */}
            {/* <Typography sx={{width:"inherit",marginTop:1}}>Role:</Typography> */}
            <TextField variant="standard"
              margin="normal"
              // sx={{marginBottom:0}}
              label="Place"
              // color="warning"
              focused
              required
              fullWidth
              name="place"
              id="place"
              {...register('place')}
              error={!!errors.place}
              helperText={errors.place?.message}
            />
            {/* <TextField
              margin="normal"
              label="Gender"
              focused
              required
              fullWidth
              defaultValue={''} 
              name="gender"
              id="gender"
              select
              variant="standard"
              {...register('gender')}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            >
              {gender.map((option) => (
                <MenuItem
                 key={option?.value} 
                 value={option?.value} 
                 >
                  {option?.label}
                </MenuItem>
              ))}
            </TextField> */}
            <Controller
              name="gender"
              control={control}
              defaultValue={''} // Set a default value if needed
              render={({ field }) => (
                <TextField
                  margin="normal"
                  label="Gender"
                  focused
                  required
                  fullWidth
                  select
                  variant="standard"
                  {...field}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: 100 }}
            // onClick={props.onClose}
            >
              Submit
            </Button>
            {/* {
                error && <Alert severity="error" variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                    //   onClick={() => {
                    //     setError()
                    //   }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }

                >{error}</Alert>
              } */}
          </Box>
        </Box>
      </AdminModal>
      {/* {
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
            } */}
    </>
  )
}