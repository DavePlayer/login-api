const express = require('express')
require('dotenv').config()
const user = require('./routes/user.js')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use('/user', user)

app.listen(process.env.PORT)

const db = mongoose.connect(process.env.DB)
.then(() => console.log('connected to database'))
.catch(err => console.log(err.message))

app.get('/', (req, res) => {
    console.log(req)
    res.send('send nudes')
})

