import UserTable from "../../components/adminPageComponents/userTable/userTable";
import TribleCard from "../../components/adminPageComponents/triplecard/triplecard";
// import UserTable from "../../components/adminPageComponents/userTable/userTable";
import ResponseAlert from "../../components/userPageComponents/responseAlert/responseAlert";

export default function Dashboard(){

    return(
        <>
         {/* <ResponseAlert/> */}
        <TribleCard/>
        <UserTable/>
        </>
    )
}