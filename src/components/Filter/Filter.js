import React from 'react';
import './Filter.css';

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter-container">
      <label htmlFor="todo-filter">Filter todos:</label>
      <select
        id="todo-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default Filter;