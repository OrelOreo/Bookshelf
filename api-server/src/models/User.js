const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('User', userSchema)