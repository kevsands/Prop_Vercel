import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

const ContractorManagement = () => {
  const { user } = useAuth();
  const [contractors, setContractors] = useState([
    {
      id: 1,
      name: 'Murphy Construction Ltd',
      specialty: 'General Contractor',
      contact: 'John Murphy',
      email: 'john@murphyconstruction.ie',
      phone: '01-555-1234',
      status: 'active',
      projects: ['Maple Heights', 'Oakwood Residences']
    },
    {
      id: 2,
      name: 'Dublin Electrical Services',
      specialty: 'Electrical',
      contact: 'Sarah O\'Brien',
      email: 'sarah@dublinelectrical.ie',
      phone: '01-555-2345',
      status: 'active',
      projects: ['Maple Heights', 'Riverside Gardens']
    },
    {
      id: 3,
      name: 'Kelly Plumbing & Heating',
      specialty: 'Plumbing',
      contact: 'Michael Kelly',
      email: 'michael@kellyplumbing.ie',
      phone: '01-555-3456',
      status: 'inactive',
      projects: ['Oakwood Residences']
    },
    {
      id: 4,
      name: 'Irish Interiors',
      specialty: 'Interior Design',
      contact: 'Emma Byrne',
      email: 'emma@irishinteriors.ie',
      phone: '01-555-4567',
      status: 'active',
      projects: ['Maple Heights', 'Oakwood Residences', 'Riverside Gardens']
    },
    {
      id: 5,
      name: 'Green Landscaping',
      specialty: 'Landscaping',
      contact: 'Patrick Green',
      email: 'patrick@greenlandscaping.ie',
      phone: '01-555-5678',
      status: 'pending',
      projects: []
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContractor, setNewContractor] = useState({
    name: '',
    specialty: '',
    contact: '',
    email: '',
    phone: '',
    status: 'pending',
    projects: []
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContractor(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddContractor = (e) => {
    e.preventDefault();
    
    const id = contractors.length > 0 ? Math.max(...contractors.map(c => c.id)) + 1 : 1;
    
    setContractors(prev => [
      ...prev,
      {
        ...newContractor,
        id
      }
    ]);
    
    // Reset form
    setNewContractor({
      name: '',
      specialty: '',
      contact: '',
      email: '',
      phone: '',
      status: 'pending',
      projects: []
    });
    
    setShowAddForm(false);
  };
  
  const handleStatusChange = (id, newStatus) => {
    setContractors(prev => 
      prev.map(contractor => 
        contractor.id === id ? { ...contractor, status: newStatus } : contractor
      )
    );
  };
  
  return (
    <Layout title="Contractor Management - Prop.ie">
      <ProtectedRoute allowedRoles={['developer', 'admin']}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contractor Management</h1>
              <p className="text-gray-600">
                Manage contractors and service providers for your development projects.
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Add Contractor
            </button>
          </div>
          
          {/* Add Contractor Form */}
          {showAddForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Add New Contractor</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleAddContractor} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newContractor.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={newContractor.specialty}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Specialty</option>
                      <option value="General Contractor">General Contractor</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Roofing">Roofing</option>
                      <option value="Flooring">Flooring</option>
                      <option value="Painting">Painting</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Structural Engineering">Structural Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={newContractor.contact}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newContractor.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={newContractor.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                    >
                      Add Contractor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Contractors Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Contractors</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contractors.map((contractor) => (
                    <tr key={contractor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contractor.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contractor.specialty}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contractor.contact}</div>
                        <div className="text-sm text-gray-500">{contractor.email}</div>
                        <div className="text-sm text-gray-500">{contractor.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contractor.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : contractor.status === 'inactive' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {contractor.status.charAt(0).toUpperCase() + contractor.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contractor.projects.length > 0 
                            ? contractor.projects.join(', ') 
                            : 'No active projects'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {contractor.status !== 'active' && (
                            <button
                              onClick={() => handleStatusChange(contractor.id, 'active')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Activate
                            </button>
                          )}
                          {contractor.status !== 'inactive' && (
                            <button
                              onClick={() => handleStatusChange(contractor.id, 'inactive')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Deactivate
                            </button>
                          )}
                          <Link href={`/developer/contractors/${contractor.id}`}>
                            <a className="text-primary-600 hover:text-primary-900">
                              Details
                            </a>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Assign to Project</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Quickly assign contractors to development projects.</p>
                <Link href="/developer/projects/assign">
                  <a className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Assign Contractors
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Performance Reports</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">View contractor performance metrics and reports.</p>
                <Link href="/developer/contractors/reports">
                  <a className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    View Reports
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Contract Management</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Manage contracts, agreements, and documentation.</p>
                <Link href="/developer/contractors/contracts">
                  <a className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Manage Contracts
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default ContractorManagement;
