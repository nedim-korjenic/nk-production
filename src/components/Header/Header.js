import React from 'react'
import './Header.css'
import logo from '../../logokora.png'

const Header = () => {
  return (
    <span className='header'>
    <img className='logo' src={logo} />
    <span onClick = {() => window.scroll(0,0)}>production</span>
    </span>
  )
}

export default Header