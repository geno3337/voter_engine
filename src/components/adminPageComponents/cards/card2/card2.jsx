import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import * as Yup from "yup";
// import AuthService from '../../../../service/auth-service';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AdminModal from '../../adminModel/adminModel';
import "./card2.css"
import AuthService from '../../../../service/auth-service';
import ResponseAlert from '../../../userPageComponents/responseAlert/responseAlert';
import { useEffect } from 'react';
import StartIcon from '@mui/icons-material/Start';

function preventDefault(event) {
  event.preventDefault();
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Card2() {

  const [detail, setDetail] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () =>{
    getEventDetails();
    setOpen(true);}
  const handleClose = () => setOpen(false);
  const [submitResponse, setSubmitResponse] =useState()
  const [submitError, setSubmitError] = useState()
  const [response,setResponse]=useState("")

  useEffect(()=>{
    getEventDetails();
  },[])

  const getEventDetails = async() => {
    await AuthService.getEventDetails().then(
      (response) => {
        // console.log("eventDetail", response.data)
        setDetail(response?.data)
      }
    )
  }


  const validationSchema = Yup.object().shape({
    electionStartDate: Yup.date().required("*Required"),
    // .nullable().min(new Date(), 'Selected date must be today or in the future')
      // .max(new Date(new Date().setMonth(new Date().getMonth() + 3)), 'Selected date must be within the next three months'),
      electionEndDate: Yup.date().required("required")
  });

  const { control, handleSubmit, setValue,watch, register, formState: { errors }, } = useForm(
    { resolver: yupResolver(validationSchema) }
  );

 
  const submitForm = (data) => {
    console.log("d",data); //, JSON.stringify(data));
    AuthService.startelection(data).then(
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
      console.log("error: ", err.response.data.message);
      // setSubmitError(err.response.data.message)
      let updatedValue = {};
      updatedValue = {color:"red",message:err.response.data.message};
             setResponse(updatedValue)
             console.log(updatedValue)
             setTimeout(() => {
              setResponse();
            }, 5000);
  })
  };

  const [sdate,setSdate]=useState([]);

  return (
    <React.Fragment>
      {/* <AlarmOnIcon fontSize='large' />
      <Typography component="p" variant="h5">
        To start the application canditate
      </Typography> */}
      <StartIcon fontSize="large" />
      <Typography component="p" variant="h5">
        To start the election
      </Typography>
      <Button variant="contained"
        onClick={handleOpen}
        sx={{
          width: 130,
        }}>Click Here</Button>
      <AdminModal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',textAlign:"center"}}>
          <Typography component="p" variant="h6">
          To start the election
          </Typography>
          <Typography color={response?.color}>{response?.message}</Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ m: 2, width: 300 }}
                    label="StartDate"
                    // {...field}
                    required
                    disablePast
                    minDate={dayjs(detail?.registrationEndDate).add(1,'day')}
                    maxDate={dayjs(detail?.registrationEndDate).add(3,'month')}
                      onChange={date => {
                        setValue("electionStartDate",date)
                      setSdate(date)
                    }} 
                  />
              {errors.electionStartDate && <span style={{ color: 'red' }}>{errors.electionStartDate.message}</span>}
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ m: 2, width: 300 }}
                    label="EndDate"
                    required
                    disablePast
                   minDate={dayjs(sdate).add(1,"day")}
                   maxDate={dayjs(sdate).add(3,'month')}
                   onChange={date => {
                    setValue("electionEndDate",date)
                }} 
                  />
              {errors.electionEndDate && <span style={{ color: 'red' }}>{errors.electionEndDate.message}</span>}
            </LocalizationProvider>
            <Button variant="contained" type="submit">Submit</Button>
            {/* {
              submitResponse && <Alert severity="success" variant="filled" sx={{ m: 2, mb: 0 }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSubmitResponse()
                      // setOpen(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }

              >{submitResponse}</Alert>
            } */}
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