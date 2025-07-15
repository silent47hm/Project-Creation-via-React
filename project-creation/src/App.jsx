import React, { useState, useEffect } from "react";
import CenterContent from "./components/Center-content";
import CalendarView from "./components/Calendar-view";

function App() {
  const [showPage, setShowPage] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

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

  // Add new project
  const handleAddProject = (newProject) => {
    const isDuplicate = projects.some(
      (project) => project.name === newProject.name
    );
    if (isDuplicate) {
      alert("Project name must be unique!");
      return;
    }

    const projectWithId = {
      ...newProject,
      id: Date.now().toString(),
      tasks: newProject.tasks || [], // ✅ ensure tasks is always an array
    };

    setProjects([...projects, projectWithId]);
    setShowPage(true);
  };

  // Select a project to view or edit
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setShowPage(false);
  };

  // Update an existing project
  const handleUpdateProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
    setShowPage(true);
    setSelectedProject(null);
  };

  // Delete a project
  const handleDeleteProject = (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
    setShowPage(true);
    setSelectedProject(null);
  };

  // Cancel and go back to list view
  const handleCancel = () => {
    setShowPage(true);
    setSelectedProject(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-black mt-9 px-4 py-4">
        <h1 className="text-white font-bold font-sans text-3xl pt-5">
          Your Project
        </h1>
        <button
          className="bg-white font-bold font-sans text-xl my-4 w-full rounded-[6px]"
          onClick={() => {
            setSelectedProject(null);
            setShowPage(false);
          }}
        >
          + Add Project
        </button>

        <button
          className="bg-yellow-500 font-bold font-sans text-xl my-2 w-full rounded-[6px] text-white"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {showCalendar ? "Back to Projects" : "📅 View Calendar"}
        </button>
        <p className="text-white">Learning React</p>

        {/* Saved Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-xl pt-3">Saved Projects:</h2>
            <ul className="list-disc text-white">
              {projects.map((project) => (
                <li className="list-none text-white" key={project.id}>
                  <button
                    className="text-white font-bold text-3xl hover:underline cursor-pointer"
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
<div className="w-full md:w-3/4 px-4">
  {showCalendar ? (
    <CalendarView projects={projects} />
  ) : (
    <CenterContent
      showPage={showPage}
      setShowPage={setShowPage}
      handleCancel={handleCancel}
      handleAddProject={handleAddProject}
      handleUpdateProject={handleUpdateProject}
      handleDeleteProject={handleDeleteProject}
      selectedProject={selectedProject}
    />
  )}
</div>
    </div>
  );
}

export default App;
