let todos = [
  {
    id: 1,
    content: 'write seminar paper'
  },
  {
    id: 2,
    content: 'play table tennis'
  },
  {
    id: 3,
    content: 'go shopping'
  }
]

const generateId = () => {
  const maxId = todos.length > 0
    ? Math.max(...todos.map(t => t.id))
    : 0
  return maxId + 1
}

const getTodos = () => {
  return todos
}

const addTodos = (newTodo) =>{
  const todo = {
    id: generateId(),
    ...newTodo
  }
  todos = todos.concat(todo)
  return todo
}

module.exports = {
  getTodos,
  addTodos
}