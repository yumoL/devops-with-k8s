import React, { useState, useEffect } from 'react'
import service from './service'

const App = () => {
  const [imgUrl, setImgUrl] = useState()
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
        setImgUrl(data)
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

  const updateTodo = (todo) => {
    console.log(todo)
    service
      .updateTodo(todo.id)
      .then(data => {
        const updatedTodos = todos.map(todo=>todo.id===data.id?todo=data:todo=todo)
        setTodos(updatedTodos)
      })

  }

  const todoItems = todos.map((todo) => 
  <li key={todo.id}>
    <a style={{marginRight:"100px"}}>{todo.content}</a> 
    {todo.done === true ? <>done</> : <button onClick={()=>updateTodo(todo)}>mark as done</button>}
  </li>)

  return (
    <div className="App">
      <img alt="no available image" src={imgUrl} />
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
