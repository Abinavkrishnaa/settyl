import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/employeeSlice';

const EmployeeForm = ({ setShowForm }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('Full-Time');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { name, address, age, department, status };
    try {
      const response = await axios.post('/api/employees', newEmployee);
      dispatch(addEmployee(response.data));
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Contract Employee">Contract Employee</option>
              <option value="Remote Location">Remote Location</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add Employee
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
