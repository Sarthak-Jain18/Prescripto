import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// API to toggle availability
async function changeAvailability(req, res) {
    try {
        const { docId } = req.body
        const data = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !data.available })
        res.json({ success: true, message: "Availability changed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor list
async function doctorList(req, res) {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for doctor login
async function loginDoctor(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "Missing details" })
        }
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get appointments for doctor's panel
async function appointmentsDoctor(req, res) {
    try {
        const docId = req.docId?.id
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment from doctor's end
async function appointmentCancel(req, res) {
    try {
        const docId = req.docId?.id
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            res.json({ success: true, message: "Appointment cancelled" })
        } else {
            res.json({ success: false, message: "Error: Mark fail" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment completed
async function appointmentComplete(req, res) {
    try {
        const docId = req.docId?.id
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            res.json({ success: true, message: "Appointment completed" })
        } else {
            res.json({ success: false, message: "Error: Mark fail" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data - doctor panel
async function doctorDashboard(req, res) {
    try {
        const docId = req.docId?.id
        const appointments = await appointmentModel.find({ docId })

        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile
async function doctorProfile(req, res) {
    try {
        const docId = req.docId?.id
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile
async function updateDoctorProfile(req, res) {
    try {
        const docId = req.docId?.id
        const { fees, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: "Profile updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailability, doctorList, loginDoctor,
    appointmentsDoctor, appointmentCancel, appointmentComplete,
    doctorDashboard, doctorProfile, updateDoctorProfile
}



