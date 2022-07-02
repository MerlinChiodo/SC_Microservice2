import React, {createContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';


const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdminLoggedIn, setAdminLoggedIn] = useState(false)
    const [admin, setAdmin] = useState({})

    useEffect(()=> {
        verifyUser()
    },[setLoggedIn])

    useEffect(()=> {
       /* verifyAdmin()*/
    },[setAdminLoggedIn])


    const getLoginUser = async (redirect_success, redirect_error) => {
        window.location.replace(`http://www.supersmartcity.de:9760/external?redirect_success=${redirect_success}&redirect_error=${redirect_error}`)
    };


    const verifyUser = async () => {
        let params = (new URL(document.location)).searchParams;
        const tokenUrl = params.get('token');
        if (tokenUrl !== null) {
            setLoading(true)
            const res = await fetch('http://www.supersmartcity.de:9760/verify',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: encodeURIComponent("code") + "=" + encodeURIComponent(tokenUrl),
                })
            const data = await res.json()
            if(res.ok) {
                console.log(data)
                localStorage.setItem('token', data.user_session_token)
                try {
                    setUser({
                        id: data.citizen_id,
                        user_data: data.info,
                        token: data.user_session_token
                    })
                } catch (e) {
                    console.log(e)
                }
                setLoggedIn(true)
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser({})
        setLoggedIn(false)
    }


return (
    <UserContext.Provider
        value={{
            user,
            isLoggedIn,
            loading,
            verifyUser,
            getLoginUser,
            logout,
            isAdminLoggedIn,
            admin
        }}>
        {children}
    </UserContext.Provider>)
}

export default UserContext