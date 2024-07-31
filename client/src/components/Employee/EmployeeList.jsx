import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setEmployees } from '../../store/employeeSlice';
import EmployeeModal from './EmployeeModal';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        dispatch(setEmployees(response.data));
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, [dispatch]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => setSelectedEmployee(employee)}
          >
            <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
            <p className="text-gray-700">Department: {employee.department}</p>
            <p className="text-gray-700">Status: {employee.status}</p>
          </div>
        ))}
      </div>
      {selectedEmployee && (
        <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </div>
  );
};

export default EmployeeList;
