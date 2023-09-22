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
    <div className="mx-4 md:max-w-sm lg:max-w-md rounded bg-gray-100 shadow-lg p-3 transition-opacity duration-100 ease-in-out hover:bg-white">
      <h3 className="text-blue-500 text-center text-lg bevan p-2">{formattedDate}</h3>
      <div className="flex items-center justify-center">
        <Link href={`/assignments/${assignmentObj.id}`} passHref>
          <div className="relative group">
            <Image
              src={assignment}
              alt="assignment icon"
              width={100}
              height={100}
            />
          </div>
        </Link>
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
