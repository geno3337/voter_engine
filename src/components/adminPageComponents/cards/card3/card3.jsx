import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
// import AuthService from '../../../../service/auth-service';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AdminModal from '../../adminModel/adminModel';
import AuthService from '../../../../service/auth-service';
import ResponseAlert from '../../../userPageComponents/responseAlert/responseAlert';



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

export default function Card3() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [submitResponse,setSubmitResponse]=React.useState()
    const handleClose = () => setOpen(false);
    const [submitError, setSubmitError] = useState()
    const [response,setResponse]=useState("")

    const handleRelease = () =>{
      AuthService.winner().then(
        (response) => {
          console.log(response)
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
    }


  return (
    <React.Fragment>
      <EmojiEventsIcon fontSize='large'/>
      <Typography component="p" variant="h5">
      To display the winner
      </Typography>
      <Button variant="contained" 
      onClick={handleOpen}
      sx={{
        width: 130,
      }}>Click Here</Button>
      <AdminModal open={open} onClose={handleClose}>
            <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
            <Typography component="p" variant="h6">
      To display the winner
      </Typography>
      <Typography color={response?.color}>{response?.message}</Typography>
        <Button variant="contained" onClick={handleRelease} sx={{m:2}}>Release</Button>
        {/* {
        submitResponse &&  <Alert severity="success"  variant="filled" sx={{ m: 2, mb: 0,mt:0 }}
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