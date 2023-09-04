import { clientCredentials } from '../client';

const getStickers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/stickers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleSticker = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/stickers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

export { getStickers, getSingleSticker };
