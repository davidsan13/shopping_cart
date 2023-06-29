import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGitHubSquare } from '@fortawesome/free-solid-svg-icons'
import github from '../assets/github.svg'
const Footer = () => {
  return (
    <div className='Footer'>
      <h1>Copyright © 2023 David San</h1>
      <a href="https://www.github.com/davidsan13" ><img src={github}/></a>
     
      
    </div>
  )
}

export default Footer
