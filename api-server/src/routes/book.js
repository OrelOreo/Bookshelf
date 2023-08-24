const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const bookControllers = require('../controllers/book')

router.get('/', bookControllers.getAllBooks)
router.get('/:id', bookControllers.getOneBook)
router.put('/:id', auth, multer, bookControllers.modifyBook)
router.post('/', auth, multer, bookControllers.createOneBook)
router.post('/users/:userId/favorites/:bookId', auth, bookControllers.addBookToFavorites)
router.post('/:id/commentary', auth, bookControllers.postCommentary)
router.delete('/:id', auth, bookControllers.deleteBook)


module.exports = router