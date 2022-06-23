import React from 'react'
import {img_300, unavailable} from '../../config/config' 
import ContentModal from '../ContentModal/ContentModal'
import './SingleContent.css' 

const SingleContent = ({id,title,date,rating,poster,media_type}) => {
  return (
    <ContentModal media_type={media_type} id={id} >
        <img className = 'poster' src={ poster? (img_300 + poster) : unavailable } alt={title}/>
        <b className='title'>{title}</b>
        <span style={{marginTop:'10px'}} className='subTitle'>
        <span>Rating:
        <b style={rating>7.4? {color:'#34f7b3'}: {color:'red'}} > {rating}</b>
        </span>
        <span className='subTitle'>{date}</span>
        </span>
    </ContentModal> 
  )
}

export default SingleContent