import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import EmployeeForm from '../components/Employee/EmployeeForm';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Dashboard = () => {
  const employees = useSelector((state) => state.employees.items);
  const [showForm, setShowForm] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('/api/employee-stats');
        console.log('Chart data response:', response.data);  // Log the response data
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error('Data is not an array:', data);
          return;
        }

        const months = data.map((item) => item.month);
        const counts = data.map((item) => item.count);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Number of Employees Added',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
      <div className="mb-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={() => setShowForm(true)}
        >
          Add Employee
        </button>
      </div>
      {showForm && <EmployeeForm setShowForm={setShowForm} />}
      <div className="mb-6 relative">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-96 z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {employees && employees.map((employee) => (
            <Marker key={employee.id} position={[employee.lat, employee.lng]}>
              <Popup>
                <strong>{employee.name}</strong><br />
                {employee.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-6">
        {chartData.labels.length > 0 && <Bar data={chartData} />}
      </div>
    </div>
  );
};

export default Dashboard;
