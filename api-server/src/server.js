require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise$
const cors = require('cors')

const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')
const MONGO_URL = process.env.MONGO_URL

const start = async() => {
    return new Promise(async(resolve) => {

    const port = process.env.PORT || 3000
    await mongoose.connect(MONGO_URL)
    .then(() => console.log("Connexion réussie !"))
    .catch((e) => console.log("Connexion échouée", e))
    
    const app = express()
    app.use(express.json())
    app.use(cors())
    
    app.use('/api/auth', userRoutes)
    app.use('/api/books', bookRoutes)
    app.use('/images', express.static(path.join('images')))
    if (process.env.NODE_ENV !== 'test') {
        const server = app.listen(port, () => resolve(server))
      } else {
        resolve(app)
      }
    })
}

module.exports = Object.assign({}, {start})