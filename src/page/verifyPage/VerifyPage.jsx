import React from "react";
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Margin } from "@mui/icons-material";


function EmailVerifyPage(){
    return(
        <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          marginTop:10
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: 'center'
              }}
            >
              <img
                alt="Under development"
                // src={require(`../../../public/assets/img/success.png`)}
                src="assets/img/success.png"
                style={{
                  display: 'inline-block',
                  maxWidth: '70%',
                  width: 400
                }}
              />
            </Box>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="h3"
            >
              You Email is verified
            </Typography>
            {/* <Button
              href="/"
              sx={{ mt: 3 }}
              variant="contained"
            >
              Sign In
            </Button> */}
          </Box>
        </Container>
      </Box>
    )
}
export default EmailVerifyPage