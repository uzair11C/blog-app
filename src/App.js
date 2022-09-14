import React, { useContext, useEffect } from "react";
import { CurrentUser } from './contexts/currentUserContext'
import {
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login"

function App() 
{
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useContext(CurrentUser)

  useEffect(
    () => {
      currentUser.id === null
      ?
      navigate('/login',{replace:true})
      :
      navigate('/dashboard',{replace:true})
    },[currentUser.id])

  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} /> 
        <Route path='/dashboard' exact element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
