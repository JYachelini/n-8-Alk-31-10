const express = require("express");
const { get, remove } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.delete("/:id", remove);

module.exports = router;
