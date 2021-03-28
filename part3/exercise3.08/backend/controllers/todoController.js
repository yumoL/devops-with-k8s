const { todos } = require('../models')
const db = require('../models')

db.sequelize.sync()

const Todo = db.todos

const getTodos = async() => {
  let todos = await Todo.findAll()
  todos = todos.map(todo=>todo.dataValues)
  //console.log(todos)
  return todos
}

const addTodos = async (newTodo) =>{
  const todo = await Todo.create(newTodo)
  console.log(todo.dataValues)
  return todo.dataValues
}

module.exports = {
  getTodos,
  addTodos
}