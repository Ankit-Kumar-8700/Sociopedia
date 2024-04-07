import mongoose from "mongoose";

const messageModel=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    message:{type:String},
},{
    timestamps:true
})

const Message = mongoose.model("Message",messageModel);

export default Message;