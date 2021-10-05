const jwt = require('jsonwebtoken')


const verifyToken = async(req,res,next) =>{
    try{
        const header = req.headers['authorization']
        const token = header.split(' ')[1]
        if(!token) res.sendStatuts(404)
         jwt.verify(token,"PRIVATEKEY",(error,data)=>{
            if(error) res.sendStatus(404)
            req.profile = data
                  next()
        })

    }catch(error){
        res.sendStatuts(404).send(error)
    }
}



const verifyAdmin = async(req,res,next) =>{
    const header = req.headers['authorization']
    const token = header.split(' ')[1]
    if(!token) res.sendStatus(404)
     jwt.verify(token,"PRIVATEKEY",(error,data)=>{
        if(error) res.sendStatuts(404)
        if(data.isAdmin || data.position === 'admin'){
            req.admin = data
                  next()
        }
    })
}

module.exports = {
    verifyToken,
    verifyAdmin
}