import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

function Overview() {
  const { isOpen, toggleSidebar } = useSidebar();
  // Temporary mock data - replace with real data later
  const stats = [
    {
      name: "Total Projects",
      value: "12",
      icon: ChartBarIcon,
      change: "+2 from last month",
    },
    {
      name: "In Progress",
      value: "4",
      icon: ClockIcon,
      change: "+1 from last month",
    },
    {
      name: "Completed",
      value: "8",
      icon: CheckCircleIcon,
      change: "+1 from last month",
    },
    {
      name: "Total Artifacts",
      value: "156",
      icon: ArchiveBoxIcon,
      change: "+12 from last month",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Site A Excavation",
      location: "Arizona",
      status: "In Progress",
      lat: 34.0489,
      lng: -111.0937,
    },
    {
      id: 2,
      name: "Site B Survey",
      location: "New Mexico",
      status: "Completed",
      lat: 34.5199,
      lng: -105.8701,
    },
  ];

  const recentArtifacts = [
    {
      id: 1,
      name: "Ceramic Vessel",
      project: "Site A Excavation",
      date: "2024-03-15",
      type: "Pottery",
    },
    {
      id: 2,
      name: "Stone Tool",
      project: "Site B Survey",
      date: "2024-03-14",
      type: "Lithic",
    },
  ];

  return (
    <div className="space-y-6 bg-white rounded-md p-4">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
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
        <h1 className="text-2xl font-bold">Overview</h1>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="card bg-base-100 rounded-md border border-gray-300 shadow-md"
          >
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-1">
                  <dt className="text-sm font-medium text-base-content/70">
                    {stat.name}
                  </dt>
                  <dd className="text-3xl font-semibold">{stat.value}</dd>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-xs text-base-content/70 mt-2">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="card bg-white rounded-md">
        <div className="card-body">
          <h2 className="card-title">Project Locations</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {recentProjects.map((project) => (
                <Marker key={project.id} position={[project.lat, project.lng]}>
                  <Popup>
                    <div className="font-semibold">{project.name}</div>
                    <div className="text-sm">{project.location}</div>
                    <div className="text-sm text-base-content/70">
                      {project.status}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Recent Projects & Artifacts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <div className="card bg-base-100 shadow-md rounded-md">
          <div className="card-body">
            <h2 className="card-title">Recent Projects</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.location}</td>
                      <td>
                        <span
                          className={`badge ${
                            project.status === "Completed"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Artifacts */}
        <div className="card bg-base-100 shadow-md rounded-md">
          <div className="card-body">
            <h2 className="card-title">Recent Artifacts</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Project</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentArtifacts.map((artifact) => (
                    <tr key={artifact.id}>
                      <td>{artifact.name}</td>
                      <td>{artifact.project}</td>
                      <td>{artifact.type}</td>
                      <td>{artifact.date}</td>
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

export default Overview;
