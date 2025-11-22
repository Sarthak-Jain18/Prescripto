import { useContext, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext.jsx'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'

export default function Login() {

    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAToken, backendURL } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    async function onSubmitHandler(event) {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendURL + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backendURL + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-[#5f6FFF]'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
                {
                    state === 'Admin' ?
                        <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-[#5f6FFF] underline cursor-pointer'>Click here</span></p>
                        :
                        <p>Admin Login? <span onClick={() => setState('Admin')} className='text-[#5f6FFF] underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    )
}



