import React from "react";
import ProjectForm from "./Project-Forms"; // Import the ProjectForm component

function CenterContent({
  showPage,
  setShowPage,
  handleCancel,
  handleAddProject,
  handleUpdateProject,
  handleDeleteProject,
  selectedProject,
}) {
  return (
    <div className="flex flex-col items-center">
      {showPage ? (
        // Show list of projects if showPage is true
        <div className="text-center py-60">
          {selectedProject ? (
            // If a project is selected, show its details
            <div>
              <h1 className="font-extrabold font-sans text-2xl">
                Editing Project
              </h1>
              <p><strong>Name:</strong> {selectedProject.name}</p>
              <p><strong>Description:</strong> {selectedProject.description}</p>
              <p><strong>Due Date:</strong> {selectedProject.dueDate}</p>
              <button
                className="bg-red-500 text-white font-bold px-5 py-2 rounded-[6px] mt-3"
                onClick={() => handleDeleteProject(selectedProject.name)} // Delete the project
              >
                Delete Project
              </button>
            </div>
          ) : (
            <div>
              <img
                className="w-70"
                src="https://png.pngtree.com/png-clipart/20220910/original/pngtree-message-paper-notepad-and-note-taking-pen-png-image_8529222.png"
                alt=""
              />
              <h1 className="font-extrabold font-sans text-2xl">No Project Selected</h1>
              <h2 className="py-3">Select a new project to get started with a new one</h2>
              <button
                className="bg-black text-white font-bold px-5 py-2 rounded-[8px]"
                onClick={() => setShowPage(false)} // Show the form to create a new project
              >
                Create New Project
              </button>
            </div>
          )}
        </div>
      ) : (
        // When showPage is false, the ProjectForm is displayed
        <ProjectForm
          handleCancel={handleCancel}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          selectedProject={selectedProject} // Pass the selected project for editing
        />
      )}
    </div>
  );
}

export default CenterContent;
