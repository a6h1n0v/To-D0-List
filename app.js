import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');

  const handleAddTask = () => {
    if (toDo.trim()) {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo(''); // Clear input field after adding task
    }
  };

  const handleCheckboxChange = (id) => {
    setToDos(
      toDos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: !obj.status };
        }
        return obj;
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>My To-Do List</h1>
      </div>

      <div className="inputSection">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
          type="text"
          placeholder="🖊️ Add a new task..."
        />
        <button onClick={handleAddTask} className="addTaskButton">
          Add
        </button>
      </div>

      <div className="taskList">
        {toDos.length === 0 ? (
          <div className="emptyList">No tasks to show</div>
        ) : (
          toDos.map((obj) => (
            <div className={`taskItem ${obj.status ? 'completed' : ''}`} key={obj.id}>
              <div className="left">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(obj.id)}
                  checked={obj.status}
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  className="deleteIcon fas fa-times"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this task?")) {
                      setToDos(toDos.filter((task) => task.id !== obj.id));
                    }
                  }}
                ></i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
