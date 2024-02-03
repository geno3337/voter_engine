import AdminModal from "../adminModel/adminModel";
import { Typography,TextField,Button,Box } from "@mui/material";
import PropTypes from 'prop-types';

export default function DeleteUserModel(props){

    return(
        <>
        <AdminModal 
        {...props}
        >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',marginTop:1}}>
            <Typography component="p" variant="h6" textAlign={"center"}>
              Do you want to delete the selected users
            </Typography>
            <Button variant="contained" sx={{m:2}} 
            // onClick={props.onClose}
            onClick={props.onDelete}
            >Delete</Button>
          </Box>
        </AdminModal>
        </>
    )
}

DeleteUserModel.propTypes = {
  onDelete: PropTypes.func.isRequired,
}