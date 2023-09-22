import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { unenrollStudio } from '../../utils/data/studioData';
import assignment from '../../src/assets/images/assignment-icon.png';
import remove from '../../src/assets/images/unenroll-icon.png';

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

  // const handleProfile = () => {
  //   router.push(`/profile/${studioStudentObj.student_id.id}`);
  //   console.warn(studioStudentObj.student_id.id);
  // };

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-6 max-w-lg">
      <div className="flex">
        {/* <button onClick={handleProfile} type="button"> */}
        <h2 className="text-xl text-blue-700 bevan mb-2">
          {studioStudentObj.student_id.first_name} {studioStudentObj.student_id.last_name}
        </h2>
        {/* </button> */}
        <h3 className="text-gray-900 ml-auto coustard text-lg">{studioStudentObj.student_id.instrument}</h3>
      </div>
      <h3 className="text-gray-900 mb-2 coustard italic">{studioStudentObj.student_id.pronouns}</h3>
      <div className="text-center">
        <div className="w-72 h-72 rounded-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={studioStudentObj.student_id.profile_image_url} alt="student" className="object-cover w-full h-full max-w-full max-h-full" />
        </div>
      </div>
      <div className="pt-4 flex justify-between">
        <button onClick={unenroll} type="button" className="bg-yellow-400 hover:bg-yellow-500  px-3 pb-1 pt-2.5 rounded">
          <Image src={remove} alt="remove student icon" width={24} height={24} />
        </button>
        <button onClick={handleClick} type="button" className="bg-blue-400 hover:bg-blue-500 text-white px-3 pb-1 pt-2 rounded">
          <Image src={assignment} alt="assignment icon" width={24} height={24} />
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
