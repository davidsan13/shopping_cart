import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <div className='main'>
      {/* <h1>Main</h1> */}
      <div className="main-sec-1">
        <h1>Top Deals</h1>
        <div className="img-container">
          <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6528/6528657_sd.jpg;maxHeight=200;maxWidth=300"/>
          <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6514/6514006_sd.jpg;maxHeight=200;maxWidth=300" alt="ps5 games"/>   
        </div>
      </div>
      <div className='main-sec-2'>
        <h2>Video Game Top Deals</h2>
        <h3>Check out the latest video game deals.</h3>
        <h3><Link to="/Products">Shop Top Deals</Link></h3> 
      </div>
      
    </div>
  )
}

export default Main
