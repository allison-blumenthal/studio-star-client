import { clientCredentials } from '../client';

const getAssignments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleAssignment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createAssignments = (assignment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateAssignment = (assignment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments/${assignment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignment),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteAssignment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getAssignmentsByStudentId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/assignments?student_id=${id}`, {
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
  getAssignments, getSingleAssignment, createAssignments, updateAssignment, deleteAssignment, getAssignmentsByStudentId,
};
