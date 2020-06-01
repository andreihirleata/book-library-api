module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const Book = sequelize.define("Book", schema);
  return Book;
};
