const User = require('./models/user.js')
const mongoose = require('mongoose')
require('dotenv').config()

class dataBase {
    constructor(){
        this.defaultMongoAdress = process.env.DB;
        this.user = User;
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
        this.user.find()
            .then( (user) => res.json(user))
            .catch(err => err.message)
    }

    addUser = (req, res) => {
        console.log(req.body, "cos robie")
        const tempUser = new this.user({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        }) 
        tempUser.save()
            .then(user => res.json(user))
    }


}

module.exports = new dataBase()