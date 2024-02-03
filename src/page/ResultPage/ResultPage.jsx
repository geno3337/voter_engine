import { useEffect, useState } from "react"
import Header from "../../components/userPageComponents/header/header"
import ResultCard from "../../components/userPageComponents/resultCard/resultCard"
import AuthService from "../../service/auth-service"

export default function ResultPage(){

    // const [datas,setDatas]=useState([])

    // useEffect(()=>{
    //     releaseResult()
    // },[]
    // )

    // const releaseResult=()=>{
    //     AuthService.releaseWinner().then(
    //         (response)=>{
    //             console.log(response.data);
    //             setDatas(response.data.content)
    //         }
    //     )
    // }

    return(
        <>
        <Header/>
       <ResultCard/>
        </>
    )
}