import React from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import Header from './Header';
import Img3 from "../assets/images/Background Image.png";
import Img2 from "../assets/images/Elipse 5.png"

function ViewProfile() {
  const userData = useSelector((state) => state.user.userData); 

  if (!userData || !userData.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const { username, email } = userData.user; 

  return (

    <div className="users flex">
    <Header/>

     <div className="userProfile h-[76vh] overflow-scroll">
       <div className="card" style={{ width: "768px" }}>
         <img src={Img3} className="card-img-top" alt="..." />
         <div className="viewer">
           <div className="viewer_photo">
             <img id="img" src={Img2} alt="" />
           </div>
           <h4>{username}</h4>
           <h5 id="email">{email}</h5>
         </div>
         <div className="card-body">
          
           <div className="row gap-3">
             <div className="col">
               <h4>name</h4>
               <h5 id="address">{username}</h5>
             </div>
             <div className="col">
               <h4>email</h4>
               <h5 id="userName">{email}</h5>
             </div>
           </div>
           <div className="button pt-2">
     
           </div>
         </div>
       </div>
     </div>

     <Footer />
   </div>
  );
}

export default ViewProfile;
