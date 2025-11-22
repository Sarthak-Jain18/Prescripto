import { useContext, useState } from "react"
import axios from "axios"
import { assets } from '../assets/assets.js'
import { toast } from "react-toastify"
import { AppContext } from "../context/AppContext.jsx"

export default function MyProfile() {

    const { token, userData, setUserData, backendURL, loadUserProfileData } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    async function updateUserProfileData() {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('email', userData.email)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendURL + '/api/user/update-profile', formData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData && (
        <div className="max-w-lg flex flex-col gap-2 text-sm">

            {
                isEdit ?
                    <label htmlFor="image">
                        <div className="inline-block relative cursor-pointer">
                            <img src={image ? URL.createObjectURL(image) : userData.image} alt="" className="w-36 rounded opacity-50" />
                            <img src={image ? null : assets.upload_icon} alt="" className="w-10 absolute bottom-12 right-12" />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    :
                    <div>
                        <img src={userData.image} alt="" className="w-36 rounded" />
                    </div>
            }

            <div>
                {
                    isEdit ?
                        <input type="text" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name}
                            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 border border-gray-400" />
                        :
                        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
                }
            </div>

            <hr className="bg-zinc-400 h-px border-none" />

            <div>

                <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">

                    <p className="font-medium">Email id:</p>
                    {
                        isEdit ?
                            <input type="email" onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} value={userData.email}
                                className="bg-gray-50 max-w-52 border border-gray-400" />
                            :
                            <p className="text-blue-600">{userData.email}</p>
                    }

                    <p className="font-medium">Phone:</p>
                    {
                        isEdit ?
                            <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone}
                                className="bg-gray-50 max-w-52 border border-gray-400" />
                            :
                            <p className="text-blue-600">{userData.phone}</p>
                    }

                    <p className="font-medium">Address:</p>
                    {
                        isEdit ?
                            <p>
                                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1}
                                    className="bg-gray-50 max-w-52 border border-gray-400" />
                                <br />
                                <input type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2}
                                    className="bg-gray-50 max-w-52 border border-gray-400" />
                            </p>
                            :
                            <p className="text-blue-600">
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }

                </div>

            </div>

            <div>

                <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>

                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">

                    <p className="font-medium">Gender:</p>
                    {
                        isEdit ?
                            <select onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}
                                className="bg-gray-50 max-w-52 border border-gray-400">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            :
                            <p className="text-blue-600">{userData.gender}</p>
                    }

                    <p className="font-medium">DOB:</p>
                    {
                        isEdit ?
                            <input type="date" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.dob }))} value={userData.dob}
                                className="bg-gray-50 max-w-52 border border-gray-400" />
                            :
                            <p className="text-blue-600">{userData.dob}</p>
                    }

                </div>

            </div>

            <div className="mt-10">
                {
                    isEdit ?
                        <button onClick={updateUserProfileData} className="bg-gray-300 text-black px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all duration-200 cursor-pointer">
                            Save information
                        </button>
                        :
                        <button onClick={() => setIsEdit(true)} className="bg-gray-300 text-black px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all duration-200 cursor-pointer">
                            Edit information
                        </button>
                }
            </div>

        </div>
    )
}



