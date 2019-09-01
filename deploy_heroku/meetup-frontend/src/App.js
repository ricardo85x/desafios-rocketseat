import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Datetime from 'react-datetime'



import '~/config/Reactotron';

import Routes from "~/routes";

import { store, persistor } from "./store"; // importar depois do reactotronconfig


import history from "./services/history";

import GlobalStyles from '~/styles/global'

function App() {
  return (

    // <Datetime  defaultValue={new Date()} locale="pt"/>


    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer  autoClose={3000}/>
        </Router>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
