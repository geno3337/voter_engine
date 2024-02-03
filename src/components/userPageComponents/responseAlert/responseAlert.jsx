import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ResponseAlert(props){
  
    return(
        <Alert  severity={props.type} variant="filled" sx={{ m: 2, mb: 0,position:'fixed'
        ,top:65,right:20,width:200,height:60,display:'flex',alignItems:'center',justifyContent:'center',zIndex:999
      }}
                action={
                  <IconButton aria-label="close" color="inherit" size="small"
                    onClick={props.handleClick}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }

              >
                {/* {submitResponse} */}
                {props.children}
                {/* success */}
              </Alert>
    )
}