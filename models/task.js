const mongoose = require('mongoose')

const task = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    text : {
        type : String,
        required : [true, 'Please enter th text']
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('task', task)