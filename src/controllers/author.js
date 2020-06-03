const {
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
} = require("./helpers");

exports.create = (req, res) => {
  createItem(res, "author", req.body);
};

exports.read = (req, res) => {
  readItem(res, "author", req.params.authorId);
};

exports.readAll = (req, res) => {
  readAllItems(res, "author");
};

exports.update = (req, res) => {
  updateItem(req, res, "author", req.params.authorId);
};

exports.delete = (req, res) => {
  deleteItem(res, "author", req.params.authorId);
};
