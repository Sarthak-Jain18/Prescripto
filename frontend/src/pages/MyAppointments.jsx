import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

export default function MyAppointments() {

    const { backendURL, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function slotDateFormat(slotDate) {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    async function getAppointments() {
        try {
            const { data } = await axios.get(backendURL + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function cancelAppointment(appointmentId) {
        try {
            const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function onlinePayment(appointmentId) {
        try {
            const { data } = await axios.post(backendURL + '/api/user/online-payment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getAppointments()
        }
    }, [token])

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
            <div>
                {appointments.map((item, index) => (
                    <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">

                        <div><img src={item.docData.image} alt="" className="w-32 bg-indigo-50" /></div>

                        <div className="flex-1 text-sm text-zinc-600">
                            <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className="text-zinc-700 font-medium mt-1">Address:</p>
                            <p className="text-xs">{item.docData.address.line1}</p>
                            <p className="text-xs">{item.docData.address.line2}</p>
                            <p className="text-sm mt-1">
                                <span className="text-sm text-neutral-700 font-medium">Date & Time: </span>
                                {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>

                        <div></div>

                        <div className="flex flex-col gap-2 justify-end">
                            {
                                item.cancelled ?
                                    <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>
                                    :
                                    item.isCompleted ?
                                        <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Appointment completed</button>
                                        :
                                        item.payment ?
                                            <>
                                                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>
                                                <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
                                            </>
                                            :
                                            <>
                                                <button onClick={() => onlinePayment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-[#5f6FFF] hover:text-white transition-all duration-300">Pay Online</button>
                                                <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
                                            </>
                            }
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
