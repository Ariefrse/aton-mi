import React from 'react';

const FilterDropdown = () => {
  return (
    <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Filter</span>
          <button className="text-blue-500">Clear All Filters</button>
        </div>
        <div className="flex space-x-2">
          <input type="date" className="border rounded p-2" placeholder="From" />
          <input type="date" className="border rounded p-2" placeholder="To" />
        </div>
        <div className="flex space-x-2">
          <input type="text" className="border rounded p-2" placeholder="Search" />
          <select className="border rounded p-2">
            <option>Buoy</option>
            <option>Light</option>
          </select>
          <select className="border rounded p-2">
            <option>No Message 21</option>
            <option>Message 21</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;