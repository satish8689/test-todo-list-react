import React, { useEffect, useState } from 'react';
import { getTodosFromApi, addTodoToApi, updateTodoInApi, deleteTodoFromApi } from '../../services/api';
import TodoList from '../../components/TodoList/TodoList';
import AddTodo from '../../components/AddTodo/AddTodo';
import Filter from '../../components/Filter/Filter';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodosFromApi();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (todoText, status) => {
    let statusUpdate = status == 'completed'?true:false
    const newTodo = await addTodoToApi(todoText, statusUpdate);
    newTodo.id = newTodo.id + todos.length; 
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    await updateTodoInApi(updatedTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id) => {
    // await deleteTodoFromApi(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id, newText, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: newText, completed: newStatus } : todo
    );
    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    await updateTodoInApi(todoToUpdate);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true; // All
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
    </div>
  );
};

export default TodoApp;