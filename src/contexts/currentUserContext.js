import React, {createContext, useState} from 'react'

export const CurrentUser = createContext()

export const CurrentUserContext = ({ children }) =>
{
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: '',
        email: '',
        })

    return(
        <CurrentUser.Provider value = {[currentUser, setCurrentUser]}>
            {children}
        </CurrentUser.Provider>
    )
}