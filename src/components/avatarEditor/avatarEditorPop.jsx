// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import { Grid, Zoom } from '@mui/material';
// import UploadIcon from '@mui/icons-material/Upload';
// import AvatarEditorComponent from './avatarEditor';
// import AvatarEditor from 'react-avatar-editor';
// import { useState } from 'react';
// import './YourComponent.css';
// import { red } from '@mui/material/colors';

// const style = {
//     position: 'absolute',
//     // position: 'relative',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 500,
//     // height:450,
//     bgcolor: 'background.paper',
//     //   border: '2px solid #000',
//     boxShadow: 24,
//     // p: 4,
// };

// export default function AvatarEditorPop(props) {

//     const [scale, setScale] = useState(1.5);
//     const [editor, setEditor] = useState(null);
//     const [image, setImage] = useState(null)
//     const [imagePreview, setImagePreview] = useState(null)

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file)
//         e.target.value = ""
//     };

//     const handleScaleChange = (e) => {
//         const newScale = parseFloat(e.target.value);
//         setScale(newScale);
//     };

//     const handleSave = () => {
//         if (editor) {
//             const canvas = editor.getImageScaledToCanvas();
//             const dataURL = canvas.toDataURL();
//             // You can now send the dataURL to your server or use it as needed.
//             console.log(dataURL);
//             setImagePreview(dataURL)
//         }
//     };


//     return (
//         <div>
//             <Modal
//                 open={true}
//                 //  onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     {/* <Box sx={{ position: "absolute", top: 8, left: 10 ,display:"flex",flexDirection:"row"}}>
//                 <IconButton aria-label="delete" onClick={props.onClose}  >
//                     <CloseIcon  fontSize='medium'  />
//                 </IconButton>
//                 <Typography variant="h5" >Drag the image to adjust</Typography>
//                 </Box> */}
//                     <Grid container>
//                         <Grid container xs={12} direction="row" height={70} bgcolor="primary.main" >
//                             <Grid item xs={9} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
//                                 <IconButton aria-label="delete" onClick={props.onClose}  >
//                                     <CloseIcon fontSize='medium' />
//                                 </IconButton>
//                                 {/* </Grid> */}
//                                 {/* <Grid item xs={8}> */}
//                                 <Typography variant="h5" sx={{ display: 'flex', alignItems: "center", lineHeight: "inherit" }} >Drag the image to adjust</Typography>
//                             </Grid>
//                             <Grid item xs={3} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
//                                 <IconButton aria-label="delete" onClick={props.onClose} sx={{ marginRight: 1 }}  >
//                                     <UploadIcon />
//                                     <Typography variant="h6" sx={{ display: 'flex', alignItems: "center", lineHeight: "inherit" }} >upload</Typography>
//                                 </IconButton>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12}sx={{height:420}}>
//                             {/* <Box 
//                             // className="cont"
//                             > */}
//                             <AvatarEditor
//                             className='AE'
//                                 ref={(editorRef) => setEditor(editorRef)}
//                                 image={image}
//                                 style={{ width: "100%", height: "100%"}}
//                                 border={50}
                            
//                                 borderRadius={50}
//                                 color={[0, 0, 0, 0.72]}
//                                 // width={270}
//                                 // height={270}
//                                 // border={50}
//                                 // borderRadius={200}
//                                 // color={[255, 255, 255, 0.6]} // RGBA color for the border
//                                 scale={scale}
//                             />
//                             {/* </Box> */}
//                         </Grid>
//                         <Grid item xs={12} bgcolor="primary.main">
//                             <div>
//                                 <label>
//                                     Scale:
//                                     <input
//                                         type="range"
//                                         min="1"
//                                         max="2"
//                                         step="0.01"
//                                         value={scale}
//                                         onChange={handleScaleChange}
//                                     />
//                                 </label>
//                             </div>
//                             <div>
//                                 <input type="file" id="actual-btn" onChange={handleFileChange} />
//                                 <button onClick={handleSave}>Save Avatar</button>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Modal>
//         </div>
//     )
// }