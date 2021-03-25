const dbConfig = require("../dbConfig");

const Sequelize = require("sequelize");

console.log(`index pwd ${dbConfig.PASSWORD}`)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.counts = require("./countModel")(sequelize, Sequelize);

module.exports = db;