import jwt from 'jsonwebtoken'

// ADMIN authentication middleware
async function authAdmin(req, res, next) {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ succes: false, message: "Unauthorized access" })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ succes: false, message: "Unauthorized access" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.send({ succes: false, message: error.message })
    }
}

export default authAdmin



