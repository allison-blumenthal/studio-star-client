import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function StickerCard({ stickerObj }) {
  const emoji = String.fromCodePoint(parseInt(stickerObj.unicode.substr(2), 16));

  return (
    <>
      <Card className="text-center sticker-card">
        <Card.Body>
          <h1 style={{ fontSize: '150px' }}>
            {emoji}
          </h1>
        </Card.Body>
      </Card>
    </>
  );
}

StickerCard.propTypes = {
  stickerObj: PropTypes.shape({
    id: PropTypes.number,
    unicode: PropTypes.string,
  }).isRequired,
};

export default StickerCard;
