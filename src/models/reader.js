module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email is required" },
        isEmail: { msg: "email must be valid" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notNull: { msg: "password is required" },
        len: { args: [8], msg: "the password must have at least 8 characters" },
      },
    },
  };

  const Reader = sequelize.define("Reader", schema);
  return Reader;
};
