import { clientCredentials } from '../client';

const getTasks = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createTask = (task) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTask = (task) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getTasksByAssignmentId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tasks?assignment_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getTasks, getSingleTask, createTask, updateTask, deleteTask, getTasksByAssignmentId,
};
