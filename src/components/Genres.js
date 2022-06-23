import { Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres, 
    setGenres,
    setPage
}) => {

    

const fetchGenres =async()=> {
const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
setGenres(data.genres)
}

useEffect(()=> {
    fetchGenres()
    return () => {
        setGenres({})
    }
},[])

const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((g)=> g.id!==genre.id))
    setPage(1)
}
const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g)=>g.id!==genre.id))
    setGenres([...genres, genre])
    setPage(1)
}


  return (
    <div style={{padding:'6px 0'}}>
        {selectedGenres.map((genre) => (
            <Chip 
            clickable
            onDelete={()=>handleRemove(genre)}
            variant='outlined'
            key={genre.id}
            label={genre.name}
            deleteIcon={<DeleteIcon style={{color:'#34f7b3'}}/>}
            style={{margin:6, width:'103px', color:'white', border:'1.5px solid #34f7b3', borderRadius:'10px', backgroundColor:'#393b3a'}} />
        ))}
        {genres.map((genre) => (
            <Chip 
            clickable
            onClick={()=>handleAdd(genre)}
            key={genre.id}
            label={genre.name}
            style={{margin:6, width:'103px', color:'white', border:'1px solid white'}} />
        ))}
    </div>
  )
}

export default Genres