import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const drawerWidth = 240;

export default function Sidebar(props){

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                {/* <Typography variant="h6" noWrap component="div">
                    VoterEngine
                </Typography> */}
            </Toolbar>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"

            >
                <ListItemButton href='dashboard'>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton href='candidate'>
                    <ListItemIcon>
                        <BadgeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Canditates" />
                </ListItemButton>
                <ListItemButton href='user'>
                    <ListItemIcon>
                        <PermIdentityIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton href='candidateRequest'>
                    <ListItemIcon>
                        <GroupAddIcon/>
                    </ListItemIcon>
                    <ListItemText primary="CandidateRequest" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <AutoStoriesIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Pages" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* <ListItemButton sx={{ pl: 4 }} href='/signin'>
                            <ListItemIcon>
                                <LoginIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Login"  />
                        </ListItemButton > */}
                        <ListItemButton sx={{ pl: 4 }} href='/home'>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="UserPage" />
                        </ListItemButton >
                        <ListItemButton sx={{ pl: 4 }} href='/applicationform'>
                            <ListItemIcon>
                                <HowToRegIcon/>
                            </ListItemIcon>
                            <ListItemText primary="ApplicationForm" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton href='VoterList'>
                    <ListItemIcon>
                        <HowToRegIcon/>
                    </ListItemIcon>
                    <ListItemText primary="VoterList" />
                </ListItemButton>
                
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <Box>
             <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
        </Box>
    )
}