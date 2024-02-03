import React from "react";
// import AdminPage from "../pages/adminpage/adminpage";
// import SignIn from "../pages/signin/signin";
// import ApplicationForm from "../pages/applicationform/applicationform";
// import UserPage from "../pages/userpage/userpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserTable from "../component/adminpagecomponent/table/usertable/usertable";
// import AdminLayout from "../layout/Layout";
// import Sidebar from "../component/adminpagecomponent/sidebar/sidebar";
// import TitleBar from "../component/adminpagecomponent/appbar/appbar";
// import Canditatetable from "../component/adminpagecomponent/table/canditatetable/canditatetable";
// import CandidateRequestTable from "../component/adminpagecomponent/table/canditateRequestTable/candidateRequestTable";
// import User from "../component/adminpagecomponent/table/usertable";
// import CandidateRequest from "../component/adminpagecomponent/table/canditateRequestTable/candidateRequest";
// import Candidate from "../component/adminpagecomponent/table/canditatetable/candidate";
// import VoterList from "../component/adminpagecomponent/table/voterListTable";
import RequireAuth from "../utils/Authutil";
import NewLayout from "../components/adminPageComponents/AdminNavBar/newLayout";
import Dashboard from "../page/dashboard/dashboard";
import AdminLayout from "../layout/Layout";
// import UserTable from "../components/adminPageComponents/userTable/userTable";
import TribleCard from "../components/adminPageComponents/triplecard/triplecard";
import AdminProfile from "../components/adminPageComponents/adminProfile/adminProfile";
import AdminProfilePage from "../page/adminProfilePage/adminProfilePage";
import UserTable from "../components/adminPageComponents/userTable/userTable";
import CandidateTable from "../components/adminPageComponents/candidateTable/candidateTable";
import CandidateListTable from "../components/adminPageComponents/candidateListTable/CandidateListTable";
import VoterListTable from "../components/adminPageComponents/voterListTable/VoterListTable";
// import AdminLayout from "../layout/Layout";


function AdminRoute() {
    return (
        <Routes>
            <Route>
                <Route exact path="adminlayout" element={<RequireAuth><AdminLayout/></RequireAuth>}
                // <RequireAuth>
                    
                    // <AdminLayout/>
                    // </RequireAuth>
                    // }
                >
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="user" element={<UserTable/>} />
                    <Route path="candidate" element={<CandidateTable/>} />
                    <Route path="CandidateRequest" element={<CandidateListTable/>} />
                    <Route path="VoterList" element={<VoterListTable/>} />
                    <Route path="adminProfile" element={<AdminProfilePage/>} />
                </Route>

                {/* <Route path="admin" element={<AdminPage />} />
                <Route path="applicationform" element={<ApplicationForm />} /> */}
                {/* <Route path="user" element={<UserTable />} /> */}
                {/* <Route path="Signin" element={<SignIn />} /> */}
                {/* <Route path='adminlayout' element={<AdminLayout/>}/> */}
                {/* <Route path='Sidebar' element={<Sidebar />} />
                <Route path='appbar' element={<TitleBar />} /> */}

            </Route>
        </Routes>
    )
}
export default AdminRoute;