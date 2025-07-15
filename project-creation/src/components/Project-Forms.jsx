import React, { useState, useEffect } from "react";

function ProjectForm({
  handleCancel,
  handleAddProject,
  handleUpdateProject,
  handleDeleteProject,
  selectedProject,
}) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name);
      setProjectDescription(selectedProject.description);
      setDueDate(selectedProject.dueDate);
    } else {
      setProjectName("");
      setProjectDescription("");
      setDueDate("");
    }
  }, [selectedProject]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const project = {
      id: selectedProject?.id || Date.now().toString(),
      name: projectName,
      description: projectDescription,
      dueDate: dueDate,
    };

    if (selectedProject) {
      handleUpdateProject(project);
    } else {
      handleAddProject(project);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        {selectedProject ? "Edit Project" : "Create New Project"}
      </h2>

      <div>
        <label htmlFor="projectName" className="block font-bold">Name of Project:</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="projectDescription" className="block font-bold">Description of Project:</label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Enter project description"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block font-bold">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <p className="text-sm text-gray-500">Select the due date from the calendar.</p>
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 flex-1"
        >
          {selectedProject ? "Update Project" : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 flex-1"
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
