
import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'To-Do',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API
      const response = await axios.post('http://localhost:5000/tasks', task);
      
      // On success, clear the form and show success message
      setSuccess('Task added successfully!');
      setError(null);
      setTask({ title: '', description: '', category: 'To-Do' }); // Reset the form
    } catch (error) {
      // If there's an error, show the error message
      setError(error.response?.data?.message || 'Failed to add task');
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-28">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength={50}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength={200}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      {/* Show success or error message */}
      {success && <div className="text-green-500 mt-4">{success}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default AddTask;
