const User = require('./models/user.js')
const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcrypt')

class dataBase {
    constructor(){
        this.defaultMongoAdress = process.env.DB;
        this.users = User;
    };

    connect = (addr) => {
        if(addr){
            mongoose.connect(this.addr, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log('connected to database'))
                .catch(err => console.log(err.message))
        } else {
            mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log('connected to database'))
                .catch(err => console.log(err.message))
        }
    };

    getAllUsers = (res) => {
        this.users.find()
            .then( (user) => res.json(user))
            .catch(err => err.message)
    }

    addUser = (req, res) => {
        const {login, password, email} = req.body

        // check if data exits
        if(!login || !password || !email)
        return res.status(400).json({
            status: "parsed invalid data"
        })
        
        //check if user with mail exist
        this.users.findOne({ email })
            .then(user => {
                if(user){
                    return res.status(400).json({status: "user already exists"})
                }
                //user dosen't exist
                const tempUser = new this.users({
                    login: login,
                    password: password,
                    email: email
                })
        
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(tempUser.password, salt, (err, hash) => {
                        err ? res.status(500).json({status: "can't hash password"})
                    :
                        tempUser.password = hash
                        console.log('hashing passwd')
                        tempUser.save()
                        .then(user => res.json({
                            status: "properly added new user",
                            user
                        }))
                        .catch(err => err.message)
                    })
                })
            })
    }
    deleteUser = (req, res) => {
        this.users.findById(req.params.id)
            .then(user => user.remove())
            .then(user => res.json({
                status: "deleted propearly user",
                user
            }))
            .catch(err => err.message)
    }

}

module.exports = new dataBase()