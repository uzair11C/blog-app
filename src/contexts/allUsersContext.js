import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const AllUsers = createContext();

export const AllUsersContext = ({ children }) => 
{
    const [users, setUsers] = useState([])

    const fetchAllUsers = async () =>
    {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const data = await res.data
        setUsers(data)
    }

    useEffect(
        () => 
        {
            fetchAllUsers()
        },[])

    return (
        <AllUsers.Provider value={[users, setUsers]}>
            {children}
        </AllUsers.Provider>
    )
}