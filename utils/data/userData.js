import { clientCredentials } from '../client';

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserByAssignmentId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users?assignment_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getSingleUser, getUserByAssignmentId };
