import React, { useState, useEffect } from "react";
import CenterContent from "./components/Center-content";

function App() {
  const [showPage, setShowPage] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects) {
      setProjects(savedProjects);
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (projects.length === 0) {
      localStorage.removeItem("projects");
    } else {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects]);

  const handleAddProject = (newProject) => {
    const isDuplicate = projects.some((project) => project.name === newProject.name);
    if (isDuplicate) {
      alert("Project name must be unique!");
      return;
    }

    const projectWithId = { ...newProject, id: Date.now().toString() };
    setProjects([...projects, projectWithId]);
    setShowPage(true);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setShowPage(false);
  };

  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setShowPage(true);
    setSelectedProject(null);
  };

  const handleDeleteProject = (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
    setShowPage(true);
    setSelectedProject(null);
  };

  const handleCancel = () => {
    setShowPage(true);
    setSelectedProject(null);
  };

  return (
    <div className="flex h-[915px]">
      {/* Sidebar */}
      <div className="flex-1 bg-black mt-9 px-8 py-4">
        <h1 className="text-white font-bold font-sans text-3xl pt-5">Your Project</h1>
        <button
          className="bg-white font-bold font-sans text-xl my-4 w-full rounded-[6px]"
          onClick={() => {
            setSelectedProject(null);
            setShowPage(false);
          }}
        >
          + Add Project
        </button>
        <p className="text-white">Learning React</p>

        {projects.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-xl">Saved Projects:</h2>
            <ul className="list-disc text-white">
              {projects.map((project) => (
                <li key={project.id}>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleSelectProject(project)}
                  >
                    {project.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Center Content */}
      <div className="flex-3">
        <CenterContent
          showPage={showPage}
          setShowPage={setShowPage}
          handleCancel={handleCancel}
          handleAddProject={handleAddProject}
          handleUpdateProject={handleUpdateProject}
          handleDeleteProject={handleDeleteProject}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
}

export default App;
