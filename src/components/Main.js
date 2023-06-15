import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <div className='main'>
      
        <div className="main-sec-1">
          <h1>Top Deals</h1>
          {/* <div className="img-container">
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6528/6528657_sd.jpg;maxHeight=200;maxWidth=300"/>
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6514/6514006_sd.jpg;maxHeight=200;maxWidth=300" alt="ps5 games"/>   
          </div> */}
          <div className="main-sec-3">
            <div className="main-card">
              <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-cf77/k2-_4cefcebf-03d0-4b70-8a49-6128df494e5b.v1.jpg?odnHeight=340&odnWidth=604&odnBg=FFFFFF"/>
              <h1> Street Fighter 6</h1>
            </div>
          {/* <div className="main-card">
            <img src="https://i5.walmartimages.com/dfw/4ff9c6c9-1a3a/k2-_f7ae325b-a815-489d-b7ef-396d5f5260ea.v1.jpg?odnHeight=340&odnWidth=604&odnBg=FFFFFF"/>
            <h1>Diablo IV</h1>
          </div> */}
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
