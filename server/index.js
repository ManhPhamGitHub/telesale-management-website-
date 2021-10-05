const express = require('express'),
        app = express(),
        PORT = process.env.PORT || 3001,
        bodyParser = require('body-parser'),
        cors = require("cors"),
        routes = require('./routes/index'),
        mongoose = require('mongoose')

const URI = `mongodb+srv://admin:Manh123456789@cluster0.5bby5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('connected to DB !!!')
        app.listen(PORT,()=>{
            console.log(`server is running on ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

app.use(bodyParser.json({limit:'30mb'}))
app.use(bodyParser.urlencoded({extended:true,limit:'30mb'}))
app.use(cors())


routes(app)
app.use((req,res)=>{    
    res.status(404).send({url:req.originalUrl + ' not found'})
})


