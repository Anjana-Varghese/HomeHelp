import React, { useState, useEffect } from 'react';
import { bookings, tools } from '../data/dummyData';
import WorkerAvailabilityCalendar from './WorkerAvailabilityCalendar';
import ToolCard from './ToolCard';

const WorkerDashboard = ({ user, onLogout, addNotification }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [workerBookings, setWorkerBookings] = useState([]);
  const [workerTools, setWorkerTools] = useState([]);
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    category: 'Electrician',
    experience: '5 years',
    location: 'Downtown',
    pricePerHour: 25,
    description: 'Experienced professional providing quality service.',
    availability: []
  });
  const [newTool, setNewTool] = useState({
    name: '',
    category: '',
    pricePerDay: '',
    description: ''
  });

  const categories = ['Electrician', 'Plumber', 'Maid', 'Gardener'];
  const toolCategories = ['Power Tools', 'Garden Tools', 'Plumbing Tools', 'Cleaning Tools'];

  useEffect(() => {
    // Filter bookings for current worker
    const filteredBookings = bookings.filter(booking => booking.workerId === user.id);
    setWorkerBookings(filteredBookings);

    // Filter tools for current worker
    const filteredTools = tools.filter(tool => tool.ownerId === user.id);
    setWorkerTools(filteredTools);
  }, [user.id]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    addNotification({
      message: 'Profile updated successfully!',
      type: 'success'
    });
  };

  const handleBookingAction = (bookingId, action) => {
    setWorkerBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'accept' ? 'confirmed' : 'rejected' }
          : booking
      )
    );
    
    addNotification({
      message: `Booking ${action === 'accept' ? 'accepted' : 'declined'} successfully!`,
      type: action === 'accept' ? 'success' : 'info'
    });
  };

  const handleAddTool = (e) => {
    e.preventDefault();
    if (newTool.name && newTool.category && newTool.pricePerDay) {
      const tool = {
        id: Date.now(),
        ...newTool,
        pricePerDay: parseFloat(newTool.pricePerDay),
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
        ownerId: user.id
      };
      
      setWorkerTools(prev => [...prev, tool]);
      setNewTool({ name: '', category: '', pricePerDay: '', description: '' });
      
      addNotification({
        message: 'Tool added successfully!',
        type: 'success'
      });
    }
  };

  const calculateEarnings = () => {
    const completedBookings = workerBookings.filter(b => b.status === 'confirmed');
    const totalEarnings = completedBookings.length * profile.pricePerHour * 4; // Assuming 4 hours per job
    return totalEarnings;
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'bookings', name: 'Job Requests', icon: '📋' },
    { id: 'calendar', name: 'Availability', icon: '📅' },
    { id: 'tools', name: 'My Tools', icon: '🔧' },
    { id: 'earnings', name: 'Earnings', icon: '💰' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-green-600">Worker Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={profile.category}
                        onChange={(e) => setProfile({...profile, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={profile.experience}
                        onChange={(e) => setProfile({...profile, experience: e.target.value})}
                        placeholder="e.g., 5 years"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price per Hour ($)
                      </label>
                      <input
                        type="number"
                        value={profile.pricePerHour}
                        onChange={(e) => setProfile({...profile, pricePerHour: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      value={profile.description}
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Requests</h2>
                <div className="space-y-4">
                  {workerBookings.map(booking => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                          <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                          <p className="text-sm text-gray-600">{booking.address}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'decline')}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {workerBookings.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No job requests yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Availability Calendar</h2>
                <WorkerAvailabilityCalendar />
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Tools</h2>
                
                {/* Add New Tool Form */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Add New Tool</h3>
                  <form onSubmit={handleAddTool} className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tool name"
                      value={newTool.name}
                      onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                      value={newTool.category}
                      onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select category</option>
                      {toolCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Price per day"
                      value={newTool.pricePerDay}
                      onChange={(e) => setNewTool({...newTool, pricePerDay: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Add Tool
                    </button>
                    <textarea
                      placeholder="Description"
                      value={newTool.description}
                      onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                      className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="2"
                    />
                  </form>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {workerTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} isOwner={true} />
                  ))}
                </div>
                
                {workerTools.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No tools added yet</p>
                )}
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Summary</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-800">Total Earnings</h3>
                    <p className="text-3xl font-bold text-green-600">${calculateEarnings()}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-800">Completed Jobs</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {workerBookings.filter(b => b.status === 'confirmed').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800">Pending Jobs</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      {workerBookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;