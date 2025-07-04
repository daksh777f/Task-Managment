import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="task-list">
      <h3>Tasks ({tasks.length})</h3>
      <div className="task-items">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;