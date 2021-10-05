const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    phone:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    customer:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    shop:{
        type:String,
        require:true
    },
    region:{
        type:String,
        require:true
    },
    sex:{
        type:String,
        require:true
    },
    note:{
        type:String,
        require:true
    },
    status:{
        type:String,
        
    },
   createdAt:{
       type:Date,
       default:new Date()
   },
   employee:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'profile',
       default:"6158405fcc294835cf1e9642"
   }
})

module.exports = mongoose.model("item",newSchema)