import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '$'

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    function slotDateFormat(slotDate) {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    function calculateAge(dob) {
        const today = new Date()
        const birthdate = new Date(dob)
        let age = today.getFullYear() - birthdate.getFullYear()
        return age
    }

    const value = { currencySymbol, slotDateFormat, calculateAge }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider



