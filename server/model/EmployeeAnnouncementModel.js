const mongoose=require('mongoose')

 const messageSchema=mongoose.Schema({
    message:{
        type:String
    },
    deleted:{
        type:String,
        default:"false"
    },
    announcementTime: {
        type: Date,
        default: Date.now 
    }
 })

 const messageModel=mongoose.model("EmpAnnouncements",messageSchema)

 module.exports=messageModel;