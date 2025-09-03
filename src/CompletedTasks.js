import { CheckCircleIcon } from '@heroicons/react/24/solid';

function CompletedTasks({ tasks, onDelete }) {
  const completedTasks = tasks.filter(task => task.completed);

  return (
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
              onClick={() => onDelete(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedTasks;