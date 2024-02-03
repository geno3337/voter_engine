import Header from '../../components/userPageComponents/header/header';
import HeroSection from '../../components/userPageComponents/heroSection/heroSection';
import SearchBox from '../../components/userPageComponents/search Box/searchBox';
import Card from '../../components/userPageComponents/card/card';
import Pagination from '@mui/material/Pagination';
import Copyright from '../../components/userPageComponents/copyright/copyright.jsx'
import "./userpage.css"
import { deepOrange } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors'
import { useState,useEffect } from 'react';
import AuthService from '../../service/auth-service';



export default function UserPage() {

  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [key, setKey] = useState('')

  useEffect(() => {
      getCandidate()
  }, [page, rowsPerPage,key])

  const getCandidate = async () => {
      await AuthService.getCandidate(page,rowsPerPage, key).then(
          (response) => {
              console.log("response", response.data)
              setRows(response.data.content)
              setTotalPage(response.data.totalPages)
          }
      )

  }

  const handleSearch = (e) => {
      setKey(e.target.value)
      setPage(0)
      console.log("key", key)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  return (<>
    <Header />
    <HeroSection />
    <SearchBox onClick={handleSearch}/>
    <Card data={rows} />
    <div className='pagination'>
      <Pagination 
      count={totalPage}
        page={page}
        onChange={handleChangePage} size="large" />
    </div>
    <div className='copyright'>
      <Copyright />
    </div>
  </>)
}