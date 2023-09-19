import React from 'react';
import PropTypes from 'prop-types';

function StickerCard({ stickerObj }) {
  const emoji = String.fromCodePoint(parseInt(stickerObj.unicode.substr(2), 16));

  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="text-center">
        <h1 className="text-9xl">{emoji}</h1>
      </div>
    </div>
  );
}

StickerCard.propTypes = {
  stickerObj: PropTypes.shape({
    id: PropTypes.number,
    unicode: PropTypes.string,
  }).isRequired,
};

export default StickerCard;
