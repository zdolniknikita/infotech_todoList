const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    title: { type: String },
    isdone: { type: Boolean, default: false } 
})

module.exports = mongoose.model('Todos', todoSchema)