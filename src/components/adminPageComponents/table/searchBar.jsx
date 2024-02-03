import * as React from 'react';
import "./searchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { TextFields } from '@mui/icons-material';

export default function SearchBar(props) {
    return (
       <>
        <div className="search-bar">
      <form className="search-form d-flex align-items-center">
        <input type="text" name="query" placeholder="Search" title="Enter search keyword" onChange={props.search}/>
        {/* <TextFields type="text" name="query" placeholder="Search"  onChange={props.search}/> */}
        <IconButton type="submit" title="Search"><SearchIcon/></IconButton>
      </form>
    </div>
       </>
    );
}