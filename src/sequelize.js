const Sequelize = require("sequelize");
const ReaderModel = require("./models/reader");
const BookModel = require("./models/book");
const AuthorModel = require("./models/author");
const GenreModel = require("./models/genre");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabse = () => {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
    },
  });

  const Reader = ReaderModel(sequelize, Sequelize);
  const Book = BookModel(sequelize, Sequelize);
  const Author = AuthorModel(sequelize, Sequelize);
  const Genre = GenreModel(sequelize, Sequelize);

  Genre.hasMany(Book);
  Book.belongsTo(Genre);
  Author.hasMany(Book);
  Book.belongsTo(Author);

  sequelize.sync({ alter: true });

  return {
    Reader,
    Book,
    Author,
    Genre,
  };
};

module.exports = setupDatabse();
