import React, { useEffect, useState } from 'react'
import './Series.css'
import axios from 'axios'
import Genres from '../../components/Genres'
import useGenres from '../../components/hooks/useGenres'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'

const Series = () => {
const [page,setPage]=useState(1)
const [content, setContent]=useState([])
const [numOfPages, setNumOfPages]=useState()
const [selectedGenres, setSelectedGenres]=useState([])
const [genres, setGenres]=useState([])
const genreforURL=useGenres(selectedGenres)

const fetchSeries = async() => {
  try {
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    setContent(data.results)
    setNumOfPages(data.total_pages)
    console.log(data)
      } catch(error) {
          console.log(error)
        }
}

useEffect(()=> {
  fetchSeries()
},[page, genreforURL])

  return (
    <div>
    <span className='pageTitle'>TV Shows by genre</span>
    <Genres 
    type='tv'
    selectedGenres={selectedGenres} 
    setSelectedGenres={setSelectedGenres}
    genres={genres} 
    setGenres={setGenres}
    setPage={setPage}
    />
    <div className='series'>
        {content && content.map ((c) => 
          <SingleContent
            key= {c.id}
            id= {c.id}
            poster= {c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type='tv'
            rating={c.vote_average}
          />
        )}
      </div>
      {numOfPages>1 && <CustomPagination  setPage={setPage} numOfPages={100}/>}
    </div>
  )
}


export default Series