import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || [])
    setTodos(savedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
 
  const addTodo = () => {
    if (input.trim() === '') return
    setTodos([...todos, {text: input, completed: false }])
    setInput('')
  }

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? {...todo, completed: !todo.completed} : todo 
    )
    setTodos(newTodos)                                                                                      
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const startEditing = (index) => {
    setEditingIndex(index)
    setEditInput(todos[index].text)
  }

  const saveEdit = () => {
    const newTodos = todos.map((todo, i) => 
    i === editingIndex ? {...todo, text: editInput} : todo)
    setTodos(newTodos)
    cancelEdit()
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditInput('')
  }

  return (
    <div className="App">
      <h1>Список задач</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Добавьте новую задачу"
      />
      <button onClick={addTodo}>Добавить</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {editingIndex === index ? (
              <>
                <input 
                  type="text" 
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(index)}>
                  {todo.text}
                </span>
                <button onClick={() => startEditing(index)}>Change</button>
                <button onClick={() => removeTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;