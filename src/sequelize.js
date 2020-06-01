const Sequelize = require("sequelize");
const ReaderModel = require("./models/reader");
const BookModel = require("./models/book");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabse = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
  });

  const Reader = ReaderModel(sequelize, Sequelize);
  const Book = BookModel(sequelize, Sequelize);

  sequelize.sync({ alter: true });

  return {
    Reader,
    Book,
  };
};

module.exports = setupDatabse();
