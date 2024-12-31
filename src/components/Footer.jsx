import React from 'react'

function Footer() {
  return (
    <div className="sign_sctn flex justify-between">
    <div className="copywrite">
        <h5>© 2023  All Rights Reserved.<span>Stackup</span></h5>
    </div>
   <div className="external_links flex gap-4">

       <a href="">Terms of Use</a>
       <a href="">Privacy Policy</a>
   </div>
  </div>
  )
}

export default Footer