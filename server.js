const express = require('express')
require('dotenv').config()


const app = express()
console.log(process.env)

app.listen(process.env.PORT)

app.get('/', (req, res) => {
    res.send('send nudes')
})

