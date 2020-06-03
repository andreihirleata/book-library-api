const {
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
} = require("./helpers");

exports.create = (req, res) => {
  createItem(res, "genre", req.body);
};

exports.read = (req, res) => {
  readItem(res, "genre", req.params.genreId);
};

exports.readAll = (req, res) => {
  readAllItems(res, "genre");
};

exports.update = (req, res) => {
  updateItem(req, res, "genre", req.params.genreId);
};

exports.delete = (req, res) => {
  deleteItem(res, "genre", req.params.genreId);
};
