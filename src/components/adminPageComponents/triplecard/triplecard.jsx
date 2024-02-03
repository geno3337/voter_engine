import React from "react";
import Card1 from "../cards/card1/card1.jsx";
import Card2 from "../cards/card2/card2.jsx";
import Card3 from "../cards/card3/card3.jsx";
// import "./adminpage.css";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import { Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';




export default function TribleCard(){

    return(
        <Box sx={{margin:2}}>
        <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    justifyContent:"space-around",
                                    height: 240,
                                }}
                            >
                                <Card1/>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    justifyContent:"space-around",
                                    height: 240,
                                }}
                            >
                                <Card2/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    justifyContent:"space-around",
                                    height: 240,
                                }}
                            >
                                <Card3/>
                            </Paper>
                        </Grid>
                        </Grid>
                        </Box>
    )
}