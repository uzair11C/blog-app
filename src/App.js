import React, { useContext, useEffect } from "react";
import { CurrentUser } from './contexts/currentUserContext'
import {
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login"
import MyPostsPage from './components/myPostsPage'

function App() 
{
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useContext(CurrentUser)

  useEffect(
    () => {
      currentUser.id === null
      ?
      navigate('/login')
      :
      navigate('/dashboard')
    },[currentUser.id])

  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} /> 
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/user/posts/:id' element={<MyPostsPage />} />
      </Routes>
    </div>
  );
}

export default App;
