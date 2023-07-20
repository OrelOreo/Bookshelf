const jwt = require('jsonwebtoken')
const SECRET_TOKEN = process.env.SECRET_TOKEN

const generateTestAuthToken = (userId) => {
    const payload = {
        userId: userId
    }
    return jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1h' })
}

module.exports = generateTestAuthToken
