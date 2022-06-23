import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import './Movies.css'
import Genres from '../../components/Genres'
import useGenres from '../../components/hooks/useGenres'

const Movies = () => {
const [page,setPage]=useState(1)
const [content, setContent]=useState([]) 
const [numOfPages, setNumOfPages]=useState()
const [selectedGenres, setSelectedGenres]=useState([])
const [genres, setGenres]=useState([])
const genreforURL=useGenres(selectedGenres)

const fetchMovies = async() => {
try {
  const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
  setContent(data.results)
  setNumOfPages(data.total_pages)
  console.log(data)
  } catch(error) {
  console.log(error)
  }
}

useEffect(()=> {
  fetchMovies()
},[page, genreforURL])

  return (
    <div>
    <span className='pageTitle'>Movies by genre</span>
    <Genres 
    type='movie' 
    selectedGenres={selectedGenres} 
    setSelectedGenres={setSelectedGenres}
    genres={genres} 
    setGenres={setGenres}
    setPage={setPage}
    />
    <div className='movies'>
        {content && content.map ((c) => 
          <SingleContent
            key= {c.id}
            id= {c.id}
            poster= {c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type='movie'
            rating={c.vote_average}
          />
        )}
      </div>
      {numOfPages>1 && <CustomPagination  setPage={setPage} numOfPages={numOfPages}/>}
    </div>
  )
}

export default Movies