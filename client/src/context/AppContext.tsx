import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props:any) => {

    const currencySymbol = '₹'
    // const backendUrl = import.meta.env.VITE_BACKEND_URL

    const backendUrl = "http://localhost:5000";

    const [emps, setEmps] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    // Getting Emps using API
    const getEmpsData = async () => {

        try {

            const { data } = await axios.get(`${backendUrl}/api/emp/list`)
            if (data.success) {
                setEmps(data.emps)
            } else {
                toast.error(data.message)
            }

        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: {authorization: token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getEmpsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value = {
        emps, getEmpsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider