import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext.jsx"
import { assets } from "../../assets/assets.js"
import { AppContext } from "../../context/AppContext.jsx"

export default function Dashboard() {

    const { slotDateFormat } = useContext(AppContext)
    const { aToken, cancelAppointment, dashData, getDashData } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getDashData()
        }
    }, [aToken])

    return dashData && (
        <div className="m-5">

            <div className="flex flex-wrap gap-3">

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={assets.doctor_icon} alt="" className="w-14" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
                        <p className="text-gray-500">Doctors</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={assets.appointments_icon} alt="" className="w-14" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                        <p className="text-gray-500">Appointments</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img src={assets.patients_icon} alt="" className="w-14" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.users}</p>
                        <p className="text-gray-500">Patients</p>
                    </div>
                </div>

            </div>

            <div className="bg-white">

                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100">
                    <img src={assets.list_icon} alt="" />
                    <p className="font-semibold">Latest appointments</p>
                </div>

                <div className="pt-4 border border-t-0 border-gray-100">
                    {
                        dashData.latestAppointments.map((item, index) => (
                            <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100">
                                <img src={item.docData.image} alt="" className="w-10 rounded-full bg-gray-200" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{item.docData.name}</p>
                                    <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                                </div>
                                {item.cancelled ?
                                    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                    :
                                    item.isCompleted ?
                                        <p className="text-green-500 text-xs font-medium">Completed</p>
                                        :
                                        <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' />
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}



