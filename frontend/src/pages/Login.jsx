import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()
    const { backendURL, token, setToken } = useContext(AppContext)
    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmitHandler(event) {
        event.preventDefault();

        try {

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendURL + '/api/user/register', { name, email, password })
                setName('')
                setEmail('')
                setPassword('')
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }

            else {
                const { data } = await axios.post(backendURL + '/api/user/login', { email, password })
                setEmail('')
                setPassword('')
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">

                <p className="text-2xl font-semibold">{state === 'Sign Up' ? "Create Account" : "Login Account"}</p>

                <p>Please {state === 'Sign Up' ? "sign up" : "login"} to book appointment</p>

                {
                    state === 'Sign Up' &&
                    <div className="w-full">
                        <p>Name</p>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" className="border border-zinc-300 rounded w-full p-2 mt-1" />
                    </div>
                }

                <div className="w-full">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email" className="border border-zinc-300 rounded w-full p-2 mt-1" />
                </div>

                <div className="w-full">
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password" className="border border-zinc-300 rounded w-full p-2 mt-1" />
                </div>

                <button type="submit" className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer">{state}</button>

                {
                    state === 'Sign Up' ?
                        <p>Already have an account? <span onClick={() => setState('Login')} className="text-[#5f6FFF] underline cursor-pointer">Login here</span></p>
                        :
                        <p>Don't have an account? <span onClick={() => setState('Sign Up')} className="text-[#5f6FFF] underline cursor-pointer">Create account</span></p>
                }

            </div>
        </form>
    )
}


