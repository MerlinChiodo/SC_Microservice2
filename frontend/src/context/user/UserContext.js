import React, {createContext, useState} from 'react';


const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)

    const getLoginUser = async (redirect_success, redirect_error) => {
        setLoading(true)
        const res = await fetch(`http://auth.smartcityproject.net:8080/external?redirect_success=${redirect_success}&redirect_error=${redirect_error}`)
        //wenn fetch erfolgreich ist
        setIsLoggedIn(true)
        setLoading(false)
    };

    const verifyUser = async token => {
        setLoading(true)

        const res = await fetch('http://auth.smartcityproject.net:8080/verify',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: token
            })
        const data = await res.json()
        setUser(data)
    }


return (
    <UserContext.Provider
        value={{
            user,
            isLoggedIn,
            loading,
            verifyUser,
            getLoginUser,
        }}>
        {children}
    </UserContext.Provider>)
}

export default UserContext