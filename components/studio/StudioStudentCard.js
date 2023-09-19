import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { unenrollStudio } from '../../utils/data/studioData';
import assignment from '../../src/assets/images/assignment-icon.png';
import trash from '../../src/assets/images/delete-icon.png';

function StudioStudentCard({ studioStudentObj, onUpdate }) {
  const router = useRouter();
  const { id } = router.query;

  const unenroll = () => {
    if (window.confirm(`Unenroll ${studioStudentObj.student_id.first_name}?`)) {
      unenrollStudio(id, studioStudentObj.student_id.uid).then(() => onUpdate());
    }
  };

  const handleClick = () => {
    router.push(`/students/${studioStudentObj.student_id.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
      <div className="flex">
        <h3 className="text-lg font-semibold mb-2">
          {studioStudentObj.student_id.first_name} {studioStudentObj.student_id.last_name}
        </h3>
        <p className="text-gray-600 ml-auto">{studioStudentObj.student_id.instrument}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleClick} type="button">
          <Image src={assignment} alt="assignment icon" width={24} height={24} />
        </button>
      </div>
      <p className="text-gray-600 mb-2">{studioStudentObj.student_id.pronouns}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={studioStudentObj.student_id.profile_image_url} alt="student" className="rounded-2xl mt-4" />
      <div className="text-right">
        <button onClick={unenroll} type="button">
          <Image src={trash} alt="remove student icon" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}

StudioStudentCard.propTypes = {
  studioStudentObj: PropTypes.shape({
    id: PropTypes.number,
    student_id: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      pronouns: PropTypes.string,
      instrument: PropTypes.string,
      profile_image_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudioStudentCard;
