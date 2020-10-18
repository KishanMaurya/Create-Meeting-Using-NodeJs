const User=require('../model/User')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const MeetingSchema=new Schema({
    userId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    meetingName:{
        type:String,
        required:true,
        min:4,
        max:30,
        trim:true
    },
    description:{
        type:String,
        required:true,
        min:8,
        max:150,
        trim:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    createDate:{
        type:String,
        required:true
    }
},{timestamps:true})

const Meeting=mongoose.model('Meeting',MeetingSchema)
module.exports=Meeting