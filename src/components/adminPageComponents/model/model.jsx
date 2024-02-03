import { Children } from "react";
import AdminModal from "../adminModel/adminModel";
import { Typography,TextField,Button,Box } from "@mui/material";


export default function CommonModel(props){
    return(
        <>
        <AdminModal 
        {...props}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' ,marginTop:1 }}>
            <Typography component="p" variant="h6" textAlign={"center"}>
              {props.children}
            </Typography>
            <Button variant="contained" sx={{m:2}} onClick={props.onfunc}>{props.btn}</Button>
          </Box>
        </AdminModal>
        </>
    )
}