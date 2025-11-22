import jwt from 'jsonwebtoken'

// USER authentication middleware
async function authUser(req, res, next) {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ succes: false, message: "Unauthorized access" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: token_decode.id }
        next()
    } catch (error) {
        console.log(error)
        res.send({ succes: false, message: error.message })
    }
}

export default authUser
