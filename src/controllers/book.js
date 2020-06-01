const { Book } = require("../sequelize");

exports.create = (req, res) => {
  Book.create(req.body)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.read = (req, res) => {
  const bookId = parseInt(req.params.bookId, 10);
  Book.findByPk(bookId).then((book) => {
    if (!book) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(200).json(book);
    }
  });
};

exports.readAll = (req, res) => {
  Book.findAll().then((books) => {
    res.status(200).json(books);
  });
};

exports.update = (req, res) => {
  const id = parseInt(req.params.bookId, 10);
  Book.update(req.body, { where: { id } }).then(([updatedRows]) => {
    if (!updatedRows) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(200).json(updatedRows);
    }
  });
};

exports.delete = (req, res) => {
  const bookId = parseInt(req.params.bookId, 10);
  Book.destroy({ where: { id: bookId } }).then((deletedRows) => {
    if (!deletedRows) {
      res.status(404).json({ error: "The book could not be found." });
    } else {
      res.status(204).json(deletedRows);
    }
  });
};
