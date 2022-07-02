const mongoose = require('mongoose')

const task = mongoose.Schema({
    text : {
        type : String,
        required : [true, 'Please enter th text']
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('task', task)