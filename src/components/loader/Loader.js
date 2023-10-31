import React from 'react'
import "./loader.css"

function Loader() {
  return (
    <div className='loader'>
      {/* Shorten the tags if they're empty. e.g. <span className="loader-icon" /> */}
      <span className="loader-icon"></span>
    </div>
  )
}

export default Loader