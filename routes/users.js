const express = require('express')
const {
   get,
   create
} = require('../controllers/users')

const router = express.Router()

router.post('/', create)
router.get('/', get)



module.exports = router