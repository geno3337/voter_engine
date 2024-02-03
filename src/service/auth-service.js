import axios from "axios";
import authHeader from "./auth-header"

const URL="http://localhost:8080/"

function createCanditate(requestParams){

    return(axios.post(URL+"createCandidate",requestParams,{headers: authHeader()}))

}

async function login(requestParams){

    const response = await (axios.post(URL+"common/authentication", requestParams));
    console.log(response.data.message)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const user = AuthService.getCurrentUser();
        console.log(user?.authorities?.includes('user'))
    }
    return (response.data);
}

function lagout(){

    localStorage.removeItem("user")
}

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("user"))
}

const forgetPassword=(email)=>{
    return(axios.post(URL+"common/forgetPassword/"+email))
}

const changePassword = (requestParams,token) => {
    return(axios.post(URL+"common/resetPassword"+token,requestParams))
}

const getUser=(page,size,sortId,sortType,key)=>{
    return(axios.get(URL+"user/getUser?page="+page+"&size="+size+"&sort="+sortId+","+sortType+"&key="+key,{headers: authHeader()}))
}

const getCandidateTable=(page,size,sortId,sortType,key)=>{
    return(axios.get(URL+"admin/getCandidate?page="+page+"&size="+size+"&sort="+sortId+","+sortType+"&key="+key,{headers: authHeader()}))
}

const getCandidateRequestTable=(page,size,sortId,sortType,key)=>{
    return(axios.get(URL+"admin/getCandidateList?page="+page+"&size="+size+"&sort="+sortId+","+sortType+"&key="+key,{headers: authHeader()}))
}

const getVoterListTable=(page,size,sortId,sortType,key)=>{
    return(axios.get(URL+"admin/getVoterList?page="+page+"&size="+size+"&sort="+sortId+","+sortType+"&key="+key,{headers: authHeader()}))
}

const getCandidate=(page,size,key)=>{
    return(axios.get(URL+"user/getCandidate?page="+page+"&size="+size+"&key="+key,{headers: authHeader()}))
}

const getEventDetails=()=>{
    return(axios.get(URL+"user/eventDetail",{headers: authHeader()}))
}

const getUserByEmail=(email)=>{
    return(axios.get(URL+"user/getUserByEmail/"+email,{headers: authHeader()}))
}

const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Important: Use multipart/form-data for file uploads
    },
  };

const editUser=(id,requestBody)=>{
    return(axios.post(URL+"user/editUser/"+id,requestBody,{headers: authHeader()}))
}

const adminEditUser=(id,requestBody)=>{
    return(axios.post(URL+"admin/editUser/"+id,requestBody,{headers: authHeader()}))
}

const adminEditVoter=(id,requestBody)=>{
    return(axios.post(URL+"admin/editVoter/"+id,requestBody,{headers: authHeader()}))
}

const adminEditCandidate=(id,requestBody)=>{
    return(axios.post(URL+"admin/editCandidate/"+id,requestBody,{headers: authHeader()}))
}

const adminEditCandidateList=(id,requestBody)=>{
    return(axios.post(URL+"admin/editCandidateList/"+id,requestBody,{headers: authHeader()}))
}

const uploadUserImage=(id,multipath)=>{
    return(axios.post(URL+"user/uploadUserImage/"+id,multipath,{headers: authHeader()}
    // ,{headers:
    //     {
    //     'Content-Type': 'multipart/form-data', // Important: Use multipart/form-data for file uploads
    //   }}
      ))
}

const deleteUserImage=(id,)=>{
    return(axios.get(URL+"user/deleteUserImage/"+id,{headers: authHeader()}))
}

const deleteAdminProfileImage=(id,)=>{
    return(axios.get(URL+"admin/deleteAdminProfileImage/"+id,{headers: authHeader()}))
}

const uploadCandidateImage=(id,multipath)=>{
    return(axios.post(URL+"user/uploadCandidateImage/"+id,multipath
    // ,{headers: {
    //     'Content-Type': 'multipart/form-data',
    //      // Important: Use multipart/form-data for file uploads
    //   }}
    ,{headers: authHeader()}
      ))
}
// const getAll=()=>{
//     return(axios.get(URL+"viewCandidate",{headers: authHeader()}));
// }

// const getById=()=>{
//     const response = await(axios.get(URL+"/view/",{header: authHeader()}));
    
// }

const getUserById=(id)=>{
    return(axios.get(URL+"admin/getUserById/"+id,{headers: authHeader()}))
}

const getVoterById=(id)=>{
    return(axios.get(URL+"admin/getVoterById/"+id,{headers: authHeader()}))
}

const getCandidateListById=(id)=>{
    return(axios.get(URL+"admin/getCandidateListById/"+id,{headers: authHeader()}))
}

const addVote=(id,voter_id)=>{
    return(axios.get(URL+"user/addVote/"+id+"?"+"voter_id="+voter_id
    ,{headers: authHeader()}
    ))
}

// const whichEvent=()=>{
//     return(axios.get(URL+"whichevent",{headers: authHeader()}))
// }

const winner=()=>{
    return(axios.get(URL+"admin/releaseWinner"
    ,{headers: authHeader()}
    ))
}


const startRegisteration=(requestBody)=>{
    return(axios.post(URL+"admin/startRegistration",requestBody,{headers: authHeader()}))
     
}

const startelection=(requestBody)=>{
    return(axios.post(URL+"admin/startElection",requestBody,{headers: authHeader()}))
     
}



const approval=(id)=>{
    return(axios.get(URL+"admin/approval/"+id
    ,{headers: authHeader()}
    ))
}

const deleteUserById=(id)=>{
    return(axios.get(URL+"admin/deleteUserById/"+id
    ,{headers:authHeader()}
    ))
}

const deleteCandidateById=(id)=>{
    return(axios.get(URL+"admin/deleteCandidateById/"+id
    ,{headers:authHeader()}
    ))
}

const deleteCandidateRequestById=(id)=>{
    return(axios.get(URL+"admin/deleteCandidateRequestById/"+id
    ,{headers:authHeader()}
    ))
}

const deleteVoterById=(id)=>{
    return(axios.get(URL+"admin/deleteVoterById/"+id
    ,{headers:authHeader()}
    ))
}

const CreateVoter=(requestParams)=>{
    return(axios.post(URL+"createVoter",requestParams,{headers:authHeader()}))
}



const getCandidateRequest=()=>{
    return(axios.get(URL+"getCandidateRequest",{headers:authHeader()}))
}

const sendMailToUserBYId =(id)=>{
    return(axios.get(URL+"admin/sendMailToUserById/"+id
    ,{headers:authHeader()}
    ))
}

const sendMailToUser =()=>{
    return(axios.get(URL+"admin/sendMailToUser"
    ,{headers:authHeader()}
    ))
}

const sendMailToVoter =() =>{
    return(axios.get(URL+"admin/sendMailToVoter"
    ,{headers:authHeader()}
    ))
}


const sendMailToVoterBYId =(id) =>{
    return(axios.get(URL+"admin/sendMailToVoterById/"+id
    ,{headers:authHeader()}
    ))
}

const getVoterList = () =>{
    return(axios.get(URL+"getVoterList",{headers:authHeader()}))
}

const addUser = (requestParams) => {
    return(axios.post(URL+"admin/addUser",requestParams
    ,{headers:authHeader()}
    ))
}
 const createCandidateRequest=(requestParams)=>{
    return(axios.post(URL+"user/cadidateApply",requestParams,{headers:authHeader()}))
 }
 
const viewDate=()=>{
    return(axios.get(URL+"viewDate",{headers:authHeader()}))
}

const maxVote=()=>{
    return(axios.get(URL+"user/maxVote",{headers:authHeader()}))
}

const releaseWinner=(page,size,key)=>{
    return(axios.get(URL+"user/releaseWinner?page="+page+"&size="+size+"&key="+key,{headers:authHeader()}))
}


const addVoter=(requestbody)=>{
    return(axios.post(URL+"admin/addVoter",requestbody,{headers:authHeader()}))
}

const adminChangePassword=(requestbody,gmail)=>{
    return(axios.post(URL+"admin/changePassword/"+gmail,requestbody,{headers:authHeader()}))
}

const AuthService = {
    // getAll,
    adminEditUser,
    getUserById,
    addVote,
    createCanditate,
    login,
    lagout,
    getCurrentUser,
    forgetPassword,
    changePassword,
    getCandidate,
    getEventDetails,
    getUserByEmail,
    editUser,
    uploadUserImage,
    uploadCandidateImage,
    getCandidateTable,
    getCandidateRequestTable,
    getVoterListTable,
    // whichEvent,
    winner,
    startRegisteration,
    startelection,
    approval,
    sendMailToVoter,
    sendMailToUser,
    getCandidateRequest,
    getUser,
    deleteCandidateById,
    deleteCandidateRequestById,
    deleteUserById,
    deleteVoterById,
    CreateVoter,
    getVoterList,
    addUser,
    createCandidateRequest,
    viewDate,
    maxVote,
    adminEditVoter,
    adminEditCandidate,
    sendMailToUserBYId,
    sendMailToVoterBYId,
    addVoter,
    getVoterById,
    getCandidateListById,
    adminEditCandidateList,
    releaseWinner,
    adminChangePassword,
    deleteUserImage,
    deleteAdminProfileImage,
}

export default AuthService;