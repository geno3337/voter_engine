import { Box, Grid, Paper, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useEffect, useState } from "react"
import AuthService from "../../../service/auth-service";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Copyright from "../copyright/copyright";


export default function ResultCard(props) {

    const [datas, setDatas] = useState([])
    const [maxVote,setMaxVote]=useState()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [key, setKey] = useState('')
    const [eventNo,setEventNo]=useState();

    useEffect(() => {
        lockResult()
        releaseResult()
        maxVotefunc()
    }, [page, rowsPerPage,key]
    )

    const releaseResult = () => {
        AuthService.releaseWinner(page,rowsPerPage, key).then(
            (response) => {
                console.log(response.data);
                setDatas(response?.data?.content)
                setTotalPage(response.data.totalPages)
            }
        )
    }

    const lockResult=()=>{
        AuthService.getEventDetails().then(
            (response)=>{
                console.log("Eno",response.data);
                setEventNo(response?.data?.status) 
            }
        )
    }

    const maxVotefunc=()=>{
        // if (eventNo=="3"){
        AuthService.maxVote().then(
            (response)=>{
                console.log("maxvote",response?.data);
                setMaxVote(response?.data)
            }
        )
        // }
    }

    const handleSearch = (e) => {
        setKey(e.target.value)
        setPage(0)
        console.log("key", key)
    }
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage-1);
    };

    return (
        <>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <Box  sx={{marginTop:12,display:"flex",justifyContent:"center",width:600}}>
                        {/* <SearchBar search={(e)=>{setKey(e.target.value)}}/> */}
                        <TextField
                        // sx={{width:40}}
                            id="resultSearch"
                            type="search"
                            label="Search"
                            size='small'
                            onChange={handleSearch}
                            sx={{ width: 400 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* <input onChange={props.onClick} ></input> */}
                    </Box>
                    {eventNo=="3"?
            <Box sx={{ display: "flex",
             alignItems: "center", 
            justifyContent: "center",
            flexWrap:"wrap",
             marginTop: 4,flexDirection:"row",marginBottom:2 }}>
              {datas?.map((data) => {
                return (<Paper sx={{ p: 2, margin: 2, maxWidth: 450 }} elevation={16}>
                    <Grid container spacing={{ xs: 1, sm: 3, md: 3 }}>
                        <Grid item xs={4} sm={4} md={4} >
                            <CardMedia component="img" sx={{ borderRadius: 30 }} image={data?.profileImage || "assets/img/team/team-1.jpg"} alt="Paella dish" />
                        </Grid>
                        <Grid item xs={7} sm={7} md={7} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }} >
                        <Typography component="h1" variant="h5" textAlign={"left"}>
                                {/* Andrew Smith */}Id:
                                {data?.id}
                            </Typography>
                            <Typography component="h1" variant="h5" textAlign={"left"}>
                                {/* Andrew Smith */}Name:
                                {data?.name}
                            </Typography>
                            <Typography component="h1" variant="h6">Votes:
                                {/* 1201 */}
                                {data?.vote}
                            </Typography>
                            <ProgressBar now={Math.floor((data?.vote/maxVote)*100)} variant="success" label={`${Math.floor((data?.vote/maxVote)*100)}%`} />
                        </Grid>
                    </Grid>
                </Paper>)
            })}
            </Box>
              :
              <Typography variant="h2" margin={3}>Result is not released</Typography>}  
        </Box>
        <div className='pagination'>
      <Pagination 
      count={totalPage}
        page={page}
        onChange={handleChangePage} size="large" />
    </div>
    <div className='copyright'>
      <Copyright />
    </div>
        </>
    )
}