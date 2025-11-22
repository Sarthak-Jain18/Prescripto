import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import { v2 as cloudinary } from 'cloudinary'

// API to register user
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing details' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email' })
        }
        if (password < 8) {
            return res.json({ success: false, message: 'Enter strong password' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashed
        }
        const newUser = new userModel(userData)
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "Missing details" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        const check = await bcrypt.compare(password, user.password)
        if (check) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to user profile
async function getProfile(req, res) {
    try {
        const userId = req.user?.id
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
async function updateProfile(req, res) {
    try {

        const userId = req.user?.id
        const { name, email, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !email || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Missing details" })
        }
        await userModel.findByIdAndUpdate(userId, { name, email, phone, address: JSON.parse(address), dob, gender })

        // upload image to cloudinary
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: "Profile updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
async function bookAppointment(req, res) {
    try {
        const userId = req.user?.id
        const { docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        // DOCTOR's availability
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor is not available' })
        }

        // SLOT's availability
        let slots_booked = docData.slots_booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId, docId, userData, docData, amount: docData.fees, slotTime, slotDate, date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment booked' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments at my-appointments page
async function listAppointment(req, res) {
    try {
        const userId = req.user?.id
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
async function cancelAppointment(req, res) {
    try {
        const userId = req.user?.id
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized access" })
        }
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

// API to make online payment
async function onlinePayment(req, res) {
    try {
        const userId = req.user?.id
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Not Found" })
        }

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized access" })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
        res.json({ success: true, message: "Payment successful" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, onlinePayment }