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
import BlogPage from './components/blogPage'
import CreatePost from "./components/createPost";

function App() 
{
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useContext(CurrentUser)

  useEffect(
    () => {
      currentUser.id === null
      ?
      navigate('/login',{replace:'true'})
      :
      navigate('/dashboard',{replace:'true'})
    },[currentUser.id])

  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login />} /> 
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/user/posts' element={<MyPostsPage />} />
        <Route exact path='/post/:id' element={<BlogPage />} />
        <Route exact path='/user/posts/:id' element={<BlogPage />} />
        <Route exact path='/create-post' element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
