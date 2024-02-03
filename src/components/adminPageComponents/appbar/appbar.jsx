import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NavProfile from "./NavProfile";
import { Box, Tooltip } from "@mui/material";
// import AuthService from "../../../service/auth-service";
// import { useNavigate } from "react-router-dom";
import PortraitIcon from '@mui/icons-material/Portrait';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ListItemButton from '@mui/material/ListItemButton';
import "./appbar.css"
import AuthService from "../../../service/auth-service";

const drawerWidth = 240;

const settings = [
    {
        Name: 'Profile',
        icon: <PortraitIcon />,
        link: "adminProfile"
    },
    {
        Name: 'Logout',
        icon: <LogoutIcon />,
        link: "logoutpage"
    }];
export default function TitleBar() {

    let navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    //   let navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElUser(null);
    };

    useEffect(
        ()=>{
           getProfileImage()
        //    getUserByEmail()
        },[]
    )

    const [gmail,setGmail]=useState()
    const [user,setUSer]=useState()

    const getProfileImage=()=>{
        const user = AuthService.getCurrentUser();
        console.log(user?.email)
        AuthService.getUserByEmail(user?.email).then(
            (response)=>{
                console.log("user",response?.data);
                setUSer(response?.data)
            }
        )
    }

    const handleLogOut = () => {
        AuthService.lagout()
        navigate('/logoutpage');
              window.location.reload();
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                color: "white"
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    VoterEngine
                </Typography>
                {/* <IconButton
                        // onClick={handleOpenUserMenu} 
                        edge="end"
                        sx={{ p: 0, margin: 'auto', marginRight: 1 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton> */}
                {auth && (
                    <div>
                        {/* <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem  onClick={handleLogOut}>Log out</MenuItem>
                        </Menu> */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user?.profileImage} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleClose}
                            >
                                {/* {settings.map((setting) => ( */}
                                    <MenuItem key={"Profile"} onClick={handleClose} >
                                        <ListItemButton href={"adminProfile"}>
                                        {/* {setting.icon} */}
                                        <PortraitIcon />,
                                        <Typography textAlign="center" sx={{ marginRight: 2, marginLeft: 1 }} >Profile</Typography>
                                        </ListItemButton>
                                    </MenuItem>
                                    <MenuItem key={"logout"} onClick={handleLogOut} >
                                    <ListItemButton>
                                    {/* {setting.icon} */}
                                    <LogoutIcon />
                                    <Typography textAlign="center" sx={{ marginRight: 2, marginLeft: 1 }} >Logout</Typography>
                                    </ListItemButton>
                                </MenuItem>
                                {/* ))} */}
                            </Menu>
                        </Box>
                    </div>
                )}
            </Toolbar>
        </AppBar>

    )
}