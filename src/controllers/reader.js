const { Reader } = require("../sequelize");

exports.create = (req, res) => {
  Reader.create(req.body).then((reader) => res.status(201).json(reader));
};

exports.read = (req, res) => {
  const readerId = parseInt(req.params.readerId, 10);
  Reader.findByPk(readerId).then((reader) => {
    if (!reader) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(reader);
    }
  });
};

exports.readAll = (req, res) => {
  Reader.findAll().then((readers) => {
    res.status(200).json(readers);
  });
};

exports.update = (req, res) => {
  const id = parseInt(req.params.readerId, 10);
  Reader.update(req.body, { where: { id } }).then(([updatedRows]) => {
    if (!updatedRows) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(200).json(updatedRows);
    }
  });
};

exports.delete = (req, res) => {
  const readerId = parseInt(req.params.readerId, 10);
  Reader.destroy({ where: { id: readerId } }).then((deletedRow) => {
    if (!deletedRow) {
      res.status(404).json({ error: "The reader could not be found." });
    } else {
      res.status(204).json(deletedRow);
    }
  });
};
