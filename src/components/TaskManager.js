import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import './TaskManager.css';

const TaskManager = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${user}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(`tasks_${user}`, JSON.stringify(tasks));
  }, [tasks, user]);

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const exportTasks = useCallback(() => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tasks_${user}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [tasks, user]);

  const importTasks = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target.result);
          // Validate the structure
          if (Array.isArray(importedTasks)) {
            setTasks(importedTasks);
          } else {
            alert('Invalid file format. Please select a valid tasks backup file.');
          }
        } catch (error) {
          alert('Error reading file. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  }, []);

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Apply status filter
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Sort tasks by priority and creation date
  const sortedTasks = filteredTasks.sort((a, b) => {
    // Priority order: high -> medium -> low
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // If same priority, sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="task-manager">
      <div className="task-manager-header">
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{taskStats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{taskStats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{taskStats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <div className="data-management">
          <button onClick={exportTasks} className="export-btn" title="Export tasks to file">
            📤 Export
          </button>
          <label className="import-btn" title="Import tasks from file">
            📥 Import
            <input
              type="file"
              accept=".json"
              onChange={importTasks}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <TaskForm 
        onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <TaskFilters
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearCompleted={clearCompleted}
        hasCompletedTasks={taskStats.completed > 0}
        onExport={exportTasks}
        onImport={importTasks}
      />

      <TaskList
        tasks={sortedTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={setEditingTask}
      />

      {sortedTasks.length === 0 && (
        <div className="empty-state">
          {searchTerm ? (
            <>
              <p>No tasks found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Clear Search
              </button>
            </>
          ) : filter === 'completed' ? (
            <p>No completed tasks yet. Complete some tasks to see them here!</p>
          ) : filter === 'active' ? (
            <p>No active tasks. Great job! 🎉</p>
          ) : (
            <p>No tasks yet. Add your first task above to get started!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskManager;