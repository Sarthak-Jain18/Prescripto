import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export default function TopDoctors() {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">

            <p className="text-3xl font-medium">Top Doctors to Book</p>
            <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {doctors.slice(0, 10).map((item, index) => (
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

            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:scale-105 transition-all">
                more
            </button>

        </div>
    )
}