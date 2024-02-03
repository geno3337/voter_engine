import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StartIcon from '@mui/icons-material/Start';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
// import AuthService from '../../../../service/auth-service';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import CloseIcon from '@mui/icons-material/Close';
import AdminModal from '../../adminModel/adminModel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import { Controller } from "react-hook-form";
import dayjs from 'dayjs';
import ResponseAlert from '../../../userPageComponents/responseAlert/responseAlert';
import AuthService from '../../../../service/auth-service';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';


function preventDefault(event) {
  event.preventDefault();
}



export default function Card1() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submitResponse, setSubmitResponse] = React.useState()
  const [submitError, setSubmitError] = useState()
  const [response,setResponse]=useState("")

  const validationSchema = Yup.object().shape({
    registrationStartDate: Yup.date()
    .required("*Required")
    // .min(new Date(), 'Selected date must be today or in the future')
      // .max(new Date(new Date().setMonth(new Date().getMonth() + 3)), 'Selected date must be within the next three months')
      ,
      registrationEndDate: Yup.date()
      .required("required")
  });

  const { control, handleSubmit, setValue,watch, register, formState: { errors }, } = useForm(
    { resolver: yupResolver(validationSchema) }
  );

 
  const submitForm = (data) => {
    console.log("d",data); //, JSON.stringify(data));
    AuthService.startRegisteration(data).then(
      (response)=>{
        console.log(response.data);
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
      console.log("error: ", err?.response?.data?.message);
      // setSubmitError(err.response.data.message)
      let updatedValue = {};
      updatedValue = {color:"red",message:err?.response?.data?.message};
             setResponse(updatedValue)
             console.log(updatedValue)
             setTimeout(() => {
              setResponse();
            }, 5000);
      
  })
  };

  const [sdate,setSdate]=useState([]);

  // let sd = watch("startdate")
  // setSdate(sd)
  

  return (
    <React.Fragment>
      {/* <StartIcon fontSize="large" />
      <Typography component="p" variant="h5">
        To start the election
      </Typography> */}
      <AlarmOnIcon fontSize='large' />
      <Typography component="p" variant="h5">
        To start the registeration
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ width: 130 }}>Click Here</Button>
      <AdminModal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="p" variant="h6">
          To start the registeration
          </Typography>
          <Typography color={response?.color}>{response?.message}</Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <Controller
                control={control}
                name="startdate"
                render={({ field }) => ( */}
                  <DatePicker
                    sx={{ m: 2, width: 300 }}
                    label="StartDate"
                    // {...field}
                    required
                    disablePast
                    minDate={dayjs()}
                    maxDate={dayjs().add(3,'month')}
                      onChange={date => {
                        setValue("registrationStartDate",date)
                      setSdate(date)
                    }} 
                  />
                 {/* )}
              />  */}
              {errors?.registrationStartDate && <span style={{ color: 'red' }}>{errors?.registrationStartDate?.message}</span>}
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <Controller
                control={control}
                name="enddate"
                render={({ field }) => ( */}
                  <DatePicker
                    sx={{ m: 2, width: 300 }}
                    label="EndDate"
                    // {...field}
                    required
                    disablePast
                   minDate={dayjs(sdate).add(1,"day")}
                   maxDate={dayjs(sdate).add(3,'month')}
                   onChange={date => {
                    setValue("registrationEndDate",date)
                }} 
                  />
                 {/* )}
              />  */}
              {errors?.registrationEndDate && <span style={{ color: 'red' }}>{errors?.registrationEndDate?.message}</span>}
            </LocalizationProvider>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </Box>
      </AdminModal>
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
    </React.Fragment>
  );
}