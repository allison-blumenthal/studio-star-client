/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import assignment from '../../src/assets/images/assignment-icon.png';

// eslint-disable-next-line no-unused-vars
function AssignmentCard({ assignmentObj, onUpdate }) {
  const formattedDate = moment(assignmentObj.date).format('MM/DD/YYYY');

  return (
    <Card className="text-center assignment-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>Date: {formattedDate}</Card.Body>
      <Link href={`/assignments/${assignmentObj.id}`} passHref>
        <div className="assignment-icon">
          <Image src={assignment} alt="assignment icon" />
        </div>
      </Link>
    </Card>
  );
}

AssignmentCard.propTypes = {
  assignmentObj: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AssignmentCard;
