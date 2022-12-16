import jwt    from 'jsonwebtoken'
import config from '../config.js'

export const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth-token').split(' ')[1]
        const decodeToken = jwt.verify(token, config.secret)
        next()
    } catch (err) {
        res.status(401).json({ message: 'No token, authorization denied' })
    }
    
}