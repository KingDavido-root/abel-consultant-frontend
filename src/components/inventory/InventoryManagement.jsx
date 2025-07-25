import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../../config/api';

const InventoryManagement = () => {
  const [category, setCategory] = useState('vehicles'); // vehicles, electronics, spareParts
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Form fields configuration based on category
  const formFields = {
    vehicles: [
      { name: 'make', label: 'Make', type: 'text', required: true },
      { name: 'model', label: 'Model', type: 'text', required: true },
      { name: 'year', label: 'Year', type: 'number', required: true, min: 1900, max: new Date().getFullYear() + 1 },
      { name: 'vin', label: 'VIN', type: 'text', maxLength: 17 },
      { name: 'licensePlate', label: 'License Plate', type: 'text' },
      { name: 'color', label: 'Color', type: 'text' },
      { name: 'mileage', label: 'Current Mileage', type: 'number', min: 0 },
      { name: 'lastService', label: 'Last Service Date', type: 'date' },
      { name: 'notes', label: 'Notes', type: 'textarea', rows: 2 }
    ],
    electronics: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'brand', label: 'Brand', type: 'text', required: true },
      { name: 'model', label: 'Model', type: 'text', required: true },
      { name: 'serialNumber', label: 'Serial Number', type: 'text' },
      { name: 'condition', label: 'Condition', type: 'select', options: ['New', 'Like New', 'Good', 'Fair', 'Poor'] },
      { name: 'price', label: 'Price', type: 'number', min: 0, step: 0.01, required: true },
      { name: 'stockQuantity', label: 'Stock Quantity', type: 'number', min: 0, required: true },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2 }
    ],
    spareParts: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'partNumber', label: 'Part Number', type: 'text', required: true },
      { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'compatibility', label: 'Compatibility', type: 'text' },
      { name: 'location', label: 'Storage Location', type: 'text' },
      { name: 'price', label: 'Price', type: 'number', min: 0, step: 0.01, required: true },
      { name: 'stockQuantity', label: 'Stock Quantity', type: 'number', min: 0, required: true },
      { name: 'description', label: 'Description', type: 'textarea', rows: 2 }
    ]
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/${category}`, getAuthHeaders());
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(`Failed to fetch ${category}`);
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
      if (selectedItem) {
        await axios.put(
          `${API_URL}/api/${category}/${selectedItem._id}`,
          formData,
          getAuthHeaders()
        );
        toast.success(`${category} item updated successfully`);
      } else {
        await axios.post(
          `${API_URL}/api/${category}`,
          formData,
          getAuthHeaders()
        );
        toast.success(`${category} item added successfully`);
      }
      setShowModal(false);
      setSelectedItem(null);
      setFormData({});
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error saving ${category} item`);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm(`Are you sure you want to remove this ${category} item?`)) return;

    try {
      await axios.delete(`${API_URL}/api/${category}/${itemId}`, getAuthHeaders());
      toast.success(`${category} item removed successfully`);
      fetchItems();
    } catch (error) {
      toast.error(`Failed to remove ${category} item`);
    }
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex items-center space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="vehicles">Vehicles</option>
            <option value="electronics">Electronics</option>
            <option value="spareParts">Spare Parts</option>
          </select>
          <button
            onClick={() => {
              setSelectedItem(null);
              setFormData({});
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FiPlus className="mr-2" />
            Add {category.slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {category === 'vehicles' 
                    ? `${item.year} ${item.make} ${item.model}`
                    : item.name}
                </h3>
                <p className="text-gray-600">
                  {category === 'vehicles' 
                    ? item.licensePlate 
                    : category === 'electronics'
                    ? `${item.brand} - ${item.model}`
                    : `Part #: ${item.partNumber}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(item)
                .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                .map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    {' '}
                    {key === 'lastService' ? new Date(value).toLocaleDateString() : value}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">
              {selectedItem ? `Edit ${category.slice(0, -1)}` : `Add New ${category.slice(0, -1)}`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {formFields[category].map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        rows={field.rows}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        maxLength={field.maxLength}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedItem ? `Update ${category.slice(0, -1)}` : `Add ${category.slice(0, -1)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
