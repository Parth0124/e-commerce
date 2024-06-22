const Sequelize = require("sequelize");

const sequelize = new Sequelize("e_commerce", "root", "Parth0124", {
  dialect: "mysql",
  host: localhost,
});

module.exports = sequelize