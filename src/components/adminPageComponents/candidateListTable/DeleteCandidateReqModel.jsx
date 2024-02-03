import AdminModal from "../adminModel/adminModel";
import { Typography,TextField,Button,Box } from "@mui/material";


export default function DeleteCandidateReqModel(props){
    return(
        <>
        <AdminModal 
        {...props}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="p" variant="h6">
              Do you want to delete the profile
            </Typography>
            <Button variant="contained" sx={{m:2}} onClick={props.onClose}>Delete</Button>
          </Box>
        </AdminModal>
        </>
    )
}