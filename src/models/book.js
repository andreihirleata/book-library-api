module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "author is required" },
      },
    },
    ISBN: DataTypes.STRING,
  };

  const Book = sequelize.define("Book", schema);
  return Book;
};
