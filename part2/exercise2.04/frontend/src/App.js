import React, { useState, useEffect } from 'react'
import service from './service'

const App = () => {
  const [imgBase64, setImgBase64] = useState()
  const [todos, setTodos] = useState([])
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    service
      .getTodos()
      .then(data => {
        setTodos(data)
      })
    service
      .getImage()
      .then(data => {
        setImgBase64(data)
      })

  }, [])

  const addTodo = e => {
    e.preventDefault()
    const newTodo = {
      content: newContent
    }
    service
      .addTodo(newTodo)
      .then(data => {
        setTodos(todos.concat(data))
        setNewContent('')
      })
  }

  const todoItems = todos.map((todo) => <li key={todo.id}>{todo.content}</li>)

  return (
    <div className="App">
      <img alt="no available uimage" src={`data:image/jpeg;base64,${imgBase64}`} />
      <br />
      <br />
      <form onSubmit={addTodo}>
        <input
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
        />
        <button type="submit">add TODO</button>
      </form>
      <ul>{todoItems}</ul>
    </div>
  );
}

export default App;
