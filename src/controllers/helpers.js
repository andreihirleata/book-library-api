const { Book } = require("../sequelize");
const { Reader } = require("../sequelize");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

const get404error = (model) => {
  return { error: `The ${model} could not be found.` };
};

const getAllItems = (res, model) => {
  const Model = getModel(model);

  Model.findAll().then((allItems) => {
    res.status(200).json(allItems);
  });
};

const createItem = (res, model, item) => {
  const Model = getModel(model);

  Model.create(item)
    .then((createdItem) => {
      res.status(201).json(createdItem);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const readItem = (res, model, id) => {
  const parsedId = parseInt(id, 10);
  const Model = getModel(model);

  Model.findByPk(parsedId).then((item) => {
    if (!item) {
      res.status(404).json(get404error(model));
    } else {
      res.status(200).json(item);
    }
  });
};

const updateItem = (req, res, model, id) => {
  const parsedId = parseInt(id, 10);
  const Model = getModel(model);

  Model.update(req.body, { where: { id: parsedId } })
    .then(([updatedRows]) => {
      if (!updatedRows) {
        res.status(404).json(get404error(model));
      } else {
        res.status(200).json(updatedRows);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const readAllItems = (res, model) => {
  const Model = getModel(model);

  Model.findAll().then((items) => {
    res.status(200).json(items);
  });
};

const deleteItem = (res, model, id) => {
  const parsedId = parseInt(id, 10);
  const Model = getModel(model);

  Model.destroy({ where: { id: parsedId } }).then((deletedRow) => {
    if (!deletedRow) {
      res.status(404).json(get404error(model));
    } else {
      res.status(204).json(deletedRow);
    }
  });
};

module.exports = {
  getModel,
  get404error,
  getAllItems,
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
};
