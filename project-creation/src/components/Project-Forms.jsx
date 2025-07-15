import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function ProjectForm({
  handleCancel,
  handleAddProject,
  handleUpdateProject,
  handleDeleteProject,
  selectedProject,
}) {
  const [projectName, setProjectName] = useState("");   //Usestate Remember State-FInal SetSatate-COnstant Changes value
  const [projectDescription, setProjectDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  const [taskDesc, setTaskDesc] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {                                    //Usestate used to data fetch and 3 stages will happen here
    if (selectedProject) {
      setProjectName(selectedProject.name);
      setProjectDescription(selectedProject.description);
      setDueDate(selectedProject.dueDate);
      setTasks(selectedProject.tasks || []);
    } else {
      setProjectName("");
      setProjectDescription("");
      setDueDate("");
      setTasks([]);
    }
  }, [selectedProject]);

  const handleSubmit = (e) => {                
    e.preventDefault();

    const project = {
      id: selectedProject?.id || Date.now().toString(),
      name: projectName,
      description: projectDescription,
      dueDate,
      tasks,
    };

    if (selectedProject) {
      handleUpdateProject(project);
    } else {
      handleAddProject(project);
    }
  };

  const handleAddOrUpdateTask = () => {
    if (!taskDesc || !taskAssignee) return;

    if (editingTaskId) {
      const updated = tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, description: taskDesc, assignee: taskAssignee }
          : task
      );
      setTasks(updated);
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        description: taskDesc,
        assignee: taskAssignee,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTaskDesc("");
    setTaskAssignee("");
  };

  const handleEditTask = (task) => {
    setTaskDesc(task.description);
    setTaskAssignee(task.assignee);
    setEditingTaskId(task.id);
  };

  const handleDeleteTask = (taskId) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    setTasks(updated);

    if (editingTaskId === taskId) {
      setTaskDesc("");
      setTaskAssignee("");
      setEditingTaskId(null);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  let filteredTasks = tasks;
  if (filterStatus === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filterStatus === "incomplete") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (sortOption === "name-asc") {
    filteredTasks.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortOption === "name-desc") {
    filteredTasks.sort((a, b) => b.description.localeCompare(a.description));
  } else if (sortOption === "assignee") {
    filteredTasks.sort((a, b) => a.assignee.localeCompare(b.assignee));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {selectedProject ? "Edit Project" : "Create New Project"}
      </h2>

      <div>
        <label className="block font-bold">Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-bold">Project Description:</label>
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-bold">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Tasks</h3>

        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            type="text"
            placeholder="Task description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Assignee"
            value={taskAssignee}
            onChange={(e) => setTaskAssignee(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={handleAddOrUpdateTask}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingTaskId ? "Update" : "+ Add"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 my-4">
          <div>
            <label className="font-semibold block mb-1">Filter:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div>
            <label className="font-semibold block mb-1">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="none">None</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="assignee">Assignee (A-Z)</option>
            </select>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-1">
              Progress: {completedCount} of {totalCount} completed ({progressPercent}%)
            </p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) return;
            if (filterStatus !== "all" || sortOption !== "none") {
              alert("Reordering is disabled while filtering or sorting.");
              return;
            }

            const reordered = Array.from(tasks);
            const [movedItem] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, movedItem);
            setTasks(reordered);
          }}
        >
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 mt-4"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex justify-between items-center bg-gray-100 p-2 rounded ${
                          snapshot.isDragging ? "shadow-lg bg-white" : ""
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                          />
                          <div>
                            <p
                              className={`font-semibold ${
                                task.completed ? "line-through text-gray-400" : ""
                              }`}
                            >
                              {task.description}
                            </p>
                            <p className="text-sm text-gray-600">
                              Assigned to: {task.assignee}
                            </p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEditTask(task)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full sm:w-1/2"
        >
          {selectedProject ? "Update Project" : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 w-full sm:w-1/2"
        >
          Cancel
        </button>
      </div>

      {selectedProject && (
        <button
          type="button"
          onClick={() => handleDeleteProject(selectedProject.id)}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-800 mt-4 w-full"
        >
          Delete Project
        </button>
      )}
    </form>
  );
}

export default ProjectForm;
