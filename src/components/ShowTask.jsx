
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ShowTask = () => {
//   const [tasks, setTasks] = useState([]);  // Store task data
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [isEditing, setIsEditing] = useState(false);  // Editing state for task
//   const [currentTask, setCurrentTask] = useState(null);  // Currently editing task

//   useEffect(() => {
//     console.log("Fetching tasks...");
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/tasks');
//         console.log(response.data, "Data from server");
//         setTasks(response.data);  // Set tasks in state
//         setLoading(false);  // Set loading state to false after fetch
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle updating a task
//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`http://localhost:5000/tasks/${currentTask._id}`, currentTask);
//       console.log("Updated task:", response.data);
//       setTasks(tasks.map(task => (task._id === currentTask._id ? currentTask : task))); // Update the task in state
//       setIsEditing(false);  // Close the editing form
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Handle deleting a task
//   const handleDelete = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${taskId}`);
//       console.log("Deleted task:", taskId);
//       setTasks(tasks.filter(task => task._id !== taskId));  
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

  
//   if (loading) {
//     return <div>Loading tasks...</div>;
//   }

//   return (
//     <div className="task-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {/* Display editing form if isEditing is true */}
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

//       {/* Display tasks */}
//       {Array.isArray(tasks) && tasks.length > 0 ? (
//         tasks.map((task) => (
//           <div key={task._id} className="task-card p-4 bg-white shadow-lg rounded-lg">
//             <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
//             <p className="text-gray-700 mb-2">{task.description}</p>
//             <p className="text-sm text-gray-500">Category: {task.category}</p>
//             <p className="text-sm text-gray-500">Timestamp: {new Date(task.timestamp).toLocaleString()}</p>

//             {/* Edit and Delete buttons */}
//             <div className="mt-2">
//               <button
//                 onClick={() => {
//                   setIsEditing(true);
//                   setCurrentTask(task);  // Set the task for editing
//                 }}
//                 className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(task._id)}  // Delete task
//                 className="bg-red-500 text-white p-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No tasks available.</p>
//       )}
//     </div>
//   );
// };

// export default ShowTask;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const ShowTask = () => {
//   const [tasks, setTasks] = useState([]); // Store task data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [isEditing, setIsEditing] = useState(false); // Editing state for task
//   const [currentTask, setCurrentTask] = useState(null); // Currently editing task

//   useEffect(() => {
//     console.log("Fetching tasks...");
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/tasks');
//         console.log(response.data, "Data from server");
//         setTasks(response.data); // Set tasks in state
//         setLoading(false); // Set loading state to false after fetch
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // Handle updating a task
//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(`http://localhost:5000/tasks/${currentTask._id}`, currentTask);
//       console.log("Updated task:", response.data);
//       setTasks(tasks.map(task => (task._id === currentTask._id ? currentTask : task))); // Update the task in state
//       setIsEditing(false); // Close the editing form
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   // Handle deleting a task
//   const handleDelete = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${taskId}`);
//       console.log("Deleted task:", taskId);
//       setTasks(tasks.filter(task => task._id !== taskId));
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Handle task order change (drag-and-drop)
//   const handleDragEnd = (result) => {
//     const { destination, source } = result;
//     if (!destination) return; // If there's no destination, do nothing

//     const reorderedTasks = Array.from(tasks);
//     const [movedTask] = reorderedTasks.splice(source.index, 1);
//     reorderedTasks.splice(destination.index, 0, movedTask);

//     setTasks(reorderedTasks); // Update state with new task order
//   };

//   if (loading) {
//     return <div>Loading tasks...</div>;
//   }

//   return (
//     <div className="task-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-1/2 mx-auto">
//       {/* Display editing form if isEditing is true */}
//       {isEditing && currentTask && (
//         <div className="edit-form p-4 bg-white shadow-lg rounded-lg col-span-full">
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
//         <Droppable droppableId="tasks" direction="vertical">
//           {(provided) => (
//             <div
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               className="task-list"
//             >
//               {Array.isArray(tasks) && tasks.length > 0 ? (
//                 tasks.map((task, index) => (
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
//                         <p className="text-sm text-gray-500">Timestamp: {new Date(task.timestamp).toLocaleString()}</p>

//                         {/* Edit and Delete buttons */}
//                         <div className="mt-2">
//                           <button
//                             onClick={() => {
//                               setIsEditing(true);
//                               setCurrentTask(task); // Set the task for editing
//                             }}
//                             className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(task._id)} // Delete task
//                             className="bg-red-500 text-white p-2 rounded-lg"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))
//               ) : (
//                 <p>No tasks available.</p>
//               )}
//               {provided.placeholder} 
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default ShowTask;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ClipLoader } from 'react-spinners';

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-manager-application-server-kappa.vercel.app/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://task-manager-application-server-kappa.vercel.app/tasks/${currentTask._id}`, currentTask);
      setTasks(tasks.map(task => (task._id === currentTask._id ? currentTask : task)));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-application-server-kappa.vercel.app/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" loading={loading} />
      </div>
    );
  }

  return (
    <div className="task-grid grid grid-cols-2 gap-4 mx-10">
      {/* Editing form */}
      {isEditing && currentTask && (
        <div className="edit-form p-4 bg-white shadow-lg rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Edit Task</h3>
          <input
            type="text"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            className="mb-2 p-2 border rounded"
            placeholder="Task title"
          />
          <textarea
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            className="mb-2 p-2 border rounded"
            placeholder="Task description"
          />
          <input
            type="text"
            value={currentTask.category}
            onChange={(e) => setCurrentTask({ ...currentTask, category: e.target.value })}
            className="mb-2 p-2 border rounded"
            placeholder="Category"
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded-lg">Update Task</button>
          <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded-lg ml-2">Cancel</button>
        </div>
      )}

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4">
          {/* Left Droppable Area */}
          <Droppable droppableId="left" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-list p-4 bg-gray-100 rounded-lg flex-1"
              >
                {tasks.slice(0, Math.ceil(tasks.length / 2)).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-card p-4 bg-white shadow-lg rounded-lg mb-4"
                      >
                        <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                        <p className="text-gray-700 mb-2">{task.description}</p>
                        <p className="text-sm text-gray-500">Category: {task.category}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setCurrentTask(task);
                            }}
                            className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-500 text-white p-2 rounded-lg"
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

          {/* Right Droppable Area */}
          <Droppable droppableId="right" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="task-list p-4 bg-gray-100 rounded-lg flex-1"
              >
                {tasks.slice(Math.ceil(tasks.length / 2)).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-card p-4 bg-white shadow-lg rounded-lg mb-4"
                      >
                        <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                        <p className="text-gray-700 mb-2">{task.description}</p>
                        <p className="text-sm text-gray-500">Category: {task.category}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setCurrentTask(task);
                            }}
                            className="bg-yellow-500 text-white p-2 rounded-lg mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="bg-red-500 text-white p-2 rounded-lg"
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
        </div>
      </DragDropContext>
    </div>
  );
};

export default ShowTask;
