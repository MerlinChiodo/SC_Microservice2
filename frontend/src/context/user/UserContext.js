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
        let params = (new URL(document.location)).searchParams;
        const tokenUrl = params.get('token');
        if (tokenUrl !== null) {
            verifyUser(tokenUrl)
        }
        const tokenCookie = Cookies.get('user_token');
        if (tokenCookie !== undefined) {
            verifyUser(tokenCookie)
        }
    },[setLoggedIn])

    useEffect(()=> {
        let params = (new URL(document.location)).searchParams;
        console.log(params)
        const tokenUrl = params.get('token');
        if (tokenUrl !== null) {
            verifyAdmin(tokenUrl)
        }
        const tokenCookie = Cookies.get('employee_token');
        if (tokenCookie !== undefined) {
            verifyAdmin(tokenCookie)
        }
    },[setAdminLoggedIn])

    const getLoginUser = async (redirect_success, redirect_error) => {
        window.location.replace(`http://www.supersmartcity.de:9760/external?redirect_success=${redirect_success}&redirect_error=${redirect_error}`)
    };

    const getLoginAdmin = async(redirect_success, redirect_error) => {
        window.location.replace(`http://www.supersmartcity.de:9760/employee/external?redirect_success=${redirect_success}&redirect_error=${redirect_error}`)
    };

    const verifyAdmin = async (token) => {
        setLoading(true)
        const res = await fetch('http://www.supersmartcity.de:9760/employee/verify',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: encodeURIComponent("code") + "=" + encodeURIComponent(token),
            })
        const data = await res.json()
        if(res.ok) {

            console.log(data)
            Cookies.set('employee_token', data.employee_session_token)
            setAdminLoggedIn(true)
            try {
                setAdmin({
                    token: data.employee_session_token
                })
            } catch (e) {
                console.log(e)
            }
            logout()
        }
    }


    const verifyUser = async (token) => {
            setLoading(true)
            const res = await fetch('http://www.supersmartcity.de:9760/verify',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: encodeURIComponent("code") + "=" + encodeURIComponent(token),
                })
            const data = await res.json()
            if(res.ok) {
                console.log(data)
                Cookies.set('user_token', data.user_session_token)
                setLoggedIn(true)
                try {
                    setUser({
                        id: data.citizen_id,
                        user_data: data.info,
                        token: data.user_session_token
                    })
                } catch (e) {
                    console.log(e)
                }
                logoutAdmin()
            }
        }


    const logout = () => {
        Cookies.remove('user_token')
        setUser({})
        setLoggedIn(false)
    }
    const logoutAdmin = ()=>{
        Cookies.remove('employee_token')
        setAdmin({})
        setAdminLoggedIn(false)
    }


return (
    <UserContext.Provider
        value={{
            user,
            isLoggedIn,
            loading,
            verifyUser,
            getLoginUser,
            getLoginAdmin,
            logout,
            logoutAdmin,
            isAdminLoggedIn,
            admin
        }}>
        {children}
    </UserContext.Provider>)
}

export default UserContext