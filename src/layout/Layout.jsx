import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from "../components/adminPageComponents/sidebar/sidebar.jsx";
import TitleBar from "../components/adminPageComponents/appbar/appbar.jsx";
import { Outlet } from "react-router";



const drawerWidth = 240;


export default function AdminLayout(props) {



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TitleBar />
            <Sidebar />

            <Box
                component="main"
                className="adminLayoutbg"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    paddingTop:9,
                }}
            >
                <Outlet/>
            </Box>
        </Box>
    )
}