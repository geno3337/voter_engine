import ProfileImageCard from "../../components/adminPageComponents/adminProfile/ProfileImageCard";
import ProfileTabs from "../../components/adminPageComponents/adminProfile/ProfileTaps";
import Box from '@mui/material/Box'
import { Grid, Paper, Typography } from "@mui/material";



export default function AdminProfilePage(){

    return(
        <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <Grid container 
  justifyContent="center" sx={{display:"flex",justifyContent:"center"}}>
                <Grid item mb={12} sx={{margin:0}}><ProfileImageCard /></Grid>
                <Grid item  mb={12}><ProfileTabs/></Grid>
                    {/* <Box>
                        <ProfileImageCard/>
                    </Box>
                    <Box>
                        <ProfileTabs/>
                    </Box> */}
                    </Grid>
                </Box>
    )
}