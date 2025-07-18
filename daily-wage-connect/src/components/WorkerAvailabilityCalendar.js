import React, { useState } from 'react';

const WorkerAvailabilityCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateSelected = (day) => {
    const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return selectedDates.includes(dateStr);
  };

  const toggleDate = (day) => {
    const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(date => date !== dateStr)
        : [...prev, dateStr]
    );
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isPast = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) < new Date();
      
      days.push(
        <button
          key={day}
          onClick={() => !isPast && toggleDate(day)}
          disabled={isPast}
          className={`p-2 text-sm rounded-lg transition-colors ${
            isPast 
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded mr-2"></div>
          <span>Past dates</span>
        </div>
      </div>

      {/* Selected Dates Summary */}
      {selectedDates.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Available Dates:</h4>
          <div className="text-sm text-green-700">
            {selectedDates.sort().map(date => (
              <span key={date} className="inline-block bg-green-100 px-2 py-1 rounded mr-2 mb-1">
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerAvailabilityCalendar;