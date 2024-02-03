import { Grid, Paper, Typography } from "@mui/material";
import { deepOrange, green, red } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TextField from '@mui/material/TextField';
// import "./RegistrationForm.css"
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
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";
import AvatarEditor from 'react-avatar-editor';
import AvatarEditorModel from "../../avatarEditor/avatarEditor";
import { useRef } from "react";


export default function AdminProfileEdit() {

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Name is required'),
        gmail: Yup.string().required('Email is required').email("Enter a valid email").test(
            'is-gmail',
            'Email must be a valid Gmail address',
            (value) => value.endsWith('@gmail.com')
        ),
        about: Yup.string().required('About is required')
            .min(40, 'About must be min of 40 character').max(150, 'About must be max of 200 character'),
        address: Yup.string().required('Address is required'),
        phone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .min(999999999,"phone number should be 10 digit")
        .max(9999999999,"phone number should be 10 digit")
        .integer("A phone number can't include a decimal point")
        .required('A phone number is required'),
        gender: Yup.string().required('gender is required'),
    });

    const { control, handleSubmit, setValue, register, formState: { errors }, } = useForm(
        { resolver: yupResolver(validationSchema) }
    );

    const [data, setData] = useState([])
    const [id, setId] = useState(0)
    const [imagePath, setImagePath] = useState(null)
    const [submitResponse, setSubmitResponse] = useState()
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
                setData(response.data)
                setId(response.data.userId)
                setPreview(response?.data?.profileImage)
                setValue("about", response.data.about)
                setValue("userName", response.data.userName)
                setValue("gmail", response.data.gmail)
                setValue("address", response.data.address)
                setValue("phone", response.data.phone)
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
        //         .catch((err) => {
        //             console.log("error: ", err.response.data.message);
        //             setSubmitError(err.response)
        //         })
        // }
    }

    const [imagePreview, setImagePreview] = useState(null);
    const handleFileChange = () => {
        // const file = e.target.files[0];
        // setImagePath(e.target.files[0])
        // setImagePreview(URL.createObjectURL(e.target.files[0]));
        if(imagePath){
        const formData = new FormData();
        formData.append('image', imagePath); // 'file' is the key you will use on the server to access the uploaded file
        // formData.append('name', 'John Doe');
        console.log(formData);
        AuthService.uploadUserImage(id, formData).then(
            (response) => {
                console.log(response);
                setSubmitResponse(response.data)
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
            }
        )
            .catch((err) => {
                console.log("error: ", err.response.data.message);
                setSubmitError(err.response)
                setTimeout(() => {
                    setSubmitError();
                }, 5000);
            })
        }
    };

    const handleFileDelete = () => {
        setPreview(" https://www.signivis.com/img/custom/avatars/member-avatar-01.png")
        AuthService.deleteAdminProfileImage(id).then(
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
            <Box component="form" onSubmit={handleSubmit(formData)}>
                <Grid container>
                    <Grid container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4} sx={{ display: "flex", alignItems: "center" }}><Typography component="h1" variant="h6">Profile Image</Typography></Grid>
                        <Grid item xs={6} sm={4} md={4} mt={1}>
                            <Box sx={{ width: 200 }}>
                                <CardMedia sx={{objectFit:"contain"}} component="img" height="200" src={
                                                preview ||
                                                " https://www.signivis.com/img/custom/avatars/member-avatar-01.png"
                                              } alt="Paella dish" />
                                <Box>
                                    <Button variant="contained" size="small" sx={{ margin: 1 }} component="label" >
                                        <FileUploadOutlinedIcon />
                                        <input type="file" id="actual-btn" hidden ref={inputRef} onChange={handleImgChange} />
                                    </Button>
                                    <Button variant="contained" size="small" sx={{ margin: 1 }} onClick={handleFileDelete} ><DeleteForeverOutlinedIcon /></Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">Name</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8} mt={1}><TextField required fullWidth id="Name"
                            name="Name" autoComplete="Name" autoFocus
                            {...register('userName')}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                        /></Grid>
                    </Grid>
                    <Grid container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">Email</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8} mt={1}><TextField required fullWidth id="Email" name="Email"
                            autoComplete="Email" autoFocus
                            {...register('gmail')}
                            error={!!errors.gmail}
                            helperText={errors.gmail?.message}
                        />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">About</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8} mt={1}><TextField required fullWidth id="About" name="About"
                            autoComplete="About" autoFocus
                            multiline
                            rows={3}
                            {...register('about')}
                            error={!!errors.about}
                            helperText={errors.about?.message}
                        /></Grid>
                    </Grid>
                    <Grid item container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">Address</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8} mt={1}><TextField required fullWidth id="Adress" name="Adress"
                            autoComplete="Adress" autoFocus
                            {...register('address')}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        /></Grid>
                    </Grid>
                    <Grid item container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">Phone</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8} mt={1}><TextField required fullWidth id="Phone" name="Phone"
                            autoComplete="Phone" defaultValue="9360810235" autoFocus
                            {...register('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        /></Grid>
                    </Grid>
                    <Grid item container direction="row" mb={1}>
                        <Grid item xs={12} sm={4} md={4}><Typography component="h1" variant="h6">Gender</Typography></Grid>
                        <Grid item xs={12} sm={8} md={8}>
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
                            {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}</Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} md={12}>
                    <Button variant="contained" type="submit" >Save</Button>
                </Grid>
                {
                    submitResponse && <ResponseAlert
                        type="success"
                        handleClick={() => setSubmitResponse()}
                    >
                        {submitResponse}
                    </ResponseAlert>
                }
                {
                    submitError && <ResponseAlert
                        type="error"
                        handleClick={() => setSubmitError()}
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
            </Box>
        </>
    )
}