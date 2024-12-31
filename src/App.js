import React from 'react';

import { Provider } from 'react-redux';

import store from './Redux/store'; // Make sure the path to your Redux store is correct

import OutputRoutes from './LayoutRoute/OutputRoutes';

import Header from './components/Header';





function App() {

  return (

    <Provider store={store}>

      <div>

        <OutputRoutes />

      </div>

    </Provider>

  );

}



export default App;
