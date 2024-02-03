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
import AuthService from "../../../service/auth-service";
import { useState, useEffect } from "react";
import AddUserModel from './AddUserModel';
import DeleteUserModel from './DeleteUserModel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import EditUserModel from './EditUserModel';
import ResponseAlert from "../../userPageComponents/responseAlert/responseAlert";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SendMailToUserById from './SendMailToUserById';
import SendMailToAllModel from './SendMailToAllModel';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'
import CommonModel from '../model/model';



export default function UserTable(props) {

    const headCells = [
        {
            id: 'userId',
            numeric: true,
            key: 'userId',
            disablePadding: false,
            label: 'UserId',
        },
        {
            id: 'gmail',
            numeric: false,
            key: 'gmail',
            disablePadding: false,
            label: 'Gmail',
        },
        {
            id: 'userName',
            numeric: false,
            key: 'userName',
            disablePadding: false,
            label: 'UserName',
        },
        {
            id: 'role',
            numeric: false,
            key: 'role',
            disablePadding: false,
            label: 'Role',
        },
        {
            id: 'action',
            numeric: false,
            key: 'action',
            disablePadding: false,
            label: 'Action',
        },
    ];

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('userId');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [openAddUserModel, setOpenAddUserModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [editId, setEditId] = useState(0)
    const [key, setKey] = useState('')
    const [submitResponse, setSubmitResponse] = useState()
    const [submitError, setSubmitError] = useState()
    const [openMaillToAllModel, setOpenMaillToAllModel] = useState(false)
    const [openMailByIdMode, setOpenMailByIdModel] = useState(false)
    const [backdrop, setBackDrop] = useState(false)

    useEffect(() => {
        getUser()
    }, [page, rowsPerPage, key, submitResponse])

    const getUser = async () => {
        await AuthService.getUser(page, rowsPerPage, orderBy, order, key).then(
            (response) => {
                console.log("response", response.data)
                setRows(response.data.content)
                setTotalPage(response.data.totalElements)
            }
        )

    }

    const DeleteUser = () => {
        AuthService.deleteUserById(selected).then(
            (response) => {
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
        setBackDrop(true)
        AuthService.sendMailToUserBYId(selected).then(
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

    const sendMAilToUser = () => {
        setBackDrop(true)
        AuthService.sendMailToUser(selected).then(
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
        getUser()
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.userId);
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
                    <EnhancedTableToolbar heading={"Users"} numSelected={selected.length} selected={selected}
                        onClick={(event) => handleSearch(event)}
                        onDelete={() => { setOpenDeleteModel(true) }}
                        onSend={() => { setOpenMailByIdModel(true) }}
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
                                    const isItemSelected = isSelected(row.userId);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <IconButton sx={{padding:0
                                                }}>
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.userId)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                // padding="none"
                                                // align='center'
                                            >
                                                {row.userId.toString()}
                                            </TableCell>
                                            <TableCell >{row.gmail}</TableCell>
                                            <TableCell >{row.userName}</TableCell>
                                            <TableCell >{row.role}</TableCell>
                                            <TableCell ><IconButton onClick={() => {
                                                setEditId(row.userId)
                                                setOpenEditModel(true)
                                                console.log(row.userId);
                                            }
                                            }><EditIcon /></IconButton></TableCell>
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
                            setOpenAddUserModel(true)
                        }}  >Add</Button>
                        <Button variant="contained" sx={{ ml: 1 }} size='medium' onClick={() => { setOpenMaillToAllModel(true) }}>send email to all</Button>
                    </Box>
                    {/* </IconButton> */}
                </Box>
            </Box>
            <AddUserModel open={openAddUserModel} onClose={() => { setOpenAddUserModel(false) }} onSubmit={() => { getUser() }} />
            {/* <DeleteUserModel open={openDeleteModel} onClose={() => { setOpenDeleteModel(false) }} onDelete={() => { DeleteUser() }} /> */}
            <EditUserModel open={openEditModel} onClose={() => { setOpenEditModel(false) }} userid={editId} />
            {/* <SendMailToUserById open={openMailByIdMode} onClose={() => {
                setOpenMailByIdModel(false)
            }} onSend={() => { sendMAilById()
                setOpenMailByIdModel(false) }}></SendMailToUserById>
            <SendMailToAllModel open={openMaillToAllModel} onClose={() => {
                setOpenMaillToAllModel(false)
            }} onSend={()=>{sendMAilToUser()
            setOpenMaillToAllModel(false)}}></SendMailToAllModel> */}
            <CommonModel open={openDeleteModel} onClose={() => { setOpenDeleteModel(false) }} btn={'Delete'} onfunc={() => {
                DeleteUser()
                setOpenDeleteModel(false)
            }}>Do you want to delete the selected users</CommonModel>
            <CommonModel open={openMailByIdMode} onClose={() => {
                setOpenMailByIdModel(false)
            }} onfunc={() => {
                sendMAilById()
                setOpenMailByIdModel(false)
            }}
                btn={'send'}
            >Do you want to send mail to the selected users</CommonModel>
            <CommonModel open={openMaillToAllModel} onClose={() => {
                setOpenMaillToAllModel(false)
            }} onfunc={() => {
                sendMAilToUser()
                setOpenMaillToAllModel(false)
            }}
                btn={'send'}
            >Do you want to send mail to all users</CommonModel>
            {
                submitResponse && <ResponseAlert
                    type="success"
                    handleClick={() => setSubmitResponse()}
                >
                    {submitResponse}
                </ResponseAlert>
            }
            {
                submitError && <ResponseAlert
                    type="error"
                    handleClick={() => setSubmitError()}
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
