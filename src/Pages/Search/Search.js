import { Button, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { createTheme } from '@mui/material/styles'
import './Search.css'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SpecialContent from '../../special-components/SpecialContent'

const Search = () => {

const [type, setType]=useState(0)
const [page, setPage]=useState(1)
const [searchText, setSearchText]=useState('')
const [content, setContent]=useState()
const [numOfPages, setNumOfPages]=useState()
const [secretMovie, setSecretMovie]=useState(false)
const [password, setPassword]=useState('')

const darkTheme = createTheme({
  palette: {
    primary: {
        main: '#34f7b3' 
    },
    mode: 'dark'
  },
}) 



const fetchSearch = async () => {
  try {
  const {data}= await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
  setContent(data.results)
  setNumOfPages(data.total_pages)
  } catch(error){
    console.log(error)
  }
}

const fetchTopRated = async () => {
  try{
    const {data} = await axios.get(`https://api.themoviedb.org/3/${type?"tv":"movie"}/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    setContent(data.results)
    setNumOfPages(data.total_pages)
    } catch(error){
        console.log(error)
        }
}


const handleSearch = (e) => {
  setSearchText(e.target.value)
  if(e.target.value.length>2)
  fetchSearch()
  else if (e.target.value.length ===0)
  fetchTopRated()
}

useEffect(()=>{
  window.scroll(0,0)
  if(searchText.length>2)
  fetchSearch()
  else if (searchText.length==0)
  fetchTopRated()
}, [type,page])

const handleClick = () => {
  setSecretMovie(previous => !previous)
}

const handlePassword = (e) => {
  setPassword(e.target.value)
}

const correctPassword = password==process.env.REACT_APP_API_KEY? true : false

  return (  
<div style={{display:'flex', flexDirection:'column', margin:'15px 0'}}>
<span className='pageTitle'>Search movies and TV shows</span>
<Button
  onClick={handleClick}
  sx={{
    backgroundColor:'#34f7b3',
    width:'15vw',
    color:'black',
    fontWeight:400,
    alignSelf:'center',
    margin:4,
    '&:hover': {
      backgroundColor:'gold'
    }
  }}
  >
  <b>{secretMovie? 'Close secret movie' : 'Open secret movie'}</b>
</Button>

{secretMovie? 
<div style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
  <ThemeProvider theme={darkTheme}>
  <TextField
   value={password}
   sx={{flex:1, textColor:'white', margin:'10'}}
   type="password"
   variant="outlined"
   className='password'
   label='Password'
   color='primary'
   onChange={handlePassword}/>
   </ThemeProvider>
  {correctPassword && <h1 style={{fontFamily:'Inter'}}><span style={{color:'gold'}}>Congrats!</span> You have unlocked the secret movie.</h1>}
  {correctPassword && <SpecialContent/>}
</div> : 
(<div style={{display:'flex', flexDirection:'column', margin:'15px 0'}}>
    <ThemeProvider theme={darkTheme}>
      <div className='search'>
        <TextField
        value={searchText}
        style={{flex:1, textColor:'white'}}
        type="search"
        variant="outlined"
        className='searchBox'
        label='Search'
        color='primary'
        onChange={handleSearch}
        />
        <Button 
          variant='contained' 
          style={{marginLeft:10}}
          onClick={fetchSearch}
          >
            <SearchIcon/>
          </Button>
      </div>
      <Tabs 
      value={type} 
      indicatorColor='primary' 
      textColor='primary' 
      sx={{width:'50%', paddingBottom:5, fontWeight: 'bold', alignSelf:'center'}}
      onChange={(event, newValue)=> {
      setType(newValue)
      setPage(1)
      }}> 
          <Tab sx={{width:'50%', color:'white'}} label='Search movies'/>
          <Tab sx={{width:'50%', color:'white'}} label='Search TV shows'/>
      </Tabs>
    </ThemeProvider>
      <div className='search-items'>
          {content && content.map ((c) => 
            <SingleContent
            key= {c?.id}
            id= {c?.id}
            poster= {c?.poster_path}
            title={c?.title || c?.name}
            date={c?.first_air_date || c?.release_date}
            media_type={type? "tv" : "movie"}
            rating={c?.vote_average}
            />
          )}
          {searchText && content.length==0 && <h2 style={{fontFamily:'Inter'}}>No results found</h2>}
      </div>
      {numOfPages>1 && <CustomPagination  setPage={setPage} numOfPages={numOfPages}/>}</div>)}
   </div>
  )
}

export default Search