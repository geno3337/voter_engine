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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditVoterModel from './EditVoterModel';
import AddVoterModel from './AddVoterModel';
import DeleteVoterModel from './DeleteVoterModel';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import EnhancedTableHead from '../userTable/EnhancedTableHead';
import EnhancedTableToolbar from '../userTable/EnhancedTableToolbar';
import CommonModel from '../model/model';


export default function VoterListTable(props) {


    const headCells = [
        {
            id: 'voter_id',
            // numeric: true,
            key: 'voter_id',
            disablePadding: false,
            label: 'Id',
        },
        {
            id: 'voter_name',
            // numeric: true,
            key: 'voter_name',
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'voter_age',
            // numeric: true,
            key: 'voter_age',
            disablePadding: false,
            label: 'Age',
        },
        {
            id: 'gmail',
            // numeric: true,
            key: 'gmail',
            disablePadding: false,
            label: 'Gmail',
        },
        
        {
            id: 'isVoted',
            // numeric: true,
            key: 'isVoted',
            disablePadding: false,
            label: 'isVoted',
        },
        {
            id: 'action',
            // numeric: true,
            key: 'action',
            disablePadding: false,
            label: 'Action',
        },
    ];

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [openAddVoterModel, setOpenAddVoterModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [key, setKey] = useState('')
    const [openEditModel, setOpenEditModel] = useState(false);
    const [editId, setEditId] = useState(0)
    const [submitResponse, setSubmitResponse] =useState()
    const [submitError, setSubmitError] = useState()
    const [backdrop, setBackDrop] = useState(false)
    const [openMaillToAllModel, setOpenMaillToAllModel] = useState(false)
    const [openMailByIdMode, setOpenMailByIdModel] = useState(false)

    useEffect(() => {
        getVoter()
    }, [page, rowsPerPage,key,submitResponse])

    const getVoter = async () => {
        await AuthService.getVoterListTable(page, rowsPerPage, orderBy, order, key).then(
            (response) => {
                console.log("response", response.data)
                setRows(response.data.content)
                setTotalPage(response.data.totalElements)
            }
        )

    }

    const DeleteVoter=()=>{
        setOpenDeleteModel(false)
        AuthService.deleteVoterById(selected).then(
             (response)=>{
                setSubmitResponse(response.data)
                console.log(response.data);
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
             }
        )
        setSelected([])
    }

    const sendMAilById = () => {
        setOpenMailByIdModel(false)
        setBackDrop(true)
        AuthService.sendMailToVoterBYId(selected).then(
            (response) => {
                setSubmitResponse(response.data)
                console.log(response.data);
                setBackDrop(false)
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
            }
        )
        setSelected([])
        // console.log("sel",selected);
    }

    const sendMAilToVoter = () => {
        setOpenMaillToAllModel(false)
        setBackDrop(true)
        AuthService.sendMailToVoter(selected).then(
            (response) => {
                setSubmitResponse(response.data)
                console.log(response.data);
                setBackDrop(false)
                setTimeout(() => {
                    setSubmitResponse();
                }, 5000);
            }
        )
        setSelected([])
        // console.log("sel",selected);
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
            const newSelected = rows.map((n) => n.voter_id);
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
                    <EnhancedTableToolbar heading={"VoterList"} numSelected={selected.length} 
                    onClick={(event) => handleSearch(event)} 
                    onDelete={() => { setOpenDeleteModel(true) }}
                    onSend={() => { setOpenMailByIdModel(true) }}
                    // approve={true}
                    />
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
                                    const isItemSelected = isSelected(row.voter_id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            // hover
                                            // onClick={(event) => handleClick(event, row.voter_id)}
                                            // role="checkbox"
                                            // aria-checked={isItemSelected}
                                            // tabIndex={-1}
                                            // key={row.voter_id}
                                            // selected={isItemSelected}
                                            // sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.voter_id)}
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
                                                // padding="none"
                                                // align='center'
                                            >
                                                {row.voter_id}
                                            </TableCell>
                                            <TableCell >{row.voter_name}</TableCell>
                                            <TableCell >{row.voter_age}</TableCell>
                                            <TableCell >{row.gmail}</TableCell>
                                            <TableCell >{row.isVoted==1?<CheckIcon/>:<ClearIcon/>}</TableCell>
                                            <TableCell ><IconButton onClick={()=>{
                                                setEditId(row?.voter_id)
                                                setOpenEditModel(true)
                                                console.log(row.voter_id);
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
                    <Box>
                        {/* <FilterListIcon /> */}
                        <Button variant="contained" onClick={() => {
                            setOpenAddVoterModel(true)
                        }}  >Add</Button>
                        <Button variant="contained" sx={{ ml: 1 }} size='medium' onClick={() => { setOpenMaillToAllModel(true) }}>send email to all</Button>
                    </Box>
                    {/* </IconButton> */}
                </Box>
            </Box>
            <AddVoterModel open={openAddVoterModel} onClose={() => { setOpenAddVoterModel(false) }} onfunc={()=>{getVoter()}} />
            <EditVoterModel open={openEditModel} onClose={()=>{setOpenEditModel(false)}} id={editId}/>
            <CommonModel
            open={openDeleteModel} 
            onClose={() => { setOpenDeleteModel(false)}}
            btn={'delete'}
            onfunc={()=>{DeleteVoter()}}
            >Do you want to delete the selected profile</CommonModel>
            <CommonModel
            open={openMailByIdMode} 
            onClose={() => { setOpenMailByIdModel(false)}}
            btn={'send'}
            onfunc={()=>{sendMAilById()}}
            >Do you want to send mail to the selected profile</CommonModel>
            <CommonModel
            open={openMaillToAllModel} 
            onClose={() => { setOpenMaillToAllModel(false)}}
            btn={'send'}
            onfunc={()=>{sendMAilToVoter()}}
            >Do you want to send mail to all</CommonModel>
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
