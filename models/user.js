const mongoose = require('mongoose')

const user = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'please add a name']
    },
    email : {
        type : String,
        required : [true, 'please add an email']
    },
    password : {
        type : String,
        required : [true, 'please add a password']
    }
})