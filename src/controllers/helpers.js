const { Book } = require("../sequelize");
const { Reader } = require("../sequelize");
const { Author } = require("../sequelize");
const { Genre } = require("../sequelize");

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    author: Author,
    genre: Genre,
  };

  return models[model];
};

const getOptions = (model) => {
  if (model === "book") return { include: Genre };

  if (model === "genre") return { include: Book };

  return {};
};

const get404error = (model) => {
  return { error: `The ${model} could not be found.` };
};

const removePassword = (obj) => {
  if (obj.hasOwnProperty("password")) {
    delete obj.password;
  }

  return obj;
};

const createItem = (res, model, item) => {
  const Model = getModel(model);

  Model.create(item)
    .then((createdItem) => {
      const itemWithoutPassword = removePassword(createdItem.dataValues);
      res.status(201).json(itemWithoutPassword);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const readItem = (res, model, id) => {
  const Model = getModel(model);
  const parsedId = parseInt(id, 10);
  const options = getOptions(model);

  return Model.findByPk(parsedId, { ...options }).then((item) => {
    if (!item) {
      res.status(404).json(get404error(model));
    } else {
      const itemWithoutPassword = removePassword(item.dataValues);

      res.status(200).json(itemWithoutPassword);
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
        Model.findByPk(parsedId).then((updatedItem) => {
          const itemWithoutPassword = removePassword(updatedItem.dataValues);
          res.status(200).json(itemWithoutPassword);
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const readAllItems = (res, model) => {
  const Model = getModel(model);
  const options = getOptions(model);

  Model.findAll({ ...options }).then((items) => {
    const itemsWithoutPassword = items.map((item) => {
      return removePassword(item.dataValues);
    });
    res.status(200).json(itemsWithoutPassword);
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
  createItem,
  readItem,
  updateItem,
  readAllItems,
  deleteItem,
};
