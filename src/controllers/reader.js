const {
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
} = require("./helpers");

exports.create = (req, res) => {
  createItem(res, "reader", req.body);
};

exports.read = (req, res) => {
  readItem(res, "reader", req.params.readerId);
};

exports.readAll = (req, res) => {
  readAllItems(res, "reader");
};

exports.update = (req, res) => {
  updateItem(req, res, "reader", req.params.readerId);
};

exports.delete = (req, res) => {
  deleteItem(res, "reader", req.params.readerId);
};
