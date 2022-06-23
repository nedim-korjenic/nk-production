import * as React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'


export default function MainNav() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate()
  useEffect(()=> {
    if (value === 0) navigate('/')
    else if (value === 1) navigate('/movies')
    else if (value === 2) navigate('/series')
    else if (value === 3) navigate('/search')
    
  }, [value, navigate])

  const textStyle = {
    color:'white', 
    fontFamily:'Inter',
    fontWeight:'bold',
    ".Mui-selected": {
      fontFamily:'Inter',
      fontWeight: 'bold',
      color:'#34f7b3'
    }
  }


  return (
    <Box sx={{ 
        width: '100%',
        position: 'fixed',
        bottom: 0,
        }}>
      <BottomNavigation
      sx={{
        height:'7%',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#00060a',
        boxShadow:'0px 1px 4px #34f7b3',
        '.Mui-selected':{
          backgroundColor:'#051711'
        }
      }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={textStyle} label="Trending" icon={<WhatshotIcon sx={value===0? {color:'#34f7b3'}:{color:'white'}} />} />
        <BottomNavigationAction sx={textStyle} label="Movies"  icon={<MovieIcon sx={value===1? {color:'#34f7b3'}:{color:'white'}} />} />
        <BottomNavigationAction sx={textStyle} label="TV Shows" icon={<TvIcon sx={value===2? {color:'#34f7b3'}:{color:'white'}} />} />
        <BottomNavigationAction sx={textStyle} label="Search" icon={<SearchIcon sx={value===3? {color:'#34f7b3'}:{color:'white'}} />} />
      </BottomNavigation>
    </Box>
  );
}