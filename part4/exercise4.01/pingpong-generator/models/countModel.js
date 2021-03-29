module.exports = (sequelize, Sequelize) => {
  const Count = sequelize.define("counts", {
    count: {
      type: Sequelize.INTEGER
    },
  });

  return Count;
};