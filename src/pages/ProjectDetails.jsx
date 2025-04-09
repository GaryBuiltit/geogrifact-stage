import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbArrowLeft,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";

function ProjectDetails() {
  const { projectId } = useParams();
  const { isOpen, toggleSidebar } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddArtifact, setShowAddArtifact] = useState(false);
  const {
    getProject,
    updateProject,
    addArtifact,
    updateArtifact,
    deleteArtifact,
  } = useProjects();

  const [project, setProject] = useState(getProject(projectId));
  const [editedProject, setEditedProject] = useState(project);
  const [newArtifact, setNewArtifact] = useState({
    name: "",
    type: "",
    material: "",
    condition: "",
    dimensions: "",
    dateFound: "",
    description: "",
    location: "",
  });

  const handleProjectEdit = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProject = () => {
    updateProject(project.id, editedProject);
    setProject(editedProject);
    setIsEditing(false);
  };

  const handleAddArtifact = (e) => {
    e.preventDefault();
    addArtifact(project.id, newArtifact);
    setProject(getProject(project.id)); // Refresh project data
    setNewArtifact({
      name: "",
      type: "",
      material: "",
      condition: "",
      dimensions: "",
      dateFound: "",
      description: "",
      location: "",
    });
    setShowAddArtifact(false);
  };

  return (
    <div className="space-y-6 bg-white rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-300 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer border-r border-gray-300 pr-4"
          >
            {isOpen ? (
              <TbLayoutSidebarLeftCollapse className="h-6 w-6 text-black" />
            ) : (
              <TbLayoutSidebarLeftExpand className="h-6 w-6 text-black" />
            )}
          </button>
          <Link
            to="/projects"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <TbArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="text-2xl font-bold">Project Details</h1>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveProject}
                className="btn btn-primary btn-sm"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditedProject(project);
                  setIsEditing(false);
                }}
                className="btn btn-ghost btn-sm"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-ghost btn-sm"
            >
              <PencilIcon className="h-4 w-4 mr-1" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Details */}
        <div className="space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Project Information</h2>
              <div className="space-y-4">
                {isEditing ? (
                  // Edit Form
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">Project Name</label>
                      <input
                        type="text"
                        name="name"
                        className="input input-bordered"
                        value={editedProject.name}
                        onChange={handleProjectEdit}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">Description</label>
                      <textarea
                        name="description"
                        className="textarea textarea-bordered"
                        value={editedProject.description}
                        onChange={handleProjectEdit}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          className="input input-bordered"
                          value={editedProject.startDate}
                          onChange={handleProjectEdit}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">Expected End Date</label>
                        <input
                          type="date"
                          name="expectedEndDate"
                          className="input input-bordered"
                          value={editedProject.expectedEndDate}
                          onChange={handleProjectEdit}
                        />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="label">Status</label>
                      <select
                        name="status"
                        className="select select-bordered"
                        value={editedProject.status}
                        onChange={handleProjectEdit}
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="text-base-content/70">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-base-content/70">
                            {project.startDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        <div>
                          <p className="text-sm font-medium">Expected End</p>
                          <p className="text-sm text-base-content/70">
                            {project.expectedEndDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-base-content/70">
                          {project.latitude}°N, {project.longitude}°W
                        </p>
                      </div>
                    </div>
                    <div className="badge badge-primary">{project.status}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Project Location</h2>
              <div className="h-[300px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={[project.latitude, project.longitude]}
                  zoom={12}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[project.latitude, project.longitude]} />
                  {project.boundaryPoints.length >= 3 && (
                    <Polygon
                      positions={project.boundaryPoints}
                      pathOptions={{ color: "blue" }}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Artifacts */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Artifacts</h2>
              <button
                onClick={() => setShowAddArtifact(true)}
                className="btn btn-primary btn-sm"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Artifact
              </button>
            </div>

            {/* Add Artifact Form */}
            {showAddArtifact && (
              <form onSubmit={handleAddArtifact} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={newArtifact.name}
                      onChange={(e) =>
                        setNewArtifact({ ...newArtifact, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Type</label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={newArtifact.type}
                      onChange={(e) =>
                        setNewArtifact({ ...newArtifact, type: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Material</label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={newArtifact.material}
                      onChange={(e) =>
                        setNewArtifact({
                          ...newArtifact,
                          material: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Condition</label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={newArtifact.condition}
                      onChange={(e) =>
                        setNewArtifact({
                          ...newArtifact,
                          condition: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Date Found</label>
                    <input
                      type="date"
                      className="input input-bordered"
                      value={newArtifact.dateFound}
                      onChange={(e) =>
                        setNewArtifact({
                          ...newArtifact,
                          dateFound: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">Grid Location</label>
                    <input
                      type="text"
                      className="input input-bordered"
                      value={newArtifact.location}
                      onChange={(e) =>
                        setNewArtifact({
                          ...newArtifact,
                          location: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="form-control mt-4">
                  <label className="label">Description</label>
                  <textarea
                    className="textarea textarea-bordered"
                    value={newArtifact.description}
                    onChange={(e) =>
                      setNewArtifact({
                        ...newArtifact,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddArtifact(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Add Artifact
                  </button>
                </div>
              </form>
            )}

            {/* Artifacts List */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Date Found</th>
                  </tr>
                </thead>
                <tbody>
                  {project.artifacts.map((artifact) => (
                    <tr key={artifact.id}>
                      <td>{artifact.name}</td>
                      <td>{artifact.type}</td>
                      <td>{artifact.location}</td>
                      <td>{artifact.dateFound}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
