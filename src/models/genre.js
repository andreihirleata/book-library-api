module.exports = (sequelize, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "genre is required" },
        notEmpty: { msg: "genre field cannot be blank" },
      },
    },
  };
  const Genre = sequelize.define("Genre", schema);
  return Genre;
};
