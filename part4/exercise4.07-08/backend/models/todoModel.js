module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    content: {
      type: Sequelize.STRING
    },
    done: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return Todo;
};