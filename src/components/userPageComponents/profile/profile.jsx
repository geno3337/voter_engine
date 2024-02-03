import { Box, Paper } from "@mui/material"
import "./profile.css"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import AuthService from "../../../service/auth-service";
import { useEffect, useState } from "react";



export default function Profile() {

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
  // console.log(AuthService.getCurrentUser().email)


  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 }}>
        <Paper sx={{ p: 2, margin: 2, maxWidth: 900 }} elevation={16}>
          <Grid container>
            <Grid item xs={12} sm={4} md={4} margin={2}>
              <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* {console.log(data.profileImage)} */}
                <CardMedia component="img" height="300" image={data?.profileImage ||" https://www.signivis.com/img/custom/avatars/member-avatar-01.png"} alt="Paella dish" />
              </Grid>
              <Grid item sx={{ display: "flex", flexDirection: "column" }}>
                <Typography component="h1" variant="h5" mt={1} mb={1} >
                  About
                </Typography>
                <Typography component="h2" align="left" variant="body2" mb={1} sx={{ maxWidth: 280,overflowWrap:'anywhere' }}>

                  {data.about
                    ? data.about
                    : <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend arcu et sem elementum faucibus. Suspendisse commodo, orci eu mattis mattis,
                      ante ligula porta tortor, ut scelerisque massa risus a quam.</p>
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7} margin={2} >
              <Typography component="h1" variant="h4" mb={2}>
                Profile
              </Typography>
              <Typography component="h2" variant="h5" mb={1}>
                {/* Andrew Smith */}
                {data.userName}
              </Typography>
              <Typography component="h1" variant="body1" mb={1}>
                {/* User */}
                {data.role}
              </Typography>
              <Divider color="black" sx={{ marginBottom: 4, marginTop: 4 }} />
              <Grid container>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Id</Grid>
                  <Grid item xs={6}>{data.userId}</Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Email</Grid>
                  <Grid item xs={6}>
                    {/* Geno3337@gmail.com */}
                    {data.gmail}
                  </Grid>
                </Grid>
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Address</Grid>
                  <Grid item xs={6} sx={{overflowWrap:'anywhere'}}>
                  {data.address
                    ? data.address
                    : <p> 
                      {/* Londen,United Kingdo */}
                      null
                    </p>
                  }
                    
                    </Grid>
                </Grid>
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Phone</Grid>
                  <Grid item xs={6}>
                  {data.phone
                    ? data.phone
                    : <p>null</p>
                  }
                    </Grid>
                </Grid>
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Gender</Grid>
                  <Grid item xs={6}>
                  {data.gender
                    ? data.gender
                    : <p>null</p>
                  }
                    </Grid>
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ marginTop: 3, width: 100 }} className="EditBtn" href="editUserProfile" >Edit</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}