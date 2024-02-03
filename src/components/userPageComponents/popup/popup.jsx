// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Box } from '@mui/system';
// import { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import "./popup.css"


// export default function PopUp() {

//     const [open, setOpen] = useState(false);
//     const handleOpen = (userId) => {
//         setOpen(true);
//         setId(userId);
//     }
//     const handleClose = () => setOpen(false);

//     return (
//         <>
//             <Modal show={true} onHide={handleClose} animation={false} centered >
//                 <Modal.Header closeButton>
//                 </Modal.Header>
//                 <Modal.Body >
//                     {/* <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}> */}
//                         <Typography component="p" variant="h6">
//                             Do you want to delete the profile
//                         </Typography>
//                         <Button variant="contained" onClick={handleClose} sx={{ m: 2 }}>Delete</Button>
//                     {/* </Box> */}
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// } 