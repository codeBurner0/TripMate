import mongoose, { model, Schema } from "mongoose";

const bookingSchema = mongoose.Schema({
    room:{
        type : String, required: true
    },
    roomid :{
        type: String , required: true
    },
    userid :{
        type: String , required: true
    },
    bookingdate:{
        type: String , required: true
    },
    fromdate :{
        type: String , required: true
    },
    todate :{
        type: String , required: true
    },
    totalamount :{
        type: Number , required: true
    },
    totaldays :{
        type: Number , required: true
    },
    transactionId :{
        type: String , required: true
    },
    status:{
        type: String , required: true , default:'booked'
    },
    token:[]
},{
    timestamps :true
})

export default model('booking' , bookingSchema)
