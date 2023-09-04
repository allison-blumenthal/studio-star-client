import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
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
    <>
      <Card className="text-center sticker-card">
        <Card.Body>
          <h1 style={{ fontSize: '150px' }}>
            {emoji}
          </h1>
        </Card.Body>
        <div className="btn-container">
          <Button onClick={deleteThisTaskSticker}>
            <Image src={deleteIcon} alt="delete icon" />
          </Button>
        </div>
      </Card>
    </>
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
