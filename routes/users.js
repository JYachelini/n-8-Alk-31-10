const express = require("express");

const { get, remove, update } = require("../controllers/users");

const router = express.Router();

router.get("/", get);
router.delete("/:id", remove);
router.put("/:id", update);

module.exports = router;
