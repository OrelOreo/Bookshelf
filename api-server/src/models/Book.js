const mongoose = require('mongoose')

const schema =  mongoose.Schema({
    username: { type: String, required: true },
    comment: { type: String, required: true },
}, { _id: false, timestamps: true, versionKey: false })

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String },
    image: { type: String },
    category: { type: String },
    description: { type: String },
    comments: { type: [schema], default: [] },
    note: { type: Number }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Book', bookSchema)