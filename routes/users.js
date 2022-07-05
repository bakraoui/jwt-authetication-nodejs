const express = require('express')

const router = express.Router()

const {protect} = require('../middlewares/authMiddleware')
const {register, login, getMe} = require('../controllers/usersController')
router.post('/',register)
router.post('/login', login)
//  to protect this route add the middlwware as second argument
router.get('/', protect ,getMe)

module.exports = router