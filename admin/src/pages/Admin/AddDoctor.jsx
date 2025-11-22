import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx'

export default function AddDoctor() {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { aToken, backendURL } = useContext(AdminContext)

    async function onSubmitHandler(event) {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image not selected')
            }

            const formdata = new FormData()

            formdata.append('image', docImg)
            formdata.append('name', name)
            formdata.append('email', email)
            formdata.append('password', password)
            formdata.append('experience', experience)
            formdata.append('fees', Number(fees))
            formdata.append('about', about)
            formdata.append('speciality', speciality)
            formdata.append('degree', degree)
            formdata.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            console.log()
            const { data } = await axios.post(backendURL + '/api/admin/add-doctor', formdata, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setFees('')
                setAbout('')
                setDegree('')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>

            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white p-8 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className='w-16 bg-gray-100 cursor-pointer rounded-full' />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload Doctor <br /> Picture</p>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter name' required className='w-full border rounded px-3 py-2' />
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter email' required className='w-full border rounded px-3 py-2' />
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter password' required className='w-full border rounded px-3 py-2' />
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='w-full border rounded px-3 py-2'>
                                <option value="1 year">1 year</option>
                                <option value="2 year">2 year</option>
                                <option value="3 year">3 year</option>
                                <option value="4 year">4 year</option>
                                <option value="5 year">5 year</option>
                                <option value="6 year">6 year</option>
                                <option value="7 year">7 year</option>
                                <option value="8 year">8 year</option>
                                <option value="9 year">9 year</option>
                                <option value="10 year">10 year</option>
                            </select>
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Enter fees' required className='w-full border rounded px-3 py-2' />
                        </div>

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='w-full border rounded px-3 py-2'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastronterologist">Gastronterologist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor degree</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Enter degree' required className='w-full border rounded px-3 py-2' />
                        </div>

                        <div className='flex-1 flex-col gap-1'>
                            <p>Doctor address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder='Enter address 1' required className='w-full border rounded px-3 py-2 my-0.5' />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder='Enter address 2' required className='w-full border rounded px-3 py-2 my-0.5' />
                        </div>

                    </div>

                </div>

                <div className='flex-1 flex-col gap-1 mt-4 mb-2 text-gray-600'>
                    <p>About doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder='Write about doctor' rows={5} className='w-full border rounded px-3 py-2' />
                </div>

                <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>
                    Add doctor
                </button>

            </div>

        </form>
    )
}


