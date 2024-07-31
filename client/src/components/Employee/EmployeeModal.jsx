/* eslint-disable react/prop-types */
import { Tab } from '@headlessui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const EmployeeModal = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Details</h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab className={({ selected }) =>
                selected ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg' : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-blue-100 rounded-lg'
              }
            >
              Details
            </Tab>
            <Tab className={({ selected }) =>
                selected ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg' : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-blue-100 rounded-lg'
              }
            >
              Location
            </Tab>
            <Tab className={({ selected }) =>
                selected ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg' : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-blue-100 rounded-lg'
              }
            >
              Audit Trail
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="p-3">
              <div className="mb-4">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Address:</strong> {employee.address}</p>
                <p><strong>Age:</strong> {employee.age}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Status:</strong> {employee.status}</p>
              </div>
            </Tab.Panel>
            <Tab.Panel className="p-3">
              <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    {employee.address}
                  </Popup>
                </Marker>
              </MapContainer>
            </Tab.Panel>
            <Tab.Panel className="p-3">
              <p>Audit Trail: </p>
              {/* Implement audit trail display here */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default EmployeeModal;
