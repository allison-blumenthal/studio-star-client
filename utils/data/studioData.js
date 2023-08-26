import { clientCredentials } from '../client';

// get all studios, passing in the user's uid for authorization
const getStudios = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studios`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// get a single studio based on the primary key
const getSingleStudio = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studios/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// create a studio, passing in the user's uid for authorization
const createStudio = (studio, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(studio),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// enroll a student in a studio (create a new row in the studio_student table), passing in the user's uid for authorization
const enrollStudio = (studioId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studios/${studioId}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

// unenroll a student from a studio (deletes the row from the studio_student table), passing in the user's uid for authorization
const unenrollStudio = (studioId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studios/${studioId}/unenroll`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then(resolve)
    .catch(reject);
});

// query the studio_students table by studio_id to get all the students in that studio
const getStudentsByStudio = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/studiostudents?studio_id=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getStudios, getSingleStudio, createStudio, enrollStudio, unenrollStudio, getStudentsByStudio,
};
