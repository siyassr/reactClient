// import React from 'react'
// import Img3 from "../assets/images/Background Image.png";
// function ViewProfile({employees,handleDeleteClick,handleEditClick}) {
//   return (
//     <div className="userProfile h-[76vh] overflow-scroll">
//          <img src={Img3} className="card-img-top" alt="..."/>
//           <div className="card" style={{ width: "768px" }}>
//             <img  className="card-img-top" alt="..." />
//             <div className="viewer">
//               <div className="viewer_photo">
//                 <img id="img" src="/" alt="" />
//               </div>
//               <h4>{employees?.firstName} {employees?.lastName}</h4>
//               <h5 id="email">{employees?.email}</h5>
//             </div>
//             <div className="card-body">
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Gender</h4>
//                   <h5>{employees?.gender}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Age</h4>
//                   <h5>38</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Date of Birth</h4>
//                   <h5>{employees?.dob}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Mobile Number</h4>
//                   <h5 id="Phone">{employees?.phone}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Qualifications</h4>
//                   <h5 id="qualification">{employees?.qualifications}</h5>
//                 </div>
//               </div>
//               <div className="row gap-3">
//                 <div className="col">
//                   <h4>Address</h4>
//                   <h5 id="address">{employees?.address}</h5>
//                 </div>
//                 <div className="col">
//                   <h4>Username</h4>
//                   <h5 id="userName">{employees?.username}</h5>
//                 </div>
//               </div>
//               <div className="button pt-2">
//                 <button className="cancelbtn" onClick={handleDeleteClick}>Delete</button>
//                 <button className="editbtn" onClick={handleEditClick}>Edit Details</button>
//               </div>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default ViewProfile