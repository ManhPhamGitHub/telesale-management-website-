const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    name:String,
    position:{
        type:String,
        default:"Nhân viên bán hàng"
    },
    img:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    age:Number,
    IDcard:Number,
    address:String,
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'item',
    }]
})

module.exports = mongoose.model("profile",newSchema)