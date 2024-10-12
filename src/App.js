
import React from 'react'


import Login from './Aut/Login';
import { ToastContainer } from "react-toastify";
import Navigate from './Navigate/Navigate';
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (      <Router>
    <ToastContainer />
<Navigate/>
</Router>
   
  )
}

export default App

