const express = require("express");
const genreController = require("../controllers/genre");

const router = express.Router();

router.post("/", genreController.create);
router.get("/:genreId", genreController.read);
router.get("/", genreController.readAll);
router.patch("/:genreId", genreController.update);
router.delete("/:genreId", genreController.delete);

module.exports = router;
