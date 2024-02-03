import { Box, Grid, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import AuthService from "../../../service/auth-service";
import { useState,useEffect } from "react";
import Avatar from '@mui/material/Avatar';


export default function ProfileImageCard() {

    const [data, setData] = useState([])

  useEffect(() => {
    getUserByEmail();
  }, [])

  const getUserByEmail = () => {
    AuthService.getUserByEmail(AuthService.getCurrentUser().email).then(
      (response) => {
        console.log(response.data);
        setData(response.data)
      }
    )
  }

    return (
        <>
            {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 }}> */}
                <Paper sx={{ p: 2, margin: 2, minWidth: 350 }} elevation={16}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} >
                        {/* <CardMedia  component="img" sx={{ borderRadius: 50, width: 120,objectFit:"contain" }} image={data.profileImage} alt="Paella dish" /> */}
                        <Avatar alt="Remy Sharp" src={data?.profileImage} 
                        sx={{ 
                            // borderRadius: 50,
                            height:100,
                             width: 100
                             ,objectFit:"contain" }} 
                        />
                        <Typography component="h1" marginTop={3} variant="h5">
                            {data.userName}
                            {/* Andrew Smith */}
                            </Typography>
                        <Typography component="h1" variant="h6">{data.role=='admin' ? 'Admin': 'User'}</Typography>
                        <Box sx={{ width: 170, display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
                            <IconButton aria-label="instagram" color="primary">
                                <InstagramIcon/>
                            </IconButton>
                            <IconButton aria-label="TwitterIcon" color="primary">
                                <TwitterIcon/>
                            </IconButton>
                            <IconButton aria-label="facebook" color="primary">
                                <FacebookIcon/>
                            </IconButton>
                            <IconButton aria-label="linkedIn" color="primary">
                                <LinkedInIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            {/* </Box> */}

        </>
    )
}