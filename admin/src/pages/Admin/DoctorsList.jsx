import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext.jsx"
import { useEffect } from "react"

export default function DoctorsList() {

    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">

            <p className="text-lg font-medium">All Doctors</p>
            
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {
                    doctors.map((item, index) => (
                        <div key={index} className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
                            <img src={item.image} alt="" className="bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500" />
                            <div className="p-4">
                                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                                <p className="text-neutral-800 text-sm">{item.speciality}</p>
                                <div className="flex items-center mt-2 gap-1 text-sm">
                                    <input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)} />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}