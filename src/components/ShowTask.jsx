

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'To-Do', 'In Progress', 'Done'];
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-manager-application-server-kappa.vercel.app/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    Swal.fire({
      title: 'Edit Task',
      html: `
        <input id="editTitle" class="swal2-input" placeholder="Title" value="${task.title}">
        <textarea id="editDescription" class="swal2-textarea" placeholder="Description">${task.description}</textarea>
        <select id="editCategory" class="swal2-select">
          <option value="To-Do" ${task.category === 'To-Do' ? 'selected' : ''}>To-Do</option>
          <option value="In Progress" ${task.category === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Done" ${task.category === 'Done' ? 'selected' : ''}>Done</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById('editTitle').value,
          description: document.getElementById('editDescription').value,
          category: document.getElementById('editCategory').value,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedTask = {
          ...task,
          title: result.value.title,
          description: result.value.description,
          category: result.value.category,
        };
        setCurrentTask(updatedTask);
        handleUpdate();
      } else {
        setIsEditing(false);
      }
    });
  };

  const handleUpdate = async () => {
    if (!currentTask) {
      console.error('currentTask is null');
      Swal.fire('Error', 'No task selected for update.', 'error');
      setIsEditing(false);
      return;
    }

    try {
      const response = await axios.put(
        `https://task-manager-application-server-kappa.vercel.app/tasks/${currentTask._id}`,
        currentTask
      );

      if (response.status === 200) {
        setTasks(tasks.map((task) => (task._id === currentTask._id ? currentTask : task)));
        setIsEditing(false);
        Swal.fire('Success', 'Task updated successfully', 'success');
      } else {
        Swal.fire('Error', `Update failed with status: ${response.status}`, 'error');
        console.error('Update failed with status:', response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire('Error', 'Task not found on the server.', 'error');
      } else {
        Swal.fire('Error', 'An unexpected error occurred.', 'error');
        console.error('Error updating task:', error);
      }
      setIsEditing(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`https://task-manager-application-server-kappa.vercel.app/tasks/${taskId}`);
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== taskId));
        Swal.fire('Success', 'Task deleted successfully.', 'success');
      } else if (response.status === 404) {
        Swal.fire('Error', 'Task not found.', 'error');
      } else {
        Swal.fire('Error', 'Failed to delete task.', 'error');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire('Error', 'Failed to delete task.', 'error');
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const reorderedTasks = Array.from(tasks);
    const movedTaskIndex = reorderedTasks.findIndex((task) => task._id === draggableId);
    const movedTask = reorderedTasks[movedTaskIndex];

    reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
    movedTask.category = destination.droppableId;

    setTasks(reorderedTasks);

    axios.put(`https://task-manager-application-server-kappa.vercel.app/tasks/${draggableId}`, movedTask).catch((error) => {
      console.error('Error updating task category after drag:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update task category.' });
    });
  };

  const filteredTasks = selectedCategory === 'All'
    ? tasks
    : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="container mx-auto  py-4 px-6">
      <div className="flex justify-center mb-6 bg-orange-100 p-4 rounded-md">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          {categories.slice(1).map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <h2 className="text-lg font-semibold mb-4 text-blue-800">
                    {category}
                  </h2>
                  {filteredTasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card border p-4 bg-white shadow-md rounded-md mb-2"
                          >
                            <h3 className="font-semibold text-gray-800">{task.title}</h3>
                            <p className="text-gray-600">{task.description}</p>
                            <p className="text-sm text-gray-500">{new Date(task.timestamp).toLocaleString()}</p>
                            <div className="mt-4 flex justify-end">
                              <button
                                className="btn btn-primary mr-2 btn-xs"
                                onClick={() => handleEditTask(task)}
                              >
                                Edit
                              </button>
                              
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => handleDelete(task._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default ShowTask;