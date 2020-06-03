module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "title is required" },
      },
    },
    ISBN: DataTypes.STRING,
  };

  const Book = sequelize.define("Book", schema);
  return Book;
};
