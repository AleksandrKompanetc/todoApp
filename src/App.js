import React, { useState } from "react"
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim() === '') return
    setTodos([...todos, input])
    setInput('')
  }

  const removeTodo = (index) => {
    const newList = todos.filter((_, i) => i !== index)
    setTodos(newList)
  }
 
  return (
    <div className="App">
      <h1>List task</h1>
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter new task..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;