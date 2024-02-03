import { useState } from 'react';
import './card.css'
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/system';
import ManifestoModel from './manifestoModel';
import AddVoteModel from './addVoteModel';
import ResponseAlert from '../responseAlert/responseAlert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';




export default function VoteCard(props) {

  const [showManifesto, setShowManifesto] = useState(false);
  const [showVoteModel, setShowVoteModel] = useState(false);
  const [submitResponse, setSubmitResponse] = useState("")
  const [manifesto,setManifesto]=useState("")
  const [id,setId]=useState()

  // console.log("props:", props.data)
  return (
    <>
    <ManifestoModel
                      manifesto={manifesto}
                      show={showManifesto}
                      onHide={() => setShowManifesto(false)}
                    />
                    <AddVoteModel
                    id={id}
                      open={showVoteModel}
                      onClose={() => setShowVoteModel(false)}
                    />
      <section id="team" class="team" >

        <div class="container" >

          {/* <div class="section-title">
            <p>Candidates</p>
          </div> */}

          <div class="row" style={{justifyContent:'center'}}>
            {props.data?.map((row) => (
              <div key={row.id} class="row col-lg-4 col-md-6 d-flex align-items-stretch justify-content-center ">
                <div class="member">
                  {console.log(row.profileImage)}
                  <img 
                  // src="assets/img/team/team-1.jpg" 
                  src={row.profileImage || "assets/img/team/team-1.jpg"}
                  alt={`Profile Image of ${row.name}`}
                   />
                   {/* <Avatar
                   sx={{ width: 56, height: 56 }} 
                   src={row.profileImage || "assets/img/team/team-1.jpg"}
                  alt={`Profile Image of ${row.name}`} sizes=''/> */}
                  <h4>
                    {/* Walter White */}
                    {row.name}
                  </h4>
                  <h6>Run To Be : <span>
                    {/* President */}
                    {row.post}
                  </span></h6>
                  <p>
                    {/* Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut */}
                    {row.detail}
                  </p>
                  <div className='cardBtn'>
                    <Button variant="contained" size="medium" className="manifestobtn" onClick={() => {setShowManifesto(!showManifesto)
                    setManifesto(row?.manifesto)}}  > View Manifesto </Button>
                    <Button variant="contained" size="medium" className="voteBtn" onClick={() =>{ setShowVoteModel(true)
                    setId(row.id)}}> Vote </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {
        submitResponse && <ResponseAlert
          type="success"
          handleClick={() => setSubmitResponse()}
        >
          {submitResponse}
        </ResponseAlert>
      }
    </>
  );

}

VoteCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    // ... define other prop types
  })),
};