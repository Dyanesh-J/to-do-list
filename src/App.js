import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

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
    const wasCompleted = newTasks[index].completed;

    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);

    if (!wasCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#22d3ee', '#f472b6']
      });
    }
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

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-10 text-white">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          ✨ My Tasks
        </h1>

        <div className="flex gap-4 mb-10">
          <input
            type="text"
            className="flex-grow px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            placeholder="Type your task here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            Add Task
          </button>
        </div>

        {/* Active Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-pink-300 mb-4">📝 Active Tasks</h2>
          <ul className="space-y-4">
            {activeTasks.map((task, index) => {
              const originalIndex = tasks.indexOf(task);
              return (
                <li
                  key={originalIndex}
                  className="flex items-center justify-between bg-white/10 p-4 rounded-xl shadow-md hover:bg-white/20 transition"
                >
                  <div className="flex items-center gap-4 w-full">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(originalIndex)}
                      className="w-5 h-5 accent-pink-500"
                    />
                    {editingIndex === originalIndex ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-grow bg-white/10 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <span className="flex-grow text-lg">{task.text}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {editingIndex === originalIndex ? (
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditTask(originalIndex)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">✅ Completed Tasks</h2>
          <ul className="space-y-4">
            {completedTasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white/10 p-4 rounded-xl shadow-md hover:bg-white/20 transition"
              >
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                  <span className="line-through text-white text-lg">{task.text}</span>
                </div>
                <button
                  onClick={() => handleDeleteTask(tasks.indexOf(task))}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
