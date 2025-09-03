import React from 'react';

function CompletedTasks({ tasks, onDelete }) {
  const completed = tasks.filter((task) => task.completed);

  if (completed.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-indigo-200 mb-4">Completed Tasks</h2>
      <ul>
        {completed.map((task, index) => {
          const originalIndex = tasks.indexOf(task);
          return (
            <li
              key={originalIndex}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-md mb-3 shadow-md"
            >
              <span className="text-lg line-through text-gray-400">{task.text}</span>
              <button
                onClick={() => onDelete(originalIndex)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CompletedTasks;
