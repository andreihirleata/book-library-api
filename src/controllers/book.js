const {
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
} = require("./helpers");

exports.create = (req, res) => {
  createItem(res, "book", req.body);
};

exports.read = (req, res) => {
  readItem(res, "book", req.params.bookId);
};

exports.readAll = (req, res) => {
  readAllItems(res, "book");
};

exports.update = (req, res) => {
  updateItem(req, res, "book", req.params.bookId);
};

exports.delete = (req, res) => {
  deleteItem(res, "book", req.params.bookId);
};
