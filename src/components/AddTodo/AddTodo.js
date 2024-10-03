import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending'); // Default to "pending" status

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, status); // Pass both text and status to addTodo
      setText('');
      setStatus('pending'); // Reset to default
    }
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;