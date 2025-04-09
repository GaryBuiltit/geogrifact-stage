import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Site A Excavation",
      description:
        "Archaeological excavation of prehistoric Native American settlement",
      location: "Arizona",
      status: "In Progress",
      startDate: "2024-02-15",
      expectedEndDate: "2024-06-15",
      siteType: "settlement",
      latitude: 34.0489,
      longitude: -111.0937,
      boundaryPoints: [
        [34.0489, -111.0937],
        [34.05, -111.0937],
        [34.05, -111.095],
        [34.0489, -111.095],
      ],
      artifacts: [
        {
          id: 1,
          name: "Ceramic Vessel",
          type: "Pottery",
          material: "Clay",
          condition: "Fragmentary",
          dimensions: "15cm x 10cm",
          dateFound: "2024-03-01",
          description: "Partial vessel with geometric designs",
          location: "Grid A3",
        },
      ],
    },
    {
      id: 2,
      name: "Site B Excavation",
      description: "Survey of potential colonial-era trading post locations.",
      location: "New Mexico",
      status: "Completed",
      startDate: "2024-01-10",
      expectedEndDate: "2024-03-10",
      siteType: "settlement",
      latitude: 34.5199,
      longitude: -105.8701,
      boundaryPoints: [
        [34.5199, -105.8701],
        [34.52, -105.8701],
        [34.52, -105.872],
        [34.5199, -105.872],
      ],
      artifacts: [
        {
          id: 1,
          name: "Ceramic Vessel",
          type: "Pottery",
          material: "Clay",
          condition: "Fragmentary",
          dimensions: "15cm x 10cm",
          dateFound: "2024-03-01",
          description: "Partial vessel with geometric designs",
          location: "Grid A3",
        },
      ],
    },
    {
      id: 3,
      name: "Canyon Ridge Analysis",
      description:
        "Analysis of rock art and settlement patterns in canyon system.",
      location: "Utah",
      status: "Planning",
      startDate: "2024-04-01",
      expectedEndDate: "2024-06-15",
      siteType: "settlement",
      latitude: 37.1231,
      longitude: -113.1013,
      boundaryPoints: [
        [34.0489, -111.0937],
        [37.125, -113.1013],
        [37.125, -113.103],
        [37.1231, -113.103],
      ],
      artifacts: [
        {
          id: 1,
          name: "Ceramic Vessel",
          type: "Pottery",
          material: "Clay",
          condition: "Fragmentary",
          dimensions: "15cm x 10cm",
          dateFound: "2024-03-01",
          description: "Partial vessel with geometric designs",
          location: "Grid A3",
        },
      ],
    },
  ]);

  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      artifacts: [],
      status: "Planning",
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject.id;
  };

  const updateProject = (projectId, updatedData) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updatedData } : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const addArtifact = (projectId, artifactData) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            artifacts: [
              ...project.artifacts,
              { id: Date.now(), ...artifactData },
            ],
          };
        }
        return project;
      })
    );
  };

  const updateArtifact = (projectId, artifactId, updatedData) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            artifacts: project.artifacts.map((artifact) =>
              artifact.id === artifactId
                ? { ...artifact, ...updatedData }
                : artifact
            ),
          };
        }
        return project;
      })
    );
  };

  const deleteArtifact = (projectId, artifactId) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            artifacts: project.artifacts.filter(
              (artifact) => artifact.id !== artifactId
            ),
          };
        }
        return project;
      })
    );
  };

  const getProject = (projectId) => {
    return projects.find((project) => project.id === parseInt(projectId));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        addArtifact,
        updateArtifact,
        deleteArtifact,
        getProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
