import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import { deleteTaskSticker } from '../../utils/data/taskStickerData';

// eslint-disable-next-line no-unused-vars
function TaskStickerCard({ taskStickerObj, onUpdate }) {
  const deleteThisTaskSticker = () => {
    if (window.confirm('Delete this sticker?')) {
      deleteTaskSticker(taskStickerObj.id).then(onUpdate);
    }
  };

  const emoji = String.fromCodePoint(parseInt(taskStickerObj.sticker_id.unicode.substr(2), 16));

  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-4 max-w-sm">
      <div className="text-center">
        <h1 className="text-9xl mb-4">{emoji}</h1>
      </div>
      <div className="flex justify-center">
        <button onClick={deleteThisTaskSticker} className="text-white font-bold pt-2 pb-1 px-4 rounded" type="button">
          <Image src={deleteIcon} alt="delete icon" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

TaskStickerCard.propTypes = {
  taskStickerObj: PropTypes.shape({
    id: PropTypes.number,
    sticker_id: PropTypes.shape({
      unicode: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskStickerCard;
