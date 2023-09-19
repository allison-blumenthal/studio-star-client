/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import checked from '../../src/assets/images/check-icon.png';
import unchecked from '../../src/assets/images/unchecked-icon.png';

// eslint-disable-next-line no-unused-vars
function TaskCard({ taskObj, onUpdate }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tasks/${taskObj.id}`);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div onClick={handleClick} role="button" tabIndex="0" className="bg-blue-400 p-4 md:p-6 mb-4 text-white text-2xl coustard rounded-lg shadow-lg flex justify-between items-center min-w-32 cursor-pointer hover:bg-blue-300 transition duration-100 ease-in-out">
      <div className="flex-1">
        <div className="p-4">
          {taskObj.title}
        </div>
      </div>
      <div>
        {taskObj.is_completed ? (
          <div>
            <Image src={checked} alt="checked box icon" width={45} height={45} />
          </div>
        ) : (
          <div>
            <Image src={unchecked} alt="empty box icon" width={40} height={40} />
          </div>
        )}
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  taskObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    is_completed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TaskCard;
