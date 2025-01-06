// import React from 'react';

// import { Provider } from 'react-redux';

// import store from './Redux/store'; // Make sure the path to your Redux store is correct

// import OutputRoutes from './LayoutRoute/OutputRoutes';

// import Header from './components/Header';





// function App() {

//   return (

//     <Provider store={store}>

//       <div>

//         <OutputRoutes />

//       </div>

//     </Provider>

//   );

// }



// export default App;



import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import store from "./Redux/store";
import OutputRoutes from "./LayoutRoute/OutputRoutes";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <div>
       
        <ToastContainer
          position="top-right" 
          autoClose={5000}   
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick        
          pauseOnHover       
          draggable           
          theme="light"        
        />
        <OutputRoutes />
      </div>
    </Provider>
  );
}

export default App;

