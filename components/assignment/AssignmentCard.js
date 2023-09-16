/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import assignment from '../../src/assets/images/assignment-icon.png';

// eslint-disable-next-line no-unused-vars
function AssignmentCard({ assignmentObj, onUpdate }) {
  const formattedDate = moment(assignmentObj.date).format('MM/DD/YYYY');

  return (
    <div className="mx-4 md:max-w-sm lg:max-w-md">
      <div className="flex items-center justify-center">
        <Link href={`/assignments/${assignmentObj.id}`} passHref>
          <div className="relative group">
            <Image
              src={assignment}
              alt="assignment icon"
              className="assignment-icon transition-opacity duration-100 ease-in-out hover:opacity-50"
              width={100}
              height={100}
            />
          </div>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
        <h5 className="text-xl font-semibold mb-2">Assignment</h5>
        <p className="text-gray-700">Date: {formattedDate}</p>
      </div>
    </div>
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
