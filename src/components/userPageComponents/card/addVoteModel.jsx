import Modal from 'react-bootstrap/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box} from "@mui/material"
import AuthService from '../../../service/auth-service';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AdminModal from '../../adminPageComponents/adminModel/adminModel';
import { formToJSON } from 'axios';



export default function AddVoteModel(props) {

    // const validationSchema = Yup.object().shape({
    //     userName: Yup.string().required('Name is required'),
    //     gmail: Yup.string().required('Email is required').email("Enter a valid email"),
    //     role: Yup.string().required().oneOf(['user', 'admin'], "the role must be either user or admin")
    //   });
    
    
      const { control, handleSubmit, setValue, register, formState: { errors }, setError } = useForm(
        // { resolver: yupResolver(validationSchema) }
      );
    

    const [response,setResponse]=useState()
    const [submitResponse, setSubmitResponse] = useState()
//   const [submitError, setSubmitError] = useState()
  const [Data, setData] = useState()



    const addVote = ()=>{
        // AuthService.addVote(id,props?.id).then(
        //     (Response)=>{
        //         setResponse(response.data.message)
        //     }
        // )
    }


    const formData = (data) => {
        console.log("Callback function when form is submitted!");
        console.log(data)
          AuthService.addVote(props?.id,data.Id).then(
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
            {/* <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                    <Typography component="p" variant="h6">
                        Enter your ID
                    </Typography> */}
                    {/* <TextField id="standard-basic" label="ID" name="Id" type="Id" variant="standard" sx={{ m: 2, width: 300 }} /> */}
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Id"
                        label="ID"
                        name="Id"
                        autoFocus
                        variant="outlined" 
                        autoComplete="id"
                        sx={{ width: 300 }}
                    />
                    <Button variant="contained" type="submit" sx={{marginTop:1}} onClick={props.onHide}>Submit</Button>
                    </Box>
                </Modal.Body>
            </Modal> */}
            <AdminModal {...props}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' ,padding:3 }}>
          <Typography component="p" variant="h6">
          Enter your Id
          </Typography>
          <Box component="form" onSubmit={handleSubmit(formData)} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Typography color={response?.color}>{response?.message}</Typography>  
             <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Id"
                        label="ID"
                        name="Id"
                        autoFocus
                        variant="outlined" 
                        autoComplete="id"
                        sx={{ width: 300 }}
                        {...register('Id')}
                        error={!!errors.Id}
                        helperText={errors.Id?.message}
                    />
            <Button variant="contained" type="submit" sx={{marginTop:1}}>Submit</Button>
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