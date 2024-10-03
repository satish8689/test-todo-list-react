import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const getTodosFromApi = async () => {
  const response = await axios.get(`${API_URL}/user/5`);
  return response.data.todos;
};

export const addTodoToApi = async (todoText, isCompleted) => {
  const response = await axios.post(`${API_URL}/add`, {
    todo: todoText,
    completed: isCompleted,
    userId: 5,
  });
  return response.data;
};

export const updateTodoInApi = async (todo) => {
//   await axios.put(`${API_URL}/${todo.id}`, JSON.stringify({
//     //todo: todo.todo,
//     completed: todo.completed,
//   }));
};

export const deleteTodoFromApi = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};