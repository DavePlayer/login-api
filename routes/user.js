const express = require('express')
const router = express.Router()
const db = require('./../dataBase.js')


//@GET get all users
router.get('/', (req, res) => {
    db.user.find()
        .then( (user) => {
            res.json(user)
        })
})

module.exports = router