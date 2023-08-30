import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import editIcon from '../../src/assets/images/edit-icon.png';
import deleteIcon from '../../src/assets/images/delete-icon.png';
import { deleteTaskSticker } from '../../utils/data/taskStickerData';

// eslint-disable-next-line no-unused-vars
function StickerCard({ stickerObj, onUpdate }) {
  const router = useRouter();

  const deleteThisTaskSticker = () => {
    if (window.confirm('Delete this sticker?')) {
      deleteTaskSticker(stickerObj.id).then(onUpdate);
    }
  };

  const handleEditClick = () => {
    router.push(`/stickers/edit/${stickerObj.id}`);
  };

  const emoji = String.fromCodePoint(parseInt(stickerObj.sticker_id.unicode.substr(2), 16));

  return (
    <>
      <Card className="text-center sticker-card">
        <Card.Body>
          <h1 style={{ fontSize: '150px' }}>
            {emoji}
          </h1>
        </Card.Body>
        <div className="btn-container">
          <Button onClick={handleEditClick}>
            <Image src={editIcon} alt="edit icon" />
          </Button>
          <Button onClick={deleteThisTaskSticker}>
            <Image src={deleteIcon} alt="delete icon" />
          </Button>
        </div>
      </Card>
    </>
  );
}

StickerCard.propTypes = {
  stickerObj: PropTypes.shape({
    id: PropTypes.number,
    sticker_id: PropTypes.shape({
      unicode: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StickerCard;
