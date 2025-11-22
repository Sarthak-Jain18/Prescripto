import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// API for admin login
async function loginAdmin(req, res) {
    try {

        const { email, password } = req.body

        // checking empty data
        if (!email || !password) {
            res.json({ success: false, message: "Empty credentials" })
        }

        // verify email and password
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.send({ success: false, message: error.message })
    }
}

// API for adding doctor
async function addDoctor(req, res) {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" })
        }

        // validating string password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageURL = imageUpload.secure_url

        const docData = {
            name,
            email,
            image: imageURL,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(docData)
        await newDoctor.save()
        res.send({ success: true, message: "Doctor added" })
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: error.message })
    }
}

// API to get all-doctors list
async function allDoctors(req, res) {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all appointments list
async function appointmentsAdmin(req, res) {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
async function appointmentCancel(req, res) {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor's slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e != slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data
async function adminDashboard(req, res) {
    try {
        const appointments = await appointmentModel.find({})
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})

        const dashData = {
            appointments: appointments.length,
            doctors: doctors.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { loginAdmin, addDoctor, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }


