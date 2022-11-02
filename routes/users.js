const express = require("express");
const { get, remove } = require("../controllers/users");
const { check, param } = require("express-validator");

const router = express.Router();

const Validator = [param("id").isInt().withMessage("id must be an integer")];

router.get("/", get);
router.delete("/:id", Validator, remove);
module.exports = router;
