// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import { useEffect } from 'react';
// import Button from '@mui/material/Button';
// import "./table.css"
// import SearchBar from './searchBar';

// // const [rows,setRows]=React.useState()
// // const [headCells,setHeadCells]=React.useState()

// export default  function  EnhancedTable(props) {

// //   const [rows, setRows] = React.useState([])
//   const [headCells, setHeadCells] = React.useState([])

//  function getData() {

//     // setRows(props?.d)
//     setHeadCells(props?.headCells)
//     // console.log("p",props?.d);
//   }
//   // console.log("r=", rows)
//   console.log("props=", props.d, props.headCells)

//   useEffect(() => {
//     getData()
//   }, [])
//   // { console.log("stats", rows, headCells) }


//   function EnhancedTableHead(props) {
//     const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//       props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };

//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox">
//             <Checkbox
//               color="primary"
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={rowCount > 0 && numSelected === rowCount}
//               onChange={onSelectAllClick}
//               inputProps={{
//                 'aria-label': 'select all desserts',
//               }}
//             />
//           </TableCell>
//           {headCells?.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               // align={headCell.numeric ? 'right' : 'left'}
//               align='center'
//               padding={headCell.disablePadding ? 'none' : 'normal'}
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : 'asc'}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {console.log("headlabel",headCell.label)}
//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }

//   EnhancedTableHead.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
//     headCells:PropTypes.object.isRequired,
//   };

//   function EnhancedTableToolbar(props) {
//     const { numSelected } = props;

//     return (
//       <Toolbar
//         sx={{
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//           ...(numSelected > 0 && {
//             bgcolor: (theme) =>
//               alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//           }),
//         }}
//       >
//         {numSelected > 0 ? (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             color="inherit"
//             variant="subtitle1"
//             component="div"
//           >
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             variant="h6"
//             id="tableTitle"
//             component="div"
//           >
//             Nutrition
//           </Typography>

//         )}

//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <Box>
//               <SearchBar/>
//             </Box>
                
//           </Tooltip>
//         )}
//       </Toolbar>
//     );
//   }

//   EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//   };


//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);


//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//     console.log("sort=", order, orderBy)
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = props.d.map((n) => n.userId);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


//   return (
//     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 5 }}>
//       <Box sx={{ width: '100%' }}>
//         <Paper sx={{ width: '100%', mb: 2 }}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={dense ? 'small' : 'medium'}
//             >
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={props.d.length}
//               headCells={props.headCells}

//               />

//               <TableBody>
//                 {/* {props.headCells.map(()=>{ */}
//                 {props.d?.map((row, index) => {
//                   console.log("index",index);
//                   const isItemSelected = isSelected(row.userId);
//                   const labelId = `enhanced-table-checkbox-${index}`;
//                     return (
//                       <TableRow
//                         hover
//                         // onClick={(event) => handleClick(event, row.userId)}
//                         role="checkbox"
//                         aria-checked={isItemSelected}
//                         tabIndex={-1}
//                         key={row.userId}
//                         selected={isItemSelected}
//                         sx={{ cursor: 'pointer' }}
//                       >
                        
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                           //  onClick={(event) => handleClick(event, row.userId)}
//                             color="primary"
//                             checked={isItemSelected}
//                             inputProps={{
//                               'aria-labelledby': labelId,
//                             }}
//                           />
//                         </TableCell>
//                         {/* <TableCell
//                           component="th"
//                           id={labelId}
//                           scope="row"
//                           padding="none"
//                           align='center'
//                         >
//                           {row.userId}
//                         </TableCell> */}
//                         {props.headCells.map((column)=>{
//                           return(
//                             <TableCell align="center">
//                           {row[column.key]}{console.log("key",row[column.key])}
//                           {/* column */}
//                           </TableCell>
//                           )
//                         {/* <TableCell align="center">{row.userName}</TableCell>
//                         <TableCell align="center">{row.role}</TableCell> */}
//                         {/* <TableCell align="right">{row.protein}</TableCell> */}
//                         })}
//                       </TableRow>
//                     );
                  
                  
//                 })}
//                 {emptyRows > 0 && (
//                   <TableRow
//                     style={{
//                       height: (dense ? 33 : 53) * emptyRows,
//                     }}
//                   >
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={props.d.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <FormControlLabel
//             control={<Switch checked={dense} onChange={handleChangeDense} />}
//             label="Dense padding"
//           />
//           {/* <IconButton> */}
//           <Box>
//             {/* <FilterListIcon /> */}
//             <Button variant="contained" >Add</Button>
//             <Button variant="contained" sx={{ ml: 1 }} size='medium'>send email</Button>
//             </Box>
//           {/* </IconButton> */}
//         </Box>
//       </Box>
      
//     </Box>
//   );
// }
