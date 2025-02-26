
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { ClipLoader } from 'react-spinners';

// const ShowTask = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('https://task-manager-application-server-kappa.vercel.app/tasks');
//         setTasks(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`https://task-manager-application-server-kappa.vercel.app/tasks/${currentTask._id}`, currentTask);
//       setTasks(tasks.map(task => (task._id === currentTask._id ? currentTask : task)));
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       await axios.delete(`https://task-manager-application-server-kappa.vercel.app/tasks/${taskId}`);
//       setTasks(tasks.filter(task => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleDragEnd = (result) => {
//     const { destination, source } = result;
//     if (!destination) return;

//     const reorderedTasks = Array.from(tasks);
//     const [movedTask] = reorderedTasks.splice(source.index, 1);
//     reorderedTasks.splice(destination.index, 0, movedTask);

//     setTasks(reorderedTasks);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ClipLoader size={50} color="#4A90E2" loading={loading} />
//       </div>
//     );
//   }

//   return (
//     <div className="task-grid grid grid-cols-2 gap-4 mx-10">
//       {/* Editing form */}
//       {isEditing && currentTask && (
//         <div className="edit-form p-4 bg-white shadow-lg rounded-lg">
//           <h3 className="font-semibold text-lg mb-2">Edit Task</h3>
//           <input
//             type="text"
//             value={currentTask.title}
//             onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
//             className="mb-2 p-2 border rounded"
//             placeholder="Task title"
//           />
//           <textarea
//             value={currentTask.description}
//             onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
//             className="mb-2 p-2 border rounded"
//             placeholder="Task description"
//           />
//           <input
//             type="text"
//             value={currentTask.category}
//             onChange={(e) => setCurrentTask({ ...currentTask, category: e.target.value })}
//             className="mb-2 p-2 border rounded"
//             placeholder="Category"
//           />
//           <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-lg">Update Task</button>
//           <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded-lg ml-2">Cancel</button>
//         </div>
//       )}

//       {/* Drag and Drop Context */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="flex space-x-4">
//           {/* Left Droppable Area */}
//           <Droppable droppableId="left" direction="vertical">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="task-list p-4 bg-gray-100 rounded-lg flex-1"
//               >
//                 {tasks.slice(0, Math.ceil(tasks.length / 2)).map((task, index) => (
//                   <Draggable key={task._id} draggableId={task._id} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="task-card p-4 bg-white shadow-lg rounded-lg mb-4"
//                       >
//                         <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
//                         <p className="text-gray-700 mb-2">{task.description}</p>
//                         <p className="text-sm text-gray-500">Category: {task.category}</p>
//                         <div className="mt-2">
//                           <button
//                             onClick={() => {
//                               setIsEditing(true);
//                               setCurrentTask(task);
//                             }}
//                             className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(task._id)}
//                             className="bg-red-500 text-white p-2 rounded-lg"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {/* Right Droppable Area */}
//           <Droppable droppableId="right" direction="vertical">
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="task-list p-4 bg-gray-100 rounded-lg flex-1"
//               >
//                 {tasks.slice(Math.ceil(tasks.length / 2)).map((task, index) => (
//                   <Draggable key={task._id} draggableId={task._id} index={index}>
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="task-card p-4 bg-white shadow-lg rounded-lg mb-4"
//                       >
//                         <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
//                         <p className="text-gray-700 mb-2">{task.description}</p>
//                         <p className="text-sm text-gray-500">Category: {task.category}</p>
//                         <div className="mt-2">
//                           <button
//                             onClick={() => {
//                               setIsEditing(true);
//                               setCurrentTask(task);
//                             }}
//                             className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(task._id)}
//                             className="bg-red-500 text-white p-2 rounded-lg"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default ShowTask;


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