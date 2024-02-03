import AdminModal from "../adminModel/adminModel";
import { Typography,TextField,Button,Box } from "@mui/material";


export default function SendMailToUserById(props){
    return(
        <>
        <AdminModal 
        {...props}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="p" variant="h6" textAlign={"center"}>
              Do you want to send mail to the selected users
            </Typography>
            <Button variant="contained" sx={{m:2}} 
            onClick={props.onSend}>send</Button>
          </Box>
        </AdminModal>
        </>
    )
}