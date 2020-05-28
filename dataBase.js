const User = require('./models/user.js')
const mongoose = require('mongoose')
require('dotenv').config()

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
        console.log(req.body, "cos robie")
        const tempUser = new this.users({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        }) 
        tempUser.save()
            .then(user => res.json(user))
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