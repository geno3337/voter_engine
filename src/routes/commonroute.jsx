import React from "react";
import SignIn from "../page/signin/signin";
import UserPage from "../page/userPage/userPage";
import NotFound from "../page/404page/404page";
import LogoutPage from "../page/logoutpage/logoutpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../page/profilePage/profilePage";
import UserProfileEditPage from "../page/userProfileEditPage/UserProfileEditPage";
import ForgotPasswordPage from "../page/forgetPasswordPage/forgetPasswordPage";
import ChangePassword from "../page/changePassword/changePassword";
import RegistrationForm from "../components/userPageComponents/RegistrationForm/RegistrationForm";
import RegistrationPage from "../page/RegistrationPage/RegistrationPage";
import ResultPage from "../page/ResultPage/ResultPage";
import EmailVerifyPage from "../page/verifyPage/VerifyPage";
// import AvatarEditorComponent from "../components/avatarEditor/avatarEditor";
import AvatarEditorPop from "../components/avatarEditor/avatarEditorPop";
import Cropper from "../components/avatarEditor/copper";

const CommonRoutes = () => {
    return (
        <>
            <Routes>
                <Route>
                    <Route index element={<SignIn/>} />
                    <Route path="/home" element={<UserPage/>} />
                    <Route path="/notfound" element={<NotFound/>} />
                    <Route path="/logoutpage" element={<LogoutPage/>} />
                    <Route path="/userProfile" element={<ProfilePage/>}/>
                    <Route path="/editUserProfile" element={<UserProfileEditPage/>}/>
                    <Route path="/forgetPasswordPage" element={<ForgotPasswordPage/>}/>
                    <Route path="/changePassword" element={<ChangePassword/>} />
                    <Route path="/applicationForm" element={<RegistrationPage/>} />
                    <Route path="/resultPage" element={<ResultPage/>} />
                    <Route path="/emailVerify" element={<EmailVerifyPage/>} />
                    {/* <Route path="/avatarEditor" element={<AvatarEditorComponent/>} /> */}
                    <Route path="/avatarEditorPop" element={<Cropper/>} />
                </Route>
            </Routes>
        </>
    );
};
export default CommonRoutes;