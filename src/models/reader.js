module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  const Reader = sequelize.define("Reader", schema);
  return Reader;
};
