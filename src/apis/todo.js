import apiInstance from "./index.api";
import { isAxiosError } from "axios";


const getTodosApi = async (limit = 10, page = 1) => {
  try {
    const response = await apiInstance.get(`/todo?limit=${limit}&page=${page}`);
    return [response.data, null];
  } catch (err) {
    console.error('Get todos API error:', err);
    if (isAxiosError(err)) {
      return [null, err.response?.data?.message || 'Failed to fetch todos'];
    }
    return [null, "An unexpected error occurred"];
  }
};


const createTodoApi = async (todoData) => {
  try {
    const response = await apiInstance.post("/todo", todoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return [response.data, null];
  } catch (err) {
    console.error("Create todo API error:", err);

    if (isAxiosError(err)) {
      return [null, err.response?.data?.message || "Failed to create todo"];
    }

    return [null, "An unexpected error occurred"];
  }
};


const updateTodoApi = async (todoId, updatedFields) => {
  try {
    const response = await apiInstance.put(`/todo/${todoId}`, updatedFields,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return [response.data, null];
  } catch (err) {
    console.error('Update todo API error:', err);
    if (isAxiosError(err)) {
      return [null, err.response?.data?.message || 'Failed to update todo'];
    }
    return [null, "An unexpected error occurred"];
  }
};



const deleteTodoApi = async (todoId) => {
  try {
    const response = await apiInstance.delete(`/todo/${todoId}`);
    return [response.data, null];
  } catch (err) {
    console.error('Delete todo API error:', err);
    if (isAxiosError(err)) {
      return [null, err.response?.data?.message || 'Failed to delete todo'];
    }
    return [null, "An unexpected error occurred"];
  }
};

export { getTodosApi, createTodoApi, updateTodoApi, deleteTodoApi };