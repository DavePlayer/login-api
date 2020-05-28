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
            mongoose.connect(this.addr)
                .then(() => console.log('connected to database'))
                .catch(err => console.log(err.message))
        } else {
            mongoose.connect(process.env.DB)
                .then(() => console.log('connected to database'))
                .catch(err => console.log(err.message))
        }
    };
}

module.exports = new dataBase()