import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";

export default function Navbar() {

    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate();

    function logout() {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">

            <div className="flex items-center gap-2 text-xs">
                <img src={assets.admin_logo} alt="" className="w-36 sm:w-40 cursor-pointer" onClick={() => navigate('/')} />
                <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>

            <button onClick={logout} className="bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer">
                Logout
            </button>

        </div>
    )
}


