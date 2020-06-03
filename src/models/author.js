module.exports = (sequelize, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "author is required" },
        notEmpty: { msg: "author field cannot be blank" },
      },
    },
  };
  const Author = sequelize.define("Author", schema);
  return Author;
};
