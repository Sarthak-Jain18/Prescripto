import { createContext, useState, useEffect } from "react"
import { toast } from 'react-toastify'
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    const value = {
        doctors, getDoctorsData,
        currencySymbol, backendURL,
        token, setToken,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    async function getDoctorsData() {
        try {
            const { data } = await axios.get(backendURL + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function loadUserProfileData() {
        try {
            const { data } = await axios.get(backendURL + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData);
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider