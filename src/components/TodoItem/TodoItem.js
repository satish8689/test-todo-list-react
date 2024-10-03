import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TodoItem.css';

const TodoItem = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const [editStatus, setEditStatus] = useState(todo.completed ? 'completed' : 'pending');

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    updateTodo(todo.id, editText, editStatus === 'completed');
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      deleteTodo(todo.id);
    }
  };

  return (
    <tr className={`todo-item`}>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
        ) : (
          <span onClick={() => toggleTodo(todo.id)}>{todo.todo}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="edit-status"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span className="status">{todo.completed ? 'Completed' : 'Pending'}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            <FontAwesomeIcon 
              icon={faEdit} 
              onClick={handleEditClick} 
              className="icon edit-icon" 
              title="Edit" 
            />
            <FontAwesomeIcon 
              icon={faTrash} 
              onClick={handleDeleteClick} 
              className="icon delete-icon" 
              title="Delete" 
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
