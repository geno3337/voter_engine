import { Box, Paper } from "@mui/material"
import "./UserProfileEditForm.css"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import AuthService from "../../../service/auth-service";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ResponseAlert from "../responseAlert/responseAlert";
import AvatarEditorModel from "../../avatarEditor/avatarEditor";
import { useRef } from "react";


export default function UserProfileEditForm() {

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Name is required'),
        gmail: Yup.string().required('Email is required').email("Enter a valid email").test(
            'is-gmail',
            'Email must be a valid Gmail address',
            (value) => value.endsWith('@gmail.com')
          ),
        about: Yup.string().required('About is required')
            .min(40, 'About must be min of 40 character').max(200, 'About must be max of 200 character'),
        address: Yup.string().required('About is required'),
        phone: Yup.string().required('About is required'),
        gender: Yup.string().required('About is required'),
    });

    const { control, handleSubmit, setValue, register, formState: { errors }, } = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const [data, setData] = useState([])
    const [id, setId] = useState(0)
    const [imagePath, setImagePath] = useState(null)
    const [submitResponse, setSubmitResponse] =useState()
  const [submitError, setSubmitError] = useState()
    const [backdrop, setBackDrop] = useState()

        // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

    useEffect(() => {
        getUserByEmail();
    }, [])

    useEffect(() => {
        handleFileChange();
    }, [imagePath])

    const getUserByEmail = () => {
        AuthService.getUserByEmail(AuthService.getCurrentUser().email).then(
            (response) => {
                console.log(response.data);
                setData(response?.data)
                setId(response?.data?.userId)
                setPreview(response?.data?.profileImage)
                setValue("about", response?.data?.about)
                setValue("userName", response?.data?.userName)
                setValue("gmail", response?.data?.gmail)
                setValue("address", response?.data?.address)
                setValue("phone", response?.data?.phone)
            }
        )
    }

    const formData = (data) => {
        console.log("Callback function when form is submitted!");
        console.log(data)
        AuthService.editUser(id, data).then(
            (response) => {
                setSubmitResponse(response.data)
                setBackDrop(false)
                setTimeout(() => {
                    setSubmitResponse();
                  }, 5000);
            }
        )
        .catch((err) => {
            console.log("error: ", err.response);
            setSubmitError(err)
            setTimeout(() => {
                setSubmitError();
              }, 5000);
        })
        // if (imagePath != null) {
        //     const formData = new FormData();
        //     formData.append('image', imagePath); // 'file' is the key you will use on the server to access the uploaded file
        //     // formData.append('name', 'John Doe');
        //     console.log(formData);
        //     AuthService.uploadUserImage(id, formData).then(
        //         (response) => {
        //             console.log(response);
        //         }
        //     )
        //     .catch((err) => {
        //         console.log("error: ", err.response.data.message);
        //        setSubmitError(err.response)
        //     })
        // }
    }

    const [imagePreview, setImagePreview] = useState("assets/img/team/st,small,507x507-pad,600x600,f8f8f8.jpg");
    const handleFileChange = (e) => {
        // const file = e.target.files[0];
        // setImagePath(e.target.files[0])
        // setImagePreview(URL.createObjectURL(e.target.files[0]));
        if(imagePath){
        const formData = new FormData();
        formData.append('image',imagePath ); // 'file' is the key you will use on the server to access the uploaded file
        // formData.append('name', 'John Doe');
        console.log(imagePath);
        AuthService.uploadUserImage(id, formData).then(
            (response) => {
                console.log(response);
                setSubmitResponse(response?.data)
                setTimeout(() => {
                    setSubmitResponse();
                  }, 5000);
            }
        )
        .catch((err) => {
            console.log("error: ", err.response.data.message);
        //    setSubmitError(err.response)
        })
    }
    };

    const handleFileDelete = () => {
        setPreview(" https://www.signivis.com/img/custom/avatars/member-avatar-01.png")
        AuthService.deleteUserImage(id).then(
            (response) => {
                console.log(response);
            } 
        ).catch((err) => {
            console.log("error: ", err.response.data.message);
           setSubmitError(err.response)
           setTimeout(() => {
            setSubmitError();
          }, 5000);
        })
    }



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
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14, marginBottom: 5 }}>
                <Paper sx={{ p: 2, maxWidth: 900 }} elevation={16}>
                    <Box component="form" onSubmit={handleSubmit(formData)}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={4} margin={2} >
                                <Grid item>
                                    <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} md={12} >
                                        <Grid item md={12}><CardMedia component="img" height="280" sx={{ maxWidth: 250 }} src={
                                                preview ||
                                                " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
                                              } alt="Paella dish" /></Grid>
                                    </Grid>
                                    <Grid item md={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                                        <Grid item>
                                            <Button variant="contained" size="small" sx={{ margin: 1 }} component="label"  >
                                                <FileUploadOutlinedIcon />
                                                <input type="file" id="actual-btn" hidden ref={inputRef} onChange={handleImgChange}  />
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="small" sx={{ margin: 1 }} onClick={handleFileDelete} >
                                                <DeleteForeverOutlinedIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ display: "flex", flexDirection: "column" }} sm={12} md={12}>
                                        <Typography component="h1" variant="h5" mt={1}  >
                                            About
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            id="outlined-multiline-static"
                                            // label="About"
                                            multiline
                                            rows={4}
                                            // defaultValue="write a few words about you" 
                                            {...register('about')}
                                            error={!!errors.about}
                                            helperText={errors.about?.message}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={7} margin={2} >
                                <Typography component="h1" variant="h4" mb={2}>
                                    Personal Details
                                </Typography>
                                <Grid container direction="row" mb={2}>
                                    <Grid item md={4} sm={4} xs={12} sx={{ display: "flex", alignItems: "center" }}><Typography component="h2" variant="h5" mb={1}> Name</Typography></Grid>
                                    <Grid item md={7} sm={8} xs={12}>
                                        <TextField margin="normal" height={1} required fullWidth id="Name" name="Name" autoComplete="Name" autoFocus
                                            {...register('userName')}
                                            error={!!errors.userName}
                                            helperText={errors.userName?.message}
                                        />
                                    </Grid>
                                </Grid>
                                <Typography component="h1" variant="h6" mb={1}>
                                    {data.role}
                                </Typography>
                                <Divider color="black" sx={{ marginBottom: 2 }} />
                                <Grid container>
                                    <Grid container direction="row" mb={2} >
                                        <Grid item md={4} sm={4} xs={6} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="body1">Id</Typography></Grid>
                                        <Grid item md={7} sm={8} xs={6} ><Typography component="h1" variant="body1">{data?.userId}</Typography></Grid>
                                    </Grid>
                                    <Grid container direction="row" >
                                        <Grid item md={4} sm={4} xs={12} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="body1">Email</Typography></Grid>
                                        <Grid item md={7} sm={8} xs={12} ><TextField margin="normal" required fullWidth id="Email" name="Email" autoComplete="Email" autoFocus
                                            {...register('gmail')}
                                            error={!!errors.gmail}
                                            helperText={errors.gmail?.message}
                                        /></Grid>
                                    </Grid>
                                    <Grid item container direction="row">
                                        <Grid item md={4} sm={4} xs={12} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="body1">Address</Typography></Grid>
                                        <Grid item md={7} sm={8} xs={12} ><TextField margin="normal" required fullWidth id="Address" name="Address" autoComplete="Address" autoFocus
                                            {...register('address')}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" >
                                        <Grid item md={4} sm={4} xs={12} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="body1">Phone</Typography></Grid>
                                        <Grid item md={7} sm={8} xs={12} >
                                            <TextField margin="normal" required fullWidth id="Phone" name="Phone" autoComplete="Phone" autoFocus
                                                {...register('phone')}
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message}
                                            /></Grid>
                                    </Grid>
                                    <Grid container direction="row" >
                                        <Grid item md={4} sm={4} xs={12} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="body1">Gender</Typography></Grid>
                                        <Grid item md={7} sm={8} xs={12}>
                                            <Controller
                                                name="gender"
                                                control={control}
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
                                </Grid>
                                <Button variant="contained" sx={{ marginTop: 3, width: 100 }} className="EditBtn" type="submit" >Save</Button>
                            </Grid>
                        </Grid>
                    </Box>
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
                {/* <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={backdrop}
                // onClick={()=>{setBackDrop(false)}}
                >
                    <CircularProgress color="inherit" />
                </Backdrop> */}
            </Box>
        </>
    )
}