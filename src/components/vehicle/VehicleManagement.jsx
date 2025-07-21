import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiTool } from 'react-icons/fi';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../../config/api';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    color: '',
    mileage: '',
    lastService: '',
    notes: ''
  });

  // Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/vehicles`, getAuthHeaders());
      setVehicles(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch vehicles');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedVehicle) {
        await axios.put(
          `${API_URL}/api/vehicles/${selectedVehicle._id}`,
          formData,
          getAuthHeaders()
        );
        toast.success('Vehicle updated successfully');
      } else {
        await axios.post(
          `${API_URL}/api/vehicles`,
          formData,
          getAuthHeaders()
        );
        toast.success('Vehicle added successfully');
      }
      setShowModal(false);
      setSelectedVehicle(null);
      setFormData({
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
        color: '',
        mileage: '',
        lastService: '',
        notes: ''
      });
      fetchVehicles();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving vehicle');
    }
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      vin: vehicle.vin,
      licensePlate: vehicle.licensePlate,
      color: vehicle.color,
      mileage: vehicle.mileage,
      lastService: vehicle.lastService ? new Date(vehicle.lastService).toISOString().split('T')[0] : '',
      notes: vehicle.notes
    });
    setShowModal(true);
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to remove this vehicle?')) return;

    try {
      await axios.delete(`${API_URL}/api/vehicles/${vehicleId}`, getAuthHeaders());
      toast.success('Vehicle removed successfully');
      fetchVehicles();
    } catch (error) {
      toast.error('Failed to remove vehicle');
    }
  };

  const handleServiceHistory = (vehicleId) => {
    // Navigate to service history page
    window.location.href = `/vehicles/${vehicleId}/service-history`;
  };

  const handleScheduleService = (vehicleId) => {
    // Navigate to service scheduling page
    window.location.href = `/schedule-service?vehicle=${vehicleId}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Vehicles</h1>
        <button
          onClick={() => {
            setSelectedVehicle(null);
            setFormData({
              make: '',
              model: '',
              year: '',
              vin: '',
              licensePlate: '',
              color: '',
              mileage: '',
              lastService: '',
              notes: ''
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <p className="text-gray-600">{vehicle.licensePlate}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p><span className="font-medium">VIN:</span> {vehicle.vin}</p>
              <p><span className="font-medium">Color:</span> {vehicle.color}</p>
              <p><span className="font-medium">Mileage:</span> {vehicle.mileage} miles</p>
              <p><span className="font-medium">Last Service:</span> {
                vehicle.lastService 
                  ? new Date(vehicle.lastService).toLocaleDateString()
                  : 'No service record'
              }</p>
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleServiceHistory(vehicle._id)}
                className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex-1"
              >
                <FiClock className="mr-2" />
                History
              </button>
              <button
                onClick={() => handleScheduleService(vehicle._id)}
                className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex-1"
              >
                <FiTool className="mr-2" />
                Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Vehicle Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {selectedVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Make</label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">VIN</label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  maxLength="17"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">License Plate</label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Service Date</label>
                <input
                  type="date"
                  name="lastService"
                  value={formData.lastService}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
