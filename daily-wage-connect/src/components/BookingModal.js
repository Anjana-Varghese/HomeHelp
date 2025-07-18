import React, { useState } from 'react';

const BookingModal = ({ worker, onClose, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    service: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.date) newErrors.date = 'Date is required';
    if (!bookingData.time) newErrors.time = 'Time is required';
    if (!bookingData.service) newErrors.service = 'Service description is required';
    if (!bookingData.address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm(bookingData);
    }
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Book {worker.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Worker Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                <p className="text-sm text-gray-600">{worker.category}</p>
                <p className="text-sm text-gray-600">${worker.pricePerHour}/hour</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                value={bookingData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                id="time"
                name="time"
                value={bookingData.time}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                Service Required
              </label>
              <input
                type="text"
                id="service"
                name="service"
                value={bookingData.service}
                onChange={handleInputChange}
                placeholder="e.g., Fix electrical outlets, Clean house, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="2"
                value={bookingData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={bookingData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions or requirements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;