import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { YouTube } from '@mui/icons-material';
import { useState } from 'react';
import './SpecialModal.css'
import SpecialCarousel from './SpecialCarousel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '70%',
    backgroundColor: '#010b13',
    border: '2px solid gold',
    borderRadius:'5px',
    boxShadow: 24, 
    p: 4,
  }; 

const SpecialModal = ({children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  
    return ( 
      <div>
        <div className='special-media'onClick={handleOpen}>{children}</div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose} 
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className='SpecialModal' sx={style}>
              <div >
              <img className='SpecialModal__portrait'  src="https://i.pinimg.com/originals/e0/ca/09/e0ca0954c7859e0ef396731700d82ffd.jpg"/>
              </div>
              <div >
              <img className='SpecialModal__landscape' src="https://cdn.pixabay.com/photo/2016/04/25/22/41/cat-1353325_960_720.jpg"/>
              </div>
              <div className='SpecialModal__about'>
                <span className='SpecialModal__title'>Nedim hacks Bloola</span>
                <i className="special-tagline">"Junior programer takes over IT world"</i>
  
                    <span className="SpecialModal__description">
                        Unaware of the problem lurking behind hiring inexperienced developer, Bloola gets in a whole lot of trouble.
                    </span> 
                    <div>
                      <SpecialCarousel/>
                    </div>
  
                    <Button
                      sx={{
                        backgroundColor:'red',
                        width:'50%',
                        alignSelf:'center'
                      }}
                      variant="contained"
                      startIcon={<YouTube />}
                      target="__blank"
                      color='primary'
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    >
                      Watch the Trailer
                    </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

export default SpecialModal