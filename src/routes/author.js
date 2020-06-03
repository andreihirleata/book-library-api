const express = require("express");
const authorController = require("../controllers/author");

const router = express.Router();

router.post("/", authorController.create);
router.get("/:authorId", authorController.read);
router.get("/", authorController.readAll);
router.patch("/:authorId", authorController.update);
router.delete("/:authorId", authorController.delete);

module.exports = router;
