const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: { type: String },
    password: { type: String },
    // todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todos' }]
})

module.exports = mongoose.model('Users', userSchema)