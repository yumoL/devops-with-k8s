const db = require('../models')
const NATS = require('nats')

const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://nats:4222',
  json: true
})

db.sequelize.sync()

const Todo = db.todos

/**
 * create = true, create a new todo
 * otherwise update an existing todo
 */
const publishTodo = async(create, todo) => {
  if(create){
    msg = 'create a new todo'
  } else {
    msg = 'mark a todo as done'
  }
  pub = {
    msg,
    ...todo
  }
  nc.publish('todo_list', pub, ()=>{
    console.log('todo has been published')
  })
}

const getTodos = async () => {
  let todos = await Todo.findAll()
  todos = todos.map(todo => todo.dataValues)
  //console.log(todos)
  return todos
}

const addTodos = async (newTodo) => {
  const todo = await Todo.create(newTodo)
  //console.log(todo.dataValues)
  return todo.dataValues
}

const markDone = async (id) => {
  let todo = await Todo.findOne({
    where: { id: id }
  })
  todo = await todo.update({
    done: true
  })
  return todo.dataValues
}

module.exports = {
  getTodos,
  addTodos,
  markDone,
  publishTodo
}