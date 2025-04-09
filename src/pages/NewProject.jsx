import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Polygon,
} from "react-leaflet";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "@/contexts/SidebarContext";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

// New component to handle map position updates
function MapController({ coords, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView(coords, zoom);
    }
  }, [coords, zoom, map]);

  return null;
}

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function NewProject() {
  const { isOpen, toggleSidebar } = useSidebar();
  const [step, setStep] = useState(1);
  const [position, setPosition] = useState(null);
  const [boundaryPoints, setBoundaryPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ lat: "", lng: "" });
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const mapRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    expectedEndDate: "",
    siteType: "",
    culturalPeriod: "",
    permitNumber: "",
    teamSize: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setCoordinates((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoToLocation = (e) => {
    e.preventDefault();
    const lat = parseFloat(coordinates.latitude);
    const lng = parseFloat(coordinates.longitude);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setPosition([lat, lng]);
      // The MapController component will handle the zoom
    } else {
      alert(
        "Please enter valid coordinates:\nLatitude: -90 to 90\nLongitude: -180 to 180"
      );
    }
  };

  const handleAddPoint = (e) => {
    e.preventDefault();
    const lat = parseFloat(newPoint.lat);
    const lng = parseFloat(newPoint.lng);

    if (
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      setBoundaryPoints([...boundaryPoints, [lat, lng]]);
      setNewPoint({ lat: "", lng: "" });
    } else {
      alert(
        "Please enter valid coordinates:\nLatitude: -90 to 90\nLongitude: -180 to 180"
      );
    }
  };

  const handleRemovePoint = (index) => {
    setBoundaryPoints(boundaryPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      latitude: position[0],
      longitude: position[1],
      boundaryPoints: boundaryPoints,
    };
    console.log("Project Data:", projectData);
    // TODO: Submit to backend
  };

  const canProceed = position !== null;
  const canSubmit = formData.name && formData.description && formData.startDate;

  return (
    <div className="space-y-6 bg-white rounded-lg p-4">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <TbLayoutSidebarLeftCollapse className="h-6 w-6 text-black" />
          ) : (
            <TbLayoutSidebarLeftExpand className="h-6 w-6 text-black" />
          )}
        </button>
        <h1 className="text-2xl font-bold">New Project</h1>
        <div className="text-sm breadcrumbs flex-1">
          <ul>
            <li className={step === 1 ? "text-primary" : ""}>Location</li>
            <li className={step === 2 ? "text-primary" : ""}>Details</li>
          </ul>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div className="bg-white">
            <div className="card-body">
              <h2 className="card-title">
                <MapPinIcon className="h-5 w-5" />
                Select Project Location
              </h2>

              {/* Coordinate Input Form */}
              <form onSubmit={handleGoToLocation} className="flex gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Latitude</span>
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    step="any"
                    placeholder="Enter latitude"
                    className="input input-bordered w-[200px]"
                    value={coordinates.latitude}
                    onChange={handleCoordinateChange}
                    min="-90"
                    max="90"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Longitude</span>
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    step="any"
                    placeholder="Enter longitude"
                    className="input input-bordered w-[200px]"
                    value={coordinates.longitude}
                    onChange={handleCoordinateChange}
                    min="-180"
                    max="180"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">&nbsp;</span>
                  </label>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!coordinates.latitude || !coordinates.longitude}
                  >
                    Go to Location
                  </button>
                </div>
              </form>

              {/* Boundary Points Form */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Project Boundaries
                </h3>
                <form onSubmit={handleAddPoint} className="flex gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="label">
                      <span className="label-text">Point Latitude</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter latitude"
                      className="input input-bordered w-[200px]"
                      value={newPoint.lat}
                      onChange={(e) =>
                        setNewPoint({ ...newPoint, lat: e.target.value })
                      }
                      min="-90"
                      max="90"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="label">
                      <span className="label-text">Point Longitude</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter longitude"
                      className="input input-bordered w-[200px]"
                      value={newPoint.lng}
                      onChange={(e) =>
                        setNewPoint({ ...newPoint, lng: e.target.value })
                      }
                      min="-180"
                      max="180"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">&nbsp;</span>
                    </label>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={!newPoint.lat || !newPoint.lng}
                    >
                      <PlusIcon className="h-5 w-5" />
                      Add Point
                    </button>
                  </div>
                </form>

                {/* Boundary Points List */}
                {boundaryPoints.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                      <thead>
                        <tr>
                          <th>Point</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {boundaryPoints.map((point, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{point[0].toFixed(4)}°</td>
                            <td>{point[1].toFixed(4)}°</td>
                            <td>
                              <button
                                onClick={() => handleRemovePoint(index)}
                                className="btn btn-ghost btn-xs"
                              >
                                <TrashIcon className="h-4 w-4 text-error" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="h-[500px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={[39.8283, -98.5795]}
                  zoom={4}
                  className="h-full w-full"
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker
                    position={position}
                    setPosition={setPosition}
                  />
                  <MapController coords={position} zoom={12} />
                  {boundaryPoints.length >= 3 && (
                    <Polygon
                      positions={boundaryPoints}
                      pathOptions={{ color: "blue" }}
                    />
                  )}
                </MapContainer>
              </div>

              {position && (
                <div className="mt-4 space-y-2">
                  <div>
                    <h3 className="font-semibold">Selected Location:</h3>
                    <p className="text-sm">
                      Latitude: {position[0].toFixed(4)}°, Longitude:{" "}
                      {position[1].toFixed(4)}°
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={!canProceed}
            >
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      ) : (
        // Step 2: Project Details Form
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="card">
            <div className="card-body space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Project Name</span>
                  </label>
                  <input
                    id="project-name"
                    type="text"
                    name="name"
                    className="input input-bordered"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Site Type</span>
                  </label>
                  <select
                    id="site-type"
                    name="siteType"
                    className="select select-bordered"
                    value={formData.siteType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select type</option>
                    <option value="settlement">Settlement</option>
                    <option value="burial">Burial Ground</option>
                    <option value="rock_art">Rock Art</option>
                    <option value="artifact_scatter">Artifact Scatter</option>
                    <option value="structure">Structure</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Start Date</span>
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    name="startDate"
                    className="input input-bordered"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Expected End Date</span>
                  </label>
                  <input
                    id="expected-end-date"
                    type="date"
                    name="expectedEndDate"
                    className="input input-bordered"
                    value={formData.expectedEndDate}
                    onChange={handleInputChange}
                  />
                </div>

                {/* <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Cultural Period</span>
                  </label>
                  <select
                    id="cultural-period"
                    name="culturalPeriod"
                    className="select select-bordered"
                    value={formData.culturalPeriod}
                    onChange={handleInputChange}
                  >
                    <option value="">Select period</option>
                    <option value="paleo_indian">Paleo-Indian</option>
                    <option value="archaic">Archaic</option>
                    <option value="woodland">Woodland</option>
                    <option value="mississippian">Mississippian</option>
                    <option value="historic">Historic</option>
                  </select>
                </div> */}

                {/* <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="label-text">Team Size</span>
                  </label>
                  <input
                    type="number"
                    name="teamSize"
                    className="input input-bordered"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
              </div> */}

                <div className="flex flex-col gap-2 w-full">
                  <label className="label">
                    <span className="label-text">Project Description</span>
                  </label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered h-24 w-full"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSubmit}
              >
                Create Project
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewProject;
