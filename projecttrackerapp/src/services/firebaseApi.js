// services/firebaseApi.js
import axios from "axios";

const BASE_URL = "https://auth-d4729-default-rtdb.asia-southeast1.firebasedatabase.app";
// Projects
export const createProject = async (project) => {
  const res = await axios.post(`${BASE_URL}/projects.json`, project);
  return res.data;
};

export const getAllProjects = async () => {
  const res = await axios.get(`${BASE_URL}/projects.json`);
  return res.data;
};

export const updateProject = async (id, project) => {
  await axios.patch(`${BASE_URL}/projects/${id}.json`, project);
};

export const deleteProject = async (id) => {
  await axios.delete(`${BASE_URL}/projects/${id}.json`);
};

// Tasks
export const getTasksByProject = async (projectId) => {
  const res = await axios.get(`${BASE_URL}/projects/${projectId}/tasks.json`);
  return res.data;
};

export const createTask = async (projectId, task) => {
  const res = await axios.post(`${BASE_URL}/projects/${projectId}/tasks.json`, task);
  return res.data;
};

export const updateTask = async (projectId, taskId, task) => {
  await axios.patch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}.json`, task);
};

export const deleteTask = async (projectId, taskId) => {
  await axios.delete(`${BASE_URL}/projects/${projectId}/tasks/${taskId}.json`);
};
