import React from 'react'
import Uipages from '../pages/Uipages'
import Login from '../Aut/Login';
import { BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

const Navigate = () => {
    const { getuserdata } = useAuthContext();


    return (
      <div>
  
        <Routes>
      
         
          <Route
              exact
              path="/"
              element={
                  <React.Suspense >
                      {/* <Login/> */}
                  {getuserdata?.token ? <Uipages/> : <Login/>}
                </React.Suspense>
              }
            ></Route>
   
          </Routes>
      </div>
    )
  }

export default Navigate