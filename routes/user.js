const express = require('express')
const router = express.Router()
const db = require('./../dataBase.js')


//@GET get all users
router.get('/', (req, res) => db.getAllUsers(res) )

//POST create new user
router.post('/', (req, res) => {
    db.addUser(req, res)
})

module.exports = router