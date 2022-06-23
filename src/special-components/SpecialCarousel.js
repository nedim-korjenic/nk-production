import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './SpecialCarousel.css'

const handleDragStart = (e) => e.preventDefault();

const SpecialCarousel = () => {

    const dummyItems = [1,2,3,4,5,6,7,8,9,10]

    const items = dummyItems.map(item => (
        <div className='carouselItem'>
        <img src="https://i.pinimg.com/originals/5d/0f/cb/5d0fcb880247e0d38a0754864e740c74.png" 
        className='carouselItem__img' 
        onDragStart={handleDragStart}/>
        <b className='carouselItem__txt' style={{color:'white'}}>Nedim Korjenić</b>
        </div>))
    
    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      }

  return (
    <AliceCarousel
    autoPlay
    infinite
    disableDotsControls
    disableButtonsControls
    responsive={responsive}
     mouseTracking items={items} />
  )
}

export default SpecialCarousel