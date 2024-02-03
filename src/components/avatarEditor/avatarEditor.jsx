import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import UploadIcon from '@mui/icons-material/Upload';


// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};


function AvatarEditorModel({ src, modalOpen, setModalOpen, setPreview,setImagePath }) {
//   const [scale, setScale] = useState(1);
//   const [editor, setEditor] = useState(null);
//   const [image,setImage]=useState(null)
//   const [imagePreview,setImagePreview]=useState(null)

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file)
//     e.target.value = ""
// };

//   const handleScaleChange = (e) => {
//     const newScale = parseFloat(e.target.value);
//     setScale(newScale);
//   };

//   const handleSave = () => {
//     if (editor) {
//       const canvas = editor.getImageScaledToCanvas();
//       const dataURL = canvas.toDataURL();
//       // You can now send the dataURL to your server or use it as needed.
//       console.log(dataURL);
//       setImagePreview(dataURL)
//     }
//   };

//   return (
//     <div>
//       <h2>Avatar Editor</h2>
//       <div>
//         <AvatarEditor
//           ref={(editorRef) => setEditor(editorRef)}
//           image={image}
//           width={200}
//           height={200}
//           border={10}
//           color={[255, 255, 255, 0.6]} // RGBA color for the border
//           scale={scale}
//         />
//       </div>
//       <div>
//         <label>
//           Scale:
//           <input
//             type="range"
//             min="1"
//             max="2"
//             step="0.01"
//             value={scale}
//             onChange={handleScaleChange}
//           />
//         </label>
//       </div>
//       <div>
//       <input type="file" id="actual-btn"  onChange={handleFileChange} />
//         <button onClick={handleSave}>Save Avatar</button>
//       </div>
//       <CardMedia sx={{objectFit:"contain"}} component="img" height="200" image={imagePreview} alt="Paella dish" />
//     </div>
//   );
const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setImagePath(blob)
      setModalOpen(false);
      
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan"
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            border: "3px solid white",
            background: "black"
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );

}

export default AvatarEditorModel;