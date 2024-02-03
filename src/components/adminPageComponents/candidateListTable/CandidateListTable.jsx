import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import SearchBar from '../table/searchBar';
import AuthService from "../../../service/auth-service";
import { useState, useEffect } from "react";
import AddUserModel from '../userTable/AddUserModel';
import DeleteUserModel from '../userTable/DeleteUserModel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import EnhancedTableHead from '../userTable/EnhancedTableHead';
import EnhancedTableToolbar from '../userTable/EnhancedTableToolbar';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditCandidateReqModel from './EditCandidateReqModel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteCandidateReqModel from './DeleteCandidateReqModel';
import CommonModel from '../model/model';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";


export default function CandidateListTable(props) {


    const headCells = [
        {
            id: 'Id',
            // numeric: true,
            key: 'Id',
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'gmail',
            // numeric: true,
            key: 'gmail',
            disablePadding: false,
            label: 'Gmail',
        },
        {
            id: 'Name',
            // numeric: true,
            key: 'Name',
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'Post',
            // numeric: true,
            key: 'Post',
            disablePadding: false,
            label: 'Post',
        },
        {
            id: 'Place',
            // numeric: true,
            key: 'Place',
            disablePadding: false,
            label: 'Place',
        },
        {
            id: 'gender',
            // numeric: true,
            key: 'gender',
            disablePadding: false,
            label: 'gender',
        },
        {
            id: 'isEmailVerified',
            // numeric: true,
            key: 'isEmailVerified',
            disablePadding: false,
            label: 'IsEmailVerified',
        },
        {
            id: 'Action',
            // numeric: true,
            key: 'Action',
            disablePadding: false,
            label: 'Action',
        },
        
    ];

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPage, setTotalPage] = useState(0);
    // const [openAddUserModel, setOpenAddUserModel] = useState(false);
    const [openApporelModel,setOpenApporelModel]=useState()
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [key, setKey] = useState('')
    const [openEditModel, setOpenEditModel] = useState(false);
    const [editId, setEditId] = useState(0)
    const [submitResponse, setSubmitResponse] =useState()
    const [submitError, setSubmitError] = useState()
    const [backdrop, setBackDrop] = useState(false)

    useEffect(() => {
        getCandidateReq()
    }, [page, rowsPerPage,key,submitResponse])

    const getCandidateReq = async () => {
        await AuthService.getCandidateRequestTable(page, rowsPerPage, orderBy, order, key).then(
            (response) => {
                console.log("response", response.data)
                setRows(response.data.content)
                setTotalPage(response.data.totalElements)
            }
        )

    }

    const DeleteCandidateReq=()=>{
        setOpenDeleteModel(false)
        setBackDrop(false)
        AuthService.deleteCandidateRequestById(selected).then(
             (response)=>{
                setSubmitResponse(response.data)
                console.log(response.data);
                setBackDrop(false)
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
             }
        )
        setSelected([])
    }

    const Approve=()=>{
        setOpenApporelModel(false)
        AuthService.approval(selected).then(
             (response)=>{
                setSubmitResponse(response.data)
                console.log(response.data);
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
             }
        ).catch((err) => {
            // console.log(err.code);
            //   err?.response?.data?.violations.forEach((error) => {
            //     setError(error.fieldName, {
            //       type: 'manual',
            //       message: error.message,
            //     });
            //   });
              // console.log("error: ", err.response?.data?.message);
              // setSubmitError(err.response?.data?.message)
              console.log("error: ", err.response.data.message);
        //       let updatedValue = {};
        //  updatedValue = {color:"red",message:err.response.data.message};
        //         setResponse(updatedValue)
        //         console.log(updatedValue)
        setSubmitError(err.response.data.message)
                setTimeout(() => {
                  setSubmitError()
                }, 5000); 
            }
          // }
          )
        setSelected([])
    }

    const handleSearch = (e) => {
        setKey(e.target.value)
        setPage(0)
        console.log("key", key)
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log("sort=", order, orderBy)
        // getUser()
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log(rowsPerPage, page);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalPage) : 0;


    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} 
                    approve={true} heading={'Candidate Request'}
                    onDelete={() => { setOpenDeleteModel(true) }}
                    onSend={() => { setOpenApporelModel(true) }}
                     onClick={(event) => handleSearch(event)} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}

                            />

                            <TableBody>
                                {rows?.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            // hover
                                            // onClick={(event) => handleClick(event, row.id)}
                                            // role="checkbox"
                                            // aria-checked={isItemSelected}
                                            // tabIndex={-1}
                                            // key={row.id}
                                            // selected={isItemSelected}
                                            // sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                 onClick={(event) => handleClick(event, row.id)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell >{row.gmail}</TableCell>
                                            <TableCell >{row.name}</TableCell>
                                            <TableCell >{row.post}</TableCell>
                                            <TableCell >{row.place}</TableCell>
                                            <TableCell >{row.gender}</TableCell>
                                            <TableCell >{row.emailVerified?<CheckIcon/>:<ClearIcon/>}</TableCell>
                                            <TableCell ><IconButton onClick={()=>{
                                                setEditId(row.id)
                                                setOpenEditModel(true)
                                                console.log(row.id);
                                            }
                                              }><EditIcon/></IconButton></TableCell>
                                        </TableRow>
                                    );


                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalPage}
                        // count={7}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Dense padding"
                    />
                    {/* <IconButton> */}
                    {/* <Box> */}
                        {/* <FilterListIcon /> */}
                        {/* <Button variant="contained" onClick={() => {
                            setOpenAddUserModel(true)
                        }}  >Add</Button>
                        <Button variant="contained" sx={{ ml: 1 }} size='medium' onClick={() => { setOpenDeleteModel(true) }}>send email</Button>
                    </Box> */}
                    {/* </IconButton> */}
                </Box>
            </Box>
            {/* <AddUserModel open={openAddUserModel} onClose={() => { setOpenAddUserModel(false) }} /> */}
            {/* <DeleteUserModel open={openDeleteModel} onClose={() => { setOpenDeleteModel(false) }} /> */}
            <EditCandidateReqModel open={openEditModel} onClose={()=>{setOpenEditModel(false)}} id={editId}></EditCandidateReqModel>
            <CommonModel 
            btn='Delete'
            open={openDeleteModel}
             onClose={() => { setOpenDeleteModel(false) }}
             onfunc={()=>{DeleteCandidateReq()}}
             >Do you want to delete the selecte ptrofile</CommonModel>
            <CommonModel
            open={openApporelModel} 
            onClose={() => { setOpenApporelModel(false)}}
            btn={'approve'}
            onfunc={()=>{Approve()}}
            >Do you want to verify the selected profile</CommonModel>
            {
              submitResponse && <ResponseAlert 
              type="success"
              handleClick={()=>setSubmitResponse()} 
              >
                {submitResponse}
              </ResponseAlert>
            }
            {
              submitError && <ResponseAlert 
              type="error"
              handleClick={()=>setSubmitError()} 
              >
                {submitError}
              </ResponseAlert>
            }
             <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        // onClick={()=>{setBackDrop(false)}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </Box>
    );
}
