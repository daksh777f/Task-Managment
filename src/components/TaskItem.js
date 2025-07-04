import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleToggle = () => {
    onToggle(task.id);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox-container">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="task-checkbox"
              id={`task-${task.id}`}
            />
            <label htmlFor={`task-${task.id}`} className="checkbox-label">
              <span className="checkmark"></span>
            </label>
          </div>
          
          <div className="task-info">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
          
          <div className="task-priority">
            <span className="priority-indicator" title={`${task.priority} priority`}>
              {getPriorityIcon(task.priority)}
            </span>
          </div>
        </div>
        
        <div className="task-footer">
          <div className="task-meta">
            <span className="task-date" title={`Created: ${new Date(task.createdAt).toLocaleString()}`}>
              {formatDate(task.createdAt)}
            </span>
            {task.updatedAt !== task.createdAt && (
              <span className="task-updated" title={`Updated: ${new Date(task.updatedAt).toLocaleString()}`}>
                • Updated {formatDate(task.updatedAt)}
              </span>
            )}
          </div>
          
          <div className="task-actions">
            <button
              onClick={handleEdit}
              className="action-btn edit-btn"
              title="Edit task"
              disabled={task.completed}
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className={`action-btn delete-btn ${showDeleteConfirm ? 'confirm' : ''}`}
              title={showDeleteConfirm ? 'Click again to confirm deletion' : 'Delete task'}
            >
              {showDeleteConfirm ? '⚠️' : '🗑️'}
            </button>
          </div>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirmation">
          <span>Click delete again to confirm</span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;