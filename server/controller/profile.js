const profile = require('../model/profile')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getProfile = async (req,res) =>{
    const user = req.profile
    const data = await profile.findOne({email:user.email}).select("-password").populate({
        path:'order',
    })
    res.send({"get":data})
}

const addProfile = async (req,res) =>{
    const data = req.body 
    const add = await profile.create(data)
    res.send({"add":add})
}


const updateProfile = async (req,res) =>{
    const data = req.body 
    const id = req.params.id
    const update = await profile.findByIdAndUpdate(id,{$set:data})
    res.send({"update":update})
}

const registerProfile = async (req,res) =>{
    try{
        const data = req.body // name , email , password => 'dafsasnxlasdbsaldsa'
        const email = await profile.findOne({email:data.email})
        if(email){
            res.sendStatus(404).send({error:"email da ton tai"})
        }else{
            const encryptPassword = await bcrypt.hash(data.password,15)
            await profile.create({name:data.name,password:encryptPassword,email:data.email})
            res.send({"add":"register Success"})
        }
    }catch(error){ 
        res.status(404).send(error)
    }
}

const loginProfile = async (req,res) =>{
    try{
        const data = req.body 
       const checkEmail = await profile.findOne({email:data.email})
       if(!checkEmail) res.sendStatus(404).send({error:"email khong ton tai"})
       const checkPassword = await bcrypt.compare(data.password,checkEmail.password)
       if(checkPassword){
        const token = await jwt.sign(data,"PRIVATEKEY",{expiresIn:"8h"})
        res.send({token:token})
       }else{
           res.sendStatus(404)
       }
    }catch(error){
        res.status(404).send(error)
    }
}

module.exports = {
    getProfile,
    addProfile,
    updateProfile,
    loginProfile,
    registerProfile
}