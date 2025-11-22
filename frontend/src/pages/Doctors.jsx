import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

export default function Doctors() {

    const navigate = useNavigate();
    const { speciality } = useParams();
    const { doctors } = useContext(AppContext);
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    function applyFilter() {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div>
            <p className='text-gray-600'>Browse through the doctors specialist.</p>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                <button onClick={() => setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5f6FFF] text-white' : ''}`}>
                    Filters
                </button>

                <div className={`${showFilter ? 'flex' : 'hidden sm:flex'} flex-col gap-4 text-sm text-gray-600`}>
                    <p onClick={() => speciality === 'General physician' ? navigate('/doctors/') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-15 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
                    <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
                    <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
                    <p onClick={() => speciality === 'Gastronterologist' ? navigate('/doctors') : navigate('/doctors/Gastronterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastronterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastronterologist</p>
                </div>

                <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,350px))] md:grid-cols-[repeat(auto-fill,minmax(200px,200px))] gap-4 gap-y-6'>
                    {filterDoc.map((item, index) => (
                        <div key={index} onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2.5 transition-all duration-500">
                            <img src={item.image} alt="" className="bg-blue-50" />
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-center">
                                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                                    <p className={item.available ? 'text-green-500' : 'text-gray-500'}>{item.available ? "Available" : "Not available"}</p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                                <p className="text-gray-600 text-sm">{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}