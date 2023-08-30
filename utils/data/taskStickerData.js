import { clientCredentials } from '../client';

const getTaskStickersByTaskId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/taskstickers?task_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteTaskSticker = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/taskstickers/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export { getTaskStickersByTaskId, deleteTaskSticker };
