import React, { useState, useEffect } from "react";
import CenterContent from "./components/Center-content"; // Import CenterContent component

function App() {
  const [showPage, setShowPage] = useState(true); // Toggle between form and content
  const [projects, setProjects] = useState([]); // Store the list of projects
  const [selectedProject, setSelectedProject] = useState(null); // Track the selected project for editing

  // Load projects from localStorage when the app starts
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects) {
      setProjects(savedProjects); // Set projects from localStorage
    }
  }, []);

  // Save projects to localStorage whenever the projects state changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects)); // Save to localStorage
    }
  }, [projects]);

  // Handle adding a new project
  const handleAddProject = (newProject) => {
    const updatedProjects = [...projects, newProject]; // Add new project to the projects list
    setProjects(updatedProjects); // Update state
    setShowPage(true); // Switch back to the project list view
  };

  // Handle selecting a project from the sidebar
  const handleSelectProject = (project) => {
    setSelectedProject(project); // Set the project to be edited
    setShowPage(false); // Show the project details form for editing
  };

  // Handle updating an existing project
  const handleUpdateProject = (updatedProject) => {
    // Map through projects and update the one that matches the updated project
    const updatedProjects = projects.map((project) =>
      project.name === updatedProject.name ? updatedProject : project
    );
    setProjects(updatedProjects); // Update the project list with the new data
    setShowPage(true); // Go back to the list view
    setSelectedProject(null); // Reset the selected project
  };

  // Handle deleting a project
  const handleDeleteProject = (projectName) => {
    const updatedProjects = projects.filter((project) => project.name !== projectName);
    setProjects(updatedProjects); // Remove the project from the list
    setShowPage(true); // Go back to the list view
    setSelectedProject(null); // Reset the selected project
  };

  // Handle canceling the edit and going back to the list
  const handleCancel = () => {
    setShowPage(true); // Reset to the project list view
    setSelectedProject(null); // Reset the selected project
  };

  return (
    <>
      <div className="flex h-[915px]">
        {/* Left Sidebar */}
        <div className="flex-1 bg-black mt-9 px-8 py-4">
          <h1 className="text-white font-bold font-sans text-3xl pt-5">
            Your Project
          </h1>
          <button
            className="bg-white font-bold font-sans text-xl my-4 w-full rounded-[6px]"
            onClick={() => setShowPage(false)} // Show the form when clicked
          >
            + Add Project
          </button>
          <p className="text-white">Learning React</p>

          {/* Show the list of saved projects with just the name */}
          <div>
            {projects.length > 0 && (
              <div>
                <h2 className="text-white font-bold text-xl">Saved Projects:</h2>
                <ul className="list-disc text-white">
                  {projects.map((project, index) => (
                    <li key={index}>
                      <button
                        className="text-blue-500"
                        onClick={() => handleSelectProject(project)} // Select the project to edit
                      >
                        {project.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-3">
          <CenterContent
            showPage={showPage}
            setShowPage={setShowPage}
            handleCancel={handleCancel}
            handleAddProject={handleAddProject} // Pass the add project function
            handleUpdateProject={handleUpdateProject} // Pass the update project function
            handleDeleteProject={handleDeleteProject} // Pass the delete project function
            selectedProject={selectedProject} // Pass the selected project for editing
          />
        </div>
      </div>
    </>
  );
}

export default App;
