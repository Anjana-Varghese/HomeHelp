import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/dummyData';
import ToolCard from './ToolCard';
import ToolRentalModal from './ToolRentalModal';

const ToolRentalPage = () => {
  const [filteredTools, setFilteredTools] = useState(tools);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [showRentalModal, setShowRentalModal] = useState(false);

  const categories = ['All', 'Power Tools', 'Garden Tools', 'Plumbing Tools', 'Cleaning Tools'];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $15', value: '0-15' },
    { label: '$15 - $25', value: '15-25' },
    { label: '$25 - $35', value: '25-35' },
    { label: 'Over $35', value: '35+' }
  ];

  useEffect(() => {
    let filtered = tools;
    
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      filtered = filtered.filter(tool => {
        if (priceRange.includes('+')) {
          return tool.pricePerDay >= parseInt(min);
        } else {
          return tool.pricePerDay >= parseInt(min) && tool.pricePerDay <= parseInt(max);
        }
      });
    }
    
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTools(filtered);
  }, [selectedCategory, priceRange, searchTerm]);

  const handleRentTool = (tool) => {
    setSelectedTool(tool);
    setShowRentalModal(true);
  };

  const handleConfirmRental = (rentalData) => {
    console.log('Tool rental confirmed:', rentalData);
    setShowRentalModal(false);
    setSelectedTool(null);
    // Here you would typically send the rental data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">Tool Rental</h1>
              <p className="text-gray-600">Rent tools from verified workers</p>
            </div>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex gap-4">
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
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onRent={handleRentTool}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0M3 3l18 18" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tools found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Rental Modal */}
      {showRentalModal && (
        <ToolRentalModal
          tool={selectedTool}
          onClose={() => {
            setShowRentalModal(false);
            setSelectedTool(null);
          }}
          onConfirm={handleConfirmRental}
        />
      )}
    </div>
  );
};

export default ToolRentalPage;