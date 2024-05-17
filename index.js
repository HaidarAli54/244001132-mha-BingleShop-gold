const express = require('express')
const app = express()
const userRouter = require('./internal/routes/user_router')
const bodyParser = require('body-parser')

require('dotenv').config()

app.use(bodyParser.json())

app.get('/ping',(req,res) =>{
    res.status(200).json({massage:'PONG!!'})
});

app.use('/v1', userRouter)

app.use((err, req, res, next)=>{
    console.log(err)

    const status = err.status || 500
    const error = err.error || err.massage || 'internal server error'

    return res.status(status).json({
        status: false,
        data: {},
        error: error
    })
})


const port = process.env.PORT 


app.listen(port,()=>{
    console.log(`server up and running in ${port}`)
})
