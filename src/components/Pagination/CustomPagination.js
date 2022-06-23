import React from 'react'
import  Pagination  from '@mui/material/Pagination'
import { createTheme} from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { makeStyles } from '@mui/styles'

const CustomPagination = ({setPage, numOfPages = 10}) => {
  
const theme = createTheme({
  palette: {
    primary: {
      main: '#051711',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});


const handlePage = (page) => {
    setPage(page)
    window.scroll(0,0)
}

const useStyles = makeStyles({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#34f7b3",
    }
  },
});

const classes = useStyles()

  return (
      <ThemeProvider theme={theme} >
        <Pagination
        sx={{
          display:'flex',
          justifyContent:'center',
          marginTop: '15px',
          backgroundColor: '#010b13',
          borderRadius:2,
          textColor:'white',
        }}
        count={numOfPages}
        variant='text'
        color='primary'
        classes={{ ul: classes.pagination }}
        onChange = {(e)=>handlePage(e.target.textContent)}/>
        </ThemeProvider>
  )
}

export default CustomPagination