import React from 'react';
import './TaskFilters.css';

const TaskFilters = ({ 
  filter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  onClearCompleted, 
  hasCompletedTasks 
}) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: '📋' },
    { key: 'active', label: 'Active', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' }
  ];

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="task-filters">
      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="clear-search"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          {filters.map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => onFilterChange(filterOption.key)}
              className={`filter-btn ${filter === filterOption.key ? 'active' : ''}`}
            >
              <span className="filter-icon">{filterOption.icon}</span>
              <span className="filter-label">{filterOption.label}</span>
            </button>
          ))}
        </div>

        {hasCompletedTasks && (
          <div className="filter-actions">
            <button
              onClick={onClearCompleted}
              className="clear-completed-btn"
              title="Remove all completed tasks"
            >
              🧹 Clear Completed
            </button>
          </div>
        )}
      </div>

      {searchTerm && (
        <div className="search-info">
          <span className="search-indicator">
            Searching for: <strong>"{searchTerm}"</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskFilters;