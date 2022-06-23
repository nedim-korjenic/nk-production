import React from 'react'
import SpecialModal from './SpecialModal'
import './SpecialContent.css'

const SpecialContent = () => {
  return (
    <SpecialModal>
        <img className = 'special-poster' src="https://dearsam.com/img/300/1024/resize/c/a/cat-and-butterfly-50x70_c8ae1.jpg" alt='kitty'/>
        <b className='special-title'>Nedim hacks Bloola</b>
        <span style={{marginTop:'10px'}} className='special-subTitle'>
        <span>Rating:
        <b style={{color:'gold'}} >10.1</b>
        </span>
        <span className='special-subTitle'>24-06-22</span>
        </span>
    </SpecialModal>
  )
}

export default SpecialContent