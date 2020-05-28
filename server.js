const express = require('express')
require('dotenv').config()
const user = require('./routes/user.js')
const db = require('./dataBase.js')

const app = express()
app.use(express.json())
app.use('/user', user)

app.listen(process.env.PORT)

db.connect()

app.get('/', (req, res) => {
    console.log(req)
    res.send('send nudes')
})

