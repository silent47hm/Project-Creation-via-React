import React, { useState, useEffect } from "react";

function ProjectForm({ handleCancel, handleAddProject, handleUpdateProject, selectedProject }) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // If a project is selected for editing, populate the form with its details
  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name);
      setProjectDescription(selectedProject.description);
      setDueDate(selectedProject.dueDate);
    }
  }, [selectedProject]);

  // Handle form submission (either create or update project)
  const handleSubmit = (event) => {
    event.preventDefault();
    const project = { name: projectName, description: projectDescription, dueDate: dueDate };
    if (selectedProject) {
      handleUpdateProject(project); // Update the selected project
    } else {
      handleAddProject(project); // Add a new project
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div>
        <label htmlFor="projectName" className="block font-bold">
          Name of Project:
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="projectDescription" className="block font-bold">
          Description of Project:
        </label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Enter project description"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="dueDate" className="block font-bold">
          Due Date:
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <p className="text-sm text-gray-500">Select the due date from the calendar.</p>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          {selectedProject ? "Update Project" : "Submit"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
