
import { isEmail } from "../middlewares/email.validator.js"
import { model, Schema } from "mongoose"

/**
 * Class User
 * @typedef {object} User
 * @property {string} email.required - user email
 * @property {string} password.required - user password
 * 
 */
const schema = new Schema({
    email: { type: String, 
                unique: true, 
                lowercase: true,  
                trim: true, 
                validate : [isEmail, 'Check your email format']
    },
    password: { type: String},
}, { timestamps: true })

export const User = model('User', schema);

