import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setPriority(editingTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
    setErrors({});
  }, [editingTask]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority
    });
    
    if (!editingTask) {
      // Reset form only when adding new task
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
    
    setErrors({});
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setErrors({});
    onCancel();
  };

  const getPriorityIcon = (priorityLevel) => {
    switch (priorityLevel) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
        
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className={errors.title ? 'error' : ''}
            maxLength={100}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)..."
            rows={3}
            maxLength={500}
          />
          <small className="char-count">
            {description.length}/500 characters
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">{getPriorityIcon('low')} Low Priority</option>
            <option value="medium">{getPriorityIcon('medium')} Medium Priority</option>
            <option value="high">{getPriorityIcon('high')} High Priority</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;