import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { isOpen, toggleSidebar } = useSidebar();
  // Mock data - replace with real data later
  const projects = [
    {
      id: 1,
      name: "Site A Excavation",
      location: "Arizona",
      status: "In Progress",
      startDate: "2024-02-15",
      artifactsCount: 45,
      description:
        "Archaeological excavation of prehistoric Native American settlement.",
      coordinates: "34.0489°N, 111.0937°W",
    },
    {
      id: 2,
      name: "Site B Survey",
      location: "New Mexico",
      status: "Completed",
      startDate: "2024-01-10",
      artifactsCount: 23,
      description: "Survey of potential colonial-era trading post locations.",
      coordinates: "34.5199°N, 105.8701°W",
    },
    {
      id: 3,
      name: "Canyon Ridge Analysis",
      location: "Utah",
      status: "Planning",
      startDate: "2024-04-01",
      artifactsCount: 0,
      description:
        "Analysis of rock art and settlement patterns in canyon system.",
      coordinates: "37.1231°N, 113.1013°W",
    },
  ];

  // Filter projects based on search term and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-success";
      case "in progress":
        return "badge-warning";
      case "planning":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="flex flex-col space-y-6 bg-white rounded-md p-4 min-h-[calc(100vh-50px)]">
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
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>
        <Link to="/new-project" className="btn btn-sm bg-[#A89A76] text-white">
          New Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-base-content/50" />
          <input
            type="text"
            placeholder="Search projects..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5" />
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title">{project.name}</h2>
                <span
                  className={`badge ${getStatusColor(project.status)} badge-sm`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-base-content/70">
                {project.description}
              </p>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{project.location}</span>
                  <span className="text-xs text-base-content/50">
                    ({project.coordinates})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Started: {project.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4" />
                  <span>{project.artifactsCount} artifacts recorded</span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/projects/${project.id}`}
                  className="btn btn-sm btn-outline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-base-content/50">No projects found</div>
          <p className="text-sm text-base-content/30 mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}

export default Projects;
