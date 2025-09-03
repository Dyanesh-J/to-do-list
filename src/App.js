import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditValue(tasks[index].text);
  };

  const handleSaveEdit = () => {
    const newTasks = [...tasks];
    newTasks[editingIndex].text = editValue;
    setTasks(newTasks);
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-300 mb-6">To-Do List</h1>
        <div className="flex mb-6">
          <input
            type="text"
            className="flex-grow p-3 bg-gray-700 text-white border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="p-3 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-md mb-3 shadow-md"
            >
              <div className="flex items-center w-full">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="mr-3 w-5 h-5 text-indigo-500 bg-gray-800 rounded border-gray-600 focus:ring-indigo-500"
                />
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-grow bg-gray-600 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <span
                    className={`flex-grow text-lg ${
                      task.completed ? 'line-through text-gray-400' : 'text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex gap-2 ml-3">
                {editingIndex === index ? (
                  <button
                    onClick={handleSaveEdit}
                    className="px-2 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(index)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;