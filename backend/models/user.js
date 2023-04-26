import mongoose, { model, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true

    }, 
    isAdmin: {
        type: Boolean, default: false
    }
}, {
    timestamps :true
})

export default model('user' , userSchema)



