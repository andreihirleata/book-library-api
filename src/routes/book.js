const express = require("express");
const bookController = require("../controllers/book");

const router = express.Router();

router.post("/", bookController.create);
router.get("/:bookId", bookController.read);
router.get("/", bookController.readAll);
router.patch("/:bookId", bookController.update);
router.delete("/:bookId", bookController.delete);

module.exports = router;
