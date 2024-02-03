import AdminNavBar from "./AdminNavBar"
import SideBar from "./sideBar"
import { useState } from "react"
import "./AdminNavBar.css"
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import AdminProfile from "../adminProfile/adminProfile";
import UserTable from "../userTable/userTable";
import TribleCard from "../triplecard/triplecard";




export default function NewLayout(props) {

    const [showMobileNav, setShowMobileNav] = useState(false)

    function handleClick() {
        console.log('Function ran in Child component');
        setShowMobileNav(!showMobileNav)
      }

    return (
        <div className={`  ${showMobileNav && 'toggle-sidebar'}`}>
            <AdminNavBar handleClick={handleClick} />
            <SideBar />
            {/* <main id="main" class="main">
                <Outlet/>
             </main>    */}
               <Box
               id="main"
               className="main"
                component="main"
                // className="adminLayoutbg"
                sx={{
                    // backgroundColor: (theme) =>
                    //     theme.palette.mode === 'light'
                    //         ? theme.palette.grey[100]
                    //         : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {/* <AdminProfile/> */}
                <Outlet/>
                {/* <UserTable/> */}
                {/* < */}
            </Box>
        </div>
    )
}