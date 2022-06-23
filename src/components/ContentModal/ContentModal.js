import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { YouTube } from '@mui/icons-material';
import { useState } from 'react';
import './ContentModal.css'
import Carousel from '../Carousel/Carousel'
 
const style = {
  position: 'absolute', 
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '70%',
  backgroundColor: '#010b13',
  border: '2px solid #34f7b3',
  borderRadius:'5px',
  boxShadow: 24, 
  p: 4,
};

export default function ContentModal({children, media_type, id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [content, setContent] = useState()
  const [video, setVideo] = useState()

  const fetchData = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  setContent(data)
  }

  const fetchVideo = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  setVideo(data.results[0]?.key)
  }

  React.useEffect(() => {
    fetchData()
    fetchVideo()
  }, []) 

  return ( 
    <div>
      <div className='media'onClick={handleOpen}>{children}</div>
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
          { content && <Box className='ContentModal' sx={style}>
            <div >
            <img className='ContentModal__portrait'  src={content?.poster_path? `${img_500}/${content.poster_path}`:unavailable}/>
            </div>
            <div >
            <img className='ContentModal__landscape' src={content?.backdrop_path? `${img_500}/${content.backdrop_path}`:unavailableLandscape}/>
            </div>
            <div className='ContentModal__about'>
              <span className='ContentModal__title'>
              {content?.name || content?.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
              </span>
                  {content.tagline && (
                    <i className="tagline">"{content?.tagline}"</i>
                  )}

                  <span className="ContentModal__description">
                    {content?.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id}/>
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
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
            </div>
          </Box>}
        </Fade>
      </Modal>
    </div>
  );
}
