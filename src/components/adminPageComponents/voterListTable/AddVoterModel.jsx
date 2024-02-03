import AdminModal from "../adminModel/adminModel";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Typography,TextField,Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import AuthService from "../../../service/auth-service";
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";


export default function AddVoterModel(props){

  
  const validationSchema = Yup.object().shape({
    voter_name: Yup.string().required('Name is required'),
    gmail: Yup.string().required('Email is required').email("Enter a valid email").test(
      'is-gmail',
      'Email must be a valid Gmail address',
      (value) => value.endsWith('@gmail.com')
    ),
    voter_age:Yup.number().required().moreThan(18, "age must be greater then 18")
});


const { control, handleSubmit, setValue, register, formState: { errors },setError } = useForm(
    { resolver: yupResolver(validationSchema) }
);

const [submitResponse, setSubmitResponse] =useState()
const [submitError, setSubmitError] = useState()
const [response,setResponse]=useState("")



// const formData = (data) => {
//     console.log("Callback function when form is submitted!");
//     console.log(data)
//     AuthService.addUser(data).then(
//         (response) => {
//             setSubmitResponse(response.data)
           
//     }
//     )
//     .catch((err) => {
//       console.log(err.code);
//       // if (console.log(err.code)=="ERR_BAD_REQUEST") {
//         err?.response?.data?.violations.forEach((error) => {
//           setError(error.fieldName, {
//             type: 'manual',
//             message: error.message,
//           });
//         });
//       // }
//       // if(err?.response?.data?.message!=null){
//         console.log("error: ", err.response?.data?.message);
//         setSubmitError(err.response?.data?.message)
//       }
//     // }
//     )
//     props.onSubmit
// };

const formData = (data) => {
  console.log("Callback function when form is submitted!");
  console.log(data)
  AuthService.addVoter(data).then(
      (response) => {
          // setSubmitResponse(response.data)
          let updatedValue = {};
          updatedValue = {color:"green",message:response.data};
                 setResponse(updatedValue)
                 console.log(updatedValue)
                 setTimeout(() => {
                  setResponse();
                }, 5000); 
                setValue("voter_name",'')
                setValue("gmail", '')
                setValue("voter_age", '')
                    
  }
  )
  .catch((err) => {
    console.log(err.code);
      err?.response?.data?.violations?.forEach((error) => {
        setError(error.fieldName, {
          type: 'manual',
          message: error.message,
        });
      });
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
    return(
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
            <Avatar sx={{ m: 2, bgcolor: 'primary.main'  }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Voter Form
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
              <TextField label="gmail" variant="standard"
                margin="normal"
                required
                fullWidth
                name="gmail"
                id="gmail"
                {...register('gmail')}
                error={!!errors.gmail}
                helperText={errors.gmail?.message}
              />
              <TextField label="UserName" variant="standard"
                margin="normal"
                required
                fullWidth
                name="voter_name"
                id="voter_name"
                {...register('voter_name')}
                error={!!errors.voter_name}
                helperText={errors.voter_name?.message}
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
              <TextField label="Age" variant="standard"
                margin="normal"
                required
                fullWidth
                name="voter_age"
                id="voter_age"
                {...register('voter_age')}
                error={!!errors.voter_age}
                helperText={errors.voter_age?.message}
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