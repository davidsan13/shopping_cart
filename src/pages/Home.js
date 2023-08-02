import React from 'react'
import { Outlet } from "react-router-dom";
import Main from '../components/Main'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default Home
