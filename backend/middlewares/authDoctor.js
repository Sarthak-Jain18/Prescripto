import jwt from 'jsonwebtoken'

// DOCTOR authentication middleware
async function authDoctor(req, res, next) {
    try {
        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({ succes: false, message: "Unauthorized access" })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.docId = { id: token_decode.id }
        next()
    } catch (error) {
        console.log(error)
        res.send({ succes: false, message: error.message })
    }
}

export default authDoctor
