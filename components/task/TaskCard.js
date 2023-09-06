/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import checked from '../../src/assets/images/checked-checkbox-icon.png';
import unchecked from '../../src/assets/images/empty-checkbox-icon.png';

// eslint-disable-next-line no-unused-vars
function TaskCard({ taskObj, onUpdate }) {
  return (
    <Card className="text-center assignment-card" style={{ width: '18rem', margin: '10px' }}>
      <Link href={`/tasks/${taskObj.id}`} passHref>
        <Card.Body>{taskObj.title}</Card.Body>
      </Link>
      {taskObj.is_completed === true
        ? (
          <div className="checkbox-icon">
            <Image src={checked} alt="checked box icon" />
          </div>
        )
        : (
          <div className="checkbox-icon">
            <Image src={unchecked} alt="empty box icon" />
          </div>
        )}
    </Card>
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
