import { User }   from "./user.model.js"
import bcrypt     from 'bcrypt'
import config     from "../config.js"
import jwt        from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({email: body.email})

        if(!user) {
            res.status(404).json({message: 'User not found'})
        }

        if (await bcrypt.compare(body.password, user.password)) {
            if(config.secret) {
                const token = await jwt.sign({userId : user.id}, config.secret, {expiresIn : '24h'})
                console.log(token);
                res.status(200).json(token)
            } else {
                res.status(500).json({message : 'no secret to generate a token'})
            }
            res.status(200).json(user)
        } else {
            res.status(401).json({message: 'Invalid password'})
        }

    } catch (err) {
        res.status(404).json({message : err.message})
    }
}

export const register = async (req, res) => {
    try {
        const { body } = req
        const hash = await bcrypt.hash(body.password, 10)

        body.password = hash
        await User.create(body)
        res.status(201).json({message: 'User created'})
    } catch (err) {
        res.status(400).json({message : err.message})
    }
}
