import { Grid, Paper, Typography } from "@mui/material";
import { deepOrange, green, red } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TextField from '@mui/material/TextField';
import "./RegistrationForm.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import AuthService from "../../../service/auth-service";
import ResponseAlert from "../responseAlert/responseAlert";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import AvatarEditorModel from "../../avatarEditor/avatarEditor";
import { useRef } from "react";
import EmailVerificationModal from "./gmailVerificationModel";


export default function RegistrationForm() {

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        gmail: Yup.string().required('Email is required').email("Enter a valid email").test(
            'is-gmail',
            'Email must be a valid Gmail address',
            (value) => value.endsWith('@gmail.com')
          ),
        place: Yup.string().required('Place is required'),
        detail: Yup.string().required('About is required').min(20, 'About must be min of 30 character').max(100, 'About must be max of 100 character'),
        manifesto: Yup.string().required('Manifesto is required').min(100, 'About must be min of 40 character').max(1000, 'About must be man of 100 character'),
        gender: Yup.string().required('Gender is required'),
    });


    const { control, handleSubmit, setValue, register, formState: { errors },setError } = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const [imagePath, setImagePath] = useState()
    const [submitResponse, setSubmitResponse] =useState()
    const [submitError, setSubmitError] = useState()
    const [backdrop, setBackDrop] = useState(false)
    const [openEmailVerificationModel,setOpenEmailVerificationModel]=useState(false)


    const formData = (data) => {
        setBackDrop(true)
        console.log("Callback function when form is submitted!");
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('gender', data.gender);
        formData.append('detail', data.detail);
        formData.append('place', data.place);
        formData.append('post', data.post);
        formData.append('gmail', data.gmail);
        formData.append('manifesto', data.manifesto);
        
        if (imagePath) {
            formData.append('profileImage', imagePath);
          }
          console.log(formData)
        AuthService.createCandidateRequest(formData).then(
            (response) => {
                console.log(response?.data);
                if(response?.data == "success"){
                setOpenEmailVerificationModel(true)
                }
                // setSubmitResponse(response?.data)
                setBackDrop(false)
                setValue('name', '')
                setValue('gender', '') 
                setValue('place', '')
                setValue('detail', '')
                setValue('gmail', '')
                setValue('manifesto', '') 
                setPreview(null)
                setTimeout(() => {
                    setOpenEmailVerificationModel(false)
                  }, 5000);
            }
        )
        .catch((err) => {
            err?.response?.data?.violations?.forEach((error) => {
                setError(error?.fieldName, {
                  type: 'manual',
                  message: error?.message,
                });
              });
            console.log("error: ", err?.response);
            setSubmitError(err?.response?.data?.message)
            setTimeout(() => {
                setSubmitError();
              }, 5000);
            setBackDrop(false)
        })
        
        if (imagePath != null) {
            const formData = new FormData();
            formData.append('image', imagePath); // 'file' is the key you will use on the server to access the uploaded file
            // formData.append('name', 'John Doe');
            console.log("Image",formData);}
        //     AuthService.uploadCandidateImage(data.gmail, formData).then(
        //         (response) => {
        //             console.log(response);
        //         }
        //     )
        //     .catch((err) => {
        //         console.log("error: ", err.response.data.message);
        //        setSubmitError(err.response.data.message)
        //     })
        // }
    };

    // const handleFileSelect = (file) => {
    //     // Handle the selected file here
    //     console.log('Selected file:', file);
    // };

    // const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("assets/img/team/st,small,507x507-pad,600x600,f8f8f8.jpg");
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // const file = e.target.result
        // setSelectedFile(file);
        // Create a preview of the selected image
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImagePreview(reader.selectedFile);
        // };
        // reader.readAsDataURL(file);
        // console.log(reader.result);
        setImagePath(e.target.files[0])
        // setValue("profileImage",e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        e.target.value=""
    };

    const handleFileDelete=()=>{
        setPreview(" https://www.signivis.com/img/custom/avatars/member-avatar-01.png")
    }

    // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
        setSrc(URL.createObjectURL(file));
        setModalOpen(true);
        // Note: You don't need to use `setImagePath` here unless you plan to do something with `imagePath` separately.
        // imagePath is already set in `handleFileChange`.
        // setImagePath(file);
        e.target.value = ""; // Clear the input value.
    }
  };


    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                <Paper sx={{ p: 2, margin: 2, width: 650, padding: 0, borderRadius: 5 }} elevation={16} >
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography className="heading" component="h1" variant="h3" color="white" sx={{
                                display: "flex",
                                alignItems: "center", justifyContent: "center"
                            }}>Registeration Form</Typography>
                        </Grid>
                        <Grid item xs={12} margin={2}>
                            <Box component="form" onSubmit={handleSubmit(formData)} sx={{ padding: 2, paddingLeft: 4 }}>
                                <Grid container direction="row">
                                    <Grid item sm={6} md={6} sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography component="h1" variant="h6">profile</Typography>
                                    </Grid>
                                    <Grid item sm={6} md={6} xs={12} >
                                        <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} sm={7} md={7} xs={7}>
                                            <CardMedia sx={{objectFit:"contain"}} component="img" height="200" 
                                            // image={imagePreview} 
                                            src={
                                                preview ||
                                                " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
                                              }
                                            alt="Paella dish" />
                                        </Grid>
                                        {/* <Typography color="red">{errors?.profileImage?.message}</Typography> */}
                                        <Grid item md={7} sm={6} xs={12} mt={1} sx={{ display: "flex" }}>
                                            <Grid item>
                                                <Button variant="contained" size="small" sx={{ margin: 1 }} component="label">
                                                    <FileUploadOutlinedIcon />
                                                    <input type="file" accept="jpg" id="actual-btn" hidden 
                                                    // onChange={handleFileChange}
                                                    ref={inputRef}
                                                    onChange={handleImgChange}       
                                                    />
                                                    <TextField hidden type="file"></TextField>
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" size="small" sx={{ margin: 1 }}  onClick={handleFileDelete} >
                                                    <DeleteForeverOutlinedIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" >
                                    <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography component="h1" variant="h6">Name</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" required fullWidth id="Name" label="Name" name="Name"
                                            {...register('name')}
                                            error={!!errors.name}
                                            helperText={errors.name?.message} autoComplete="Name" autoFocus />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" >
                                    <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography component="h1" variant="h6">Email</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" required fullWidth id="Email" label="Email" name="Email" autoComplete="Email" autoFocus
                                            {...register('gmail')}
                                            error={!!errors.gmail}
                                            helperText={errors.gmail?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" sx={{ display: "flex", alignItems: "center" }} >
                                    <Grid item xs={12} md={6}><Typography component="h1" variant="h6">Place</Typography></Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" required fullWidth id="Place" label="Place" name="Place" autoComplete="Place" autoFocus
                                            {...register('place')}
                                            error={!!errors.place}
                                            helperText={errors.place?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" sx={{ display: "flex", alignItems: "center" }}>
                                    <Grid item xs={12} md={6}><Typography component="h1" variant="h6">Post</Typography></Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" required fullWidth id="Post" label="Post" name="post" autoComplete="Post" autoFocus
                                            defaultValue="President"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            {...register('post')}
                                            error={!!errors.post}
                                            helperText={errors.post?.message} 
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" sx={{ display: "flex", alignItems: "center" }} >
                                    <Grid item xs={12} md={6}><Typography component="h1" variant="h6">Gender</Typography></Grid>
                                    <Grid item xs={12} md={6}>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Please select a gender.' }}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    row
                                                    {...field}>
                                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                </RadioGroup>
                                            )}
                                        />
                                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" sx={{ display: "flex", alignItems: "center" }} >
                                    <Grid item xs={12} md={6}><Typography component="h1" variant="h6">About</Typography></Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            margin="normal" required autoFocus
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="About"
                                            multiline
                                            rows={4}
                                            name="About"
                                            {...register('detail')}
                                            error={!!errors.detail}
                                            helperText={errors.detail?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row" sx={{ display: "flex", alignItems: "center" }} >
                                    <Grid item xs={12} md={6}><Typography component="h1" variant="h6">Manifesto</Typography></Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal" required autoFocus
                                            id="outlined-multiline-static"
                                            label="Manifesto"
                                            multiline
                                            rows={4}
                                            name="Manifesto"
                                            {...register('manifesto')}
                                            error={!!errors.manifesto}
                                            helperText={errors.manifesto?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} md={12}>
                                    <Button variant="contained" type="submit" id="myForm">Submit</Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
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
            <AvatarEditorModel
            modalOpen={modalOpen}
            src={src}
            setPreview={setPreview}
            setModalOpen={setModalOpen}
            setImagePath={setImagePath}
            />
            <EmailVerificationModal
            open={openEmailVerificationModel} 
            onClose={() => { setOpenEmailVerificationModel(false)}}
            // btn={'send'}
            // onfunc={()=>{sendMAilById()}}
            >
                <Box sx={{alignItems:'center',justifyContent:'center',margin:1}}>
                    <Typography>
                    Your application is saved successfully please Check your email for email verification
                    </Typography>
                </Box>
            </EmailVerificationModal>
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            // onClick={()=>{setBackDrop(false)}}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            </Box>
        </>
    )
}