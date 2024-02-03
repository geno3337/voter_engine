import AdminModal from "../adminModel/adminModel";
import { Typography,TextField,Button,Box } from "@mui/material";


export default function SendMailToAllModel(props){
    return(
        <>
        <AdminModal 
        {...props}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',marginTop:1 }}>
            <Typography component="p" variant="h6" textAlign={"center"}>
              Do you want to send mail to all users
            </Typography>
            <Button variant="contained" sx={{m:2}} onClick={props.onSend}>send</Button>
          </Box>
        </AdminModal>
        </>
    )
}