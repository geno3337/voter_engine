import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import FactCheckIcon from '@mui/icons-material/FactCheck';

export default function EnhancedTableToolbar(props) {
    const { numSelected,selected,onDelete,onSend } = props;

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
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {props.heading}
                </Typography>

            )}

            {numSelected > 0 ? (
                <Box sx={{display:"flex",marginRight:2}}>
                 <Tooltip title="Delete" >
                 <IconButton onClick={
                    // setOpenDeleteModel(true)
                   props.onDelete}>
                     <DeleteIcon  />
                 </IconButton>
                 </Tooltip>
                 
                 {props?.approve?
                 <Tooltip title="approve">
                 <IconButton onClick={onSend}>
                     <FactCheckIcon/>
                 </IconButton>
                 </Tooltip>:
                 <Tooltip title="sendMail">
                 <IconButton onClick={onSend}>
                     <ForwardToInboxIcon/>
                 </IconButton>
                 </Tooltip>
                 }
                 </Box>
             
            ) : (
                // <Tooltip title="Filter list">
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

                // </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSearch: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    selected:PropTypes.array.isRequired
};