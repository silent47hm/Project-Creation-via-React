import React from "react";
import ProjectForm from "./Project-Forms";

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
    <div className="flex flex-col items-center">     {/*Rendering all the middle content which is in the middle of screen*/}
      {showPage ? (
        selectedProject ? (
          <div className="text-left px-6 py-10 w-full max-w-3xl">
            <h1 className="font-extrabold font-sans text-2xl mb-4">Editing Project</h1>
            <p><strong>Name:</strong> {selectedProject.name}</p>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p><strong>Due Date:</strong> {selectedProject.dueDate}</p>

            {/* Display Task List */}
            {selectedProject.tasks && selectedProject.tasks.length > 0 && (
              <div className="mt-6">
                <h2 className="font-bold text-lg mb-2">Tasks:</h2>
                <ul className="space-y-3 list-disc pl-5">
                  {selectedProject.tasks.map((task) => (
                    <li key={task.id}>
                      <p className="font-medium">{task.description}</p>
                      <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              className="bg-red-500 text-white font-bold px-5 py-2 rounded-[6px] mt-6"
              onClick={() => handleDeleteProject(selectedProject.id)}
            >
              Delete Project
            </button>
          </div>
        ) : (
          // Default Image & Message When No Project is Selected
          <div className="text-center py-60">
            <img
              className="w-40 sm:w-60 md:w-72 mx-auto mb-4"
              src="https://png.pngtree.com/png-clipart/20220910/original/pngtree-message-paper-notepad-and-note-taking-pen-png-image_8529222.png"
              alt="Notepad Illustration"
            />
            <h1 className="font-extrabold font-sans text-2xl">No Project Selected</h1>
            <h2 className="py-3">Select a project or create a new one to get started</h2>
            <button
              className="bg-black text-white font-bold px-5 py-2 rounded-[8px]"
              onClick={() => setShowPage(false)}
            >
              Create New Project
            </button>
          </div>
        )
      ) : (
        <ProjectForm
          handleCancel={handleCancel}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          handleDeleteProject={handleDeleteProject}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
}

export default CenterContent;
