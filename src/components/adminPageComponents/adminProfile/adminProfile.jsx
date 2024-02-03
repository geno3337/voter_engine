import { Box, Paper } from "@mui/material"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AuthService from "../../../service/auth-service";
import { useState,useEffect } from "react";




export default function AdminProfile(){

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

    return(
        <>
        <Box sx={{ maxWidth: 700}}>
            <Typography component="h5" variant="h5" mt={1} mb={3} >
                  About
                </Typography>
                <Typography component="p"  variant="body1" mb={3}>
                  
                {data?.about
                    ? data?.about
                    : <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend arcu et sem elementum faucibus. Suspendisse commodo, orci eu mattis mattis,
                      ante ligula porta tortor, ut scelerisque massa risus a quam.</p>
                  }
                </Typography>
            {/* <Grid item xs={12} sm={6} md={7}  > */}
            <Typography component="h1" variant="h5" mt={1} mb={2} >Personal Details </Typography>
              <Grid container>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Id</Grid>
                  <Grid item xs={6}>{data.userId}</Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Name</Grid>
                  <Grid item xs={6}>
                    {/* Kevin Anderson */}
                    {data.userName}
                  </Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Role</Grid>
                  <Grid item xs={6}>
                    {/* Admin */}
                    {data.role}
                    </Grid>
                </Grid>
                <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Email</Grid>
                  <Grid item xs={6}>
                    {/* Geno3337@gmail.com */}
                    {data.gmail}
                    </Grid>
                </Grid>
                {/* <Grid container direction="row" mb={2}>
                  <Grid item xs={4}>Country</Grid>
                  <Grid item xs={6}>USA</Grid>
                </Grid> */}
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Adress</Grid>
                  <Grid item xs={6}>
                    {/* Londen,United Kingdom */}
                    {data.address
                    ? data.address
                    : <> 
                      null
                    </>
                  }
                    </Grid>
                </Grid>
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Phone</Grid>
                  <Grid item xs={6}>
                    {/* 9360810234 */}
                    {data.phone
                    ? data.phone
                    : <>null</>
                  }
                    </Grid>
                </Grid>
                <Grid item container direction="row" mb={2}>
                  <Grid item xs={4}>Gender</Grid>
                  <Grid item xs={6}>
                    {/* male */}
                    {data.gender
                    ? data.gender
                    : <>null</>
                  }
                  </Grid>
                </Grid>
              </Grid>
              {/* <Button variant="contained" sx={{ marginTop: 3, width: 100}} className="EditBtn" >Edit</Button> */}
            {/* </Grid> */}
        </Box>
        </>
    )
}