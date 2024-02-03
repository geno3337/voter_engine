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

// const [rows,setRows]=React.useState()
// const [headCells,setHeadCells]=React.useState()


function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {/* {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : ( */}
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Candidate
                </Typography>

            {/* )} */}

            {/* {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={() => { console.log("selected", selected); }} />
                    </IconButton>
                </Tooltip>
            ) : ( */}
             <Tooltip title="Filter list">
                    <Box>
                        {/* <SearchBar search={(e)=>{setKey(e.target.value)}}/> */}
                        <TextField
                            id="search"
                            type="search"
                            label="Search"
                            size='small'
                            onChange={props.onClick}
                            // onChange={handleSearch}
                            // sx={{ width: 600 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{cursor:"pointer"}} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* <input onChange={props.onClick} ></input> */}
                    </Box>

                 </Tooltip>
            {/* )} */}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSearch: PropTypes.func.isRequired,
};




export default function CandidateTable(props) {


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
    ];

    const [rows, setRows] = React.useState([])
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState("id");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [openAddUserModel, setOpenAddUserModel] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [key, setKey] = useState('')

    useEffect(() => {
        getUser()
    }, [page, rowsPerPage,key])

    const getUser = async () => {
        await AuthService.getCandidateTable(page, rowsPerPage, orderBy, order, key).then(
            (response) => {
                console.log("response", response.data)
                setRows(response.data.content)
                setTotalPage(response.data.totalElements)
            }
        )

    }

    const handleSearch = (e) => {
        setKey(e.target.value)
        setPage(0)
        console.log("key", key)
    }

    function EnhancedTableHead(props) {
        const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {/* <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell> */}
                    {headCells?.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            // align={headCell.numeric ? 'right' : 'left'}
                            // align='center'
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            sx={{fontWeight:700}}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
        headCells: PropTypes.object.isRequired,
    };

   





    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log("sort=", order, orderBy)
        getUser()
    };

    // const handleSelectAllClick = (event) => {
    //     if (event.target.checked) {
    //         const newSelected = rows.map((n) => n.id);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }

    //     setSelected(newSelected);
    // };

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

    // const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalPage) : 0;


    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} onClick={(event) => handleSearch(event)} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                // numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                // onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}

                            />

                            <TableBody>
                                {rows?.map((row, index) => {
                                    // const isItemSelected = isSelected(row.id);
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

                                            {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell> */}
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                // padding="none"
                                                // align='center'
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell >{row.gmail}</TableCell>
                                            <TableCell >{row.name}</TableCell>
                                            <TableCell >{row.post}</TableCell>
                                            <TableCell >{row.place}</TableCell>
                                            <TableCell >{row.gender}</TableCell>
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
                        }}  >Add</Button> */}
                        {/* <Button variant="contained" sx={{ ml: 1 }} size='medium' onClick={() => { setOpenDeleteModel(true) }}>send email</Button> */}
                    {/* </Box> */}
                    {/* </IconButton> */}
                </Box>
            </Box>
            {/* <AddUserModel open={openAddUserModel} onClose={() => { setOpenAddUserModel(false) }} /> */}
            {/* <DeleteUserModel open={openDeleteModel} onClose={() => { setOpenDeleteModel(false) }} /> */}
        </Box>
    );
}
