import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const AllPosts = createContext();

export const AllPostsContext = ({ children }) => 
{
    const [posts, setPosts] = useState([])

    const fetchAllPosts = async () =>
    {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const data = await res.data
        setPosts(data)
    }

    useEffect(
        () => 
        {
            fetchAllPosts()
        },[])

    return (
        <AllPosts.Provider value={posts}>
            {children}
        </AllPosts.Provider>
    )
}