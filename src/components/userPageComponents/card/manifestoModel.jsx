import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@mui/material';

export default function ManifestoModel(props) {
  const originalString = "The Date and Time Pickers package has a peer dependency on @mui/material . If you are not already using it in your project, you can install it with:.\n\nThe Date and Time Pickers package has a peer dependency on @mui/material . If you are not already using it in your project, you can install it with:.\n\nThe Date and Time Pickers package has a peer dependency on @mui/material . If you are not already using it in your project, you can install it with:."
  const replacedString = props?.manifesto?.replace('\n','\n\n')
  const array_of_strings = replacedString.split('\n\n')
  console.log(array_of_strings);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Manifesto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{overflowWrap:"anywhere" }} >
          <ul>
            {array_of_strings.map((row, index) => {
              return (<li key={index}>{row}</li>)
            })}
          </ul>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  )
}