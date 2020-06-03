const express = require("express");
const readerController = require("../controllers/reader");

const router = express.Router();

router.post("/", readerController.create);
router.get("/:readerId", readerController.read);
router.get("/", readerController.readAll);
router.patch("/:readerId", readerController.update);
router.delete("/:readerId", readerController.delete);

module.exports = router;
