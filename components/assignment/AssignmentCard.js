/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import assignment from '../../src/assets/images/assignment-icon.png';

// eslint-disable-next-line no-unused-vars
function AssignmentCard({ assignmentObj, onUpdate }) {
  return (
    <Card className="text-center assignment-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>Total: ${assignmentObj.date}</Card.Body>
      <Link href={`/assignments/${assignmentObj.id}`} passHref>
        <Card.Img className="assignment-icon" src={assignment} alt="assignment-icon" />
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
