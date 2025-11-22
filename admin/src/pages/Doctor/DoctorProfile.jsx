import { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify"
import axios from "axios"

export default function DoctorProfile() {

    const { dToken, backendURL, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currencySymbol } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    async function updateProfile() {
        try {
            const updatedata = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available
            }
            const { data } = await axios.post(backendURL + '/api/doctor/update-profile', updatedata, { headers: { dToken } })
            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div>

            <div className="flex flex-col gap-4 m-5">

                <div>
                    <img src={profileData.image} alt="" className="bg-[#5f6FFF]/80 w-full sm:max-w-64 rounded-lg" />
                </div>

                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">

                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>

                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className="py-0.5 px-2 border text-sm rounded-full">{profileData.experience}</button>
                    </div>

                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
                        <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
                    </div>

                    <p className="text-gray-600 font-medium mt-4">
                        Appointment fee: <span className="text-gray-800">{currencySymbol} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} className="bg-gray-100 border border-gray-400" /> : profileData.fees}</span>
                    </p>

                    <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p className="text-sm">
                            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} className="bg-gray-100 border border-gray-400" /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} className="bg-gray-100 border border-gray-400" /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className="flex gap-1 pt-2">
                        <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} type="checkbox" name="" id="" checked={profileData.available} />
                        <label htmlFor="">Available</label>
                    </div>

                    {isEdit ?
                        <button onClick={updateProfile} className="px-4 py-1 border bg-gray-100 text-black text-sm rounded-full mt-5 hover:cursor-pointer hover:bg-[#5f6FFF] hover:border-[#5f6FFF] hover:text-white transition-all duration-300">Save information</button>
                        :
                        <button onClick={() => setIsEdit(true)} className="px-4 py-1 border bg-gray-100 text-black text-sm rounded-full mt-5 hover:cursor-pointer hover:bg-[#5f6FFF] hover:border-[#5f6FFF] hover:text-white transition-all duration-300">Edit information</button>
                    }

                </div>

            </div>

        </div>
    )
}

