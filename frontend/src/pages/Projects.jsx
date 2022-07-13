import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Kanban from "../components/Todoapp/Kanban";

const Projects = () => {
  return (
    <div className="projects">
      <Sidebar />
      <div className="projects__main">
        <Navbar />
        <div className="projects__wrapper">
          <h1>Projects</h1>
          <Kanban />
        </div>
      </div>
    </div>
  );
};

export default Projects;
