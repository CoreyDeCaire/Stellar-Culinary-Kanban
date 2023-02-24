
import React, { useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      tasks: [
        { id: 1, content: 'Task 1' },
        { id: 2, content: 'Task 2' },
        { id: 3, content: 'Task 3' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      tasks: [
        { id: 4, content: 'Task 4' },
        { id: 5, content: 'Task 5' },
      ],
    },
    done: {
      name: 'Done',
      tasks: [
        { id: 6, content: 'Task 6' },
        { id: 7, content: 'Task 7' },
      ],
    },
  });

  const handleDragStart = (event, task, columnId) => {
    event.dataTransfer.setData('task', JSON.stringify(task));
    event.dataTransfer.setData('columnId', columnId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, columnId) => {
    const task = JSON.parse(event.dataTransfer.getData('task'));
    const sourceColumnId = event.dataTransfer.getData('columnId');
    if (sourceColumnId !== columnId) {
      const sourceColumn = columns[sourceColumnId];
      const destinationColumn = columns[columnId];
      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];
      const taskIndex = sourceTasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        sourceTasks.splice(taskIndex, 1);
        destinationTasks.push(task);
        setColumns({
          ...columns,
          [sourceColumnId]: { ...sourceColumn, tasks: sourceTasks },
          [columnId]: { ...destinationColumn, tasks: destinationTasks },
        });
      }
    }
  };

  return (
    <div className="KanbanBoard">
      <h1>Stellar Culinary Personnel</h1>
      {Object.keys(columns).map((columnId) => {
        const column = columns[columnId];
        return (
          <div
            key={columnId}
            className="Column"
            onDragOver={(event) => handleDragOver(event)}
            onDrop={(event) => handleDrop(event, columnId)}
          >
            <h3>{column.name}</h3>
            {column.tasks.map((task) => (
              <div
                key={task.id}
                className="Task"
                draggable
                onDragStart={(event) => handleDragStart(event, task, columnId)}
              >
                {task.content}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
