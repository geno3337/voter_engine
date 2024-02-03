import React, { useState } from "react";
// import "./header.css"
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import AuthService from "../../service/auth-service";
import { useEffect } from "react";
import CountdownTimer from "../../userPageComponents/countdowntimer/CountDownTimer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AuthService from "../../../service/auth-service";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


var date = new Date('07-30-23'); // some mock date
var milliseconds = date.getTime();

const dateTimeAfterThreeDays = milliseconds;

export default function HeroSection() {

  const [detail, setDetail] = useState([])
  const [eventNo, setEventNo] = useState("0");


  // useEffect(() => {
  //   getEventDetails()
  //   // handeleEventNo()
  // },[detail])

  useEffect(()=>{
    getEventDetails();
  },[])

  const getEventDetails = async() => {
    await AuthService.getEventDetails().then(
      (response) => {
        console.log("eventDetail", response.data)
        setDetail(response.data)
        const registrationStartDate = new Date(response?.data?.registrationStartDate);
        const electionStartDate = new Date(response?.data?.electionStartDate);
        const currentDate = new Date()
     
        console.log("c",removeTimeFromDate(registrationStartDate).getTime >= removeTimeFromDate(currentDate).getTime);
       
        if (
          removeTimeFromDate(registrationStartDate).getTime >= removeTimeFromDate(currentDate).getTime &&
          response?.data?.status == "1") {
          setEventNo("1")
        }
        if (
          removeTimeFromDate(electionStartDate).getTime >= removeTimeFromDate(currentDate).getTime &&
          response?.data?.status == "2") {
          setEventNo("2")
        }
        if (response?.data?.status == "3") {
          setEventNo("3")
        }
      }
    )
  }

  function removeTimeFromDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  const convertDateToMillisec = (date) => {
    var date = new Date(date); // some mock date
    var milliseconds = date.getTime();
    const dateInMilliSec = milliseconds;
    return dateInMilliSec;
  }

  return (
    <section id="hero" class="d-flex align-items-center">

      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <TabPanel value={parseInt(eventNo)} index={0}>
              <h1>Online Election </h1>
              <h2>This voting system can be used for casting votes during elections. In this system, the voter does not have to go to the polling booth to cast their vote.</h2>
              <div>
                {/* <a href="#about" class="btn-get-started scrollto">Get Started</a> */}
              </div>
            </TabPanel>
            <TabPanel value={parseInt(eventNo)} index={1}>
              <h1>candidate Registeration is open now</h1>
              <h2>Registeration going to end in</h2>
              <CountdownTimer targetDate={convertDateToMillisec(detail?.registrationEndDate)} />
              <div>
                <a href="applicationForm" class="btn-get-started scrollto">Register</a>
              </div>
            </TabPanel>
            <TabPanel value={parseInt(eventNo)} index={2}>
              <h1>Vote For Your Favourite Person</h1>
              <h2>Election going to be ended in </h2>
              <CountdownTimer targetDate={convertDateToMillisec(detail?.electionEndDate)} />
            </TabPanel>
            <TabPanel value={parseInt(eventNo)} index={3}>
              <h1>The Election Result  is release</h1>
              <h2>To view the result click the below button </h2>
              <div>
                <a href="resultPage" class="btn-get-started scrollto">Result</a>
              </div>
            </TabPanel>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img">
            <img src="assets/img/My project.png" class="img-fluid animated" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}