import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Task List</h1>
      <input 
        type="text"
        
        placeholder='Add new task...'
      />
      <button>Add</button>
      <ul></ul>
    </div>
  );
}

export default App;
