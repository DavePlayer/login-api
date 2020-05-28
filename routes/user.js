const express = require('express')
const User = require('./../models/user.js')

const router = express.Router()


//get all users
router.get('/', (req, res) => {
    User.find()
        .then( (user) => {
            res.json(user)
        })
})

module.exports = router