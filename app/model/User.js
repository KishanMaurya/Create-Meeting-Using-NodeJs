const mongoose =require('mongoose')
const Schema = mongoose.Schema

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        min:4,
        max:20,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:8,
        max:20
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)
module.exports=User