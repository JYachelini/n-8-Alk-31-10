const express = require('express')
const {
   get,
   create,
   remove,
   update
} = require('../controllers/users')

const router = express.Router();


router.get("/", get);
router.post('/', create);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router

