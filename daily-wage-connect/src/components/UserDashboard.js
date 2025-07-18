import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workers, bookings } from '../data/dummyData';
import WorkerCard from './WorkerCard';
import BookingModal from './BookingModal';

const UserDashboard = ({ user, onLogout, addNotification }) => {
  const [filteredWorkers, setFilteredWorkers] = useState(workers);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userBookings, setUserBookings] = useState(bookings);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const categories = ['All', 'Electrician', 'Plumber', 'Maid', 'Gardener'];

  useEffect(() => {
    let filtered = workers;
    
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(worker => worker.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(worker => 
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredWorkers(filtered);
  }, [selectedCategory, searchTerm]);

  const handleBookWorker = (worker) => {
    setSelectedWorker(worker);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      workerId: selectedWorker.id,
      userId: user.id,
      ...bookingData,
      status: 'pending'
    };
    
    setUserBookings([...userBookings, newBooking]);
    setShowBookingModal(false);
    setSelectedWorker(null);
    
    addNotification({
      message: `Booking request sent to ${selectedWorker.name}`,
      type: 'info'
    });
  };

  const getWorkerById = (workerId) => {
    return workers.find(worker => worker.id === workerId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">DailyWageConnect</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/tools" 
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Rent Tools
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Find Workers</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by name, category, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'All' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      (selectedCategory === category) || (selectedCategory === '' && category === 'All')
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Workers Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredWorkers.map(worker => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  onBook={() => handleBookWorker(worker)}
                />
              ))}
            </div>

            {filteredWorkers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No workers found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{userBookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {userBookings.filter(b => b.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-semibold text-green-600">
                    {userBookings.filter(b => b.status === 'confirmed').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {userBookings.slice(0, 3).map(booking => {
                  const worker = getWorkerById(booking.workerId);
                  return (
                    <div key={booking.id} className="border-l-4 border-indigo-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{worker?.name}</p>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                          <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {userBookings.length === 0 && (
                <p className="text-gray-500 text-center py-4">No bookings yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          worker={selectedWorker}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedWorker(null);
          }}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default UserDashboard;