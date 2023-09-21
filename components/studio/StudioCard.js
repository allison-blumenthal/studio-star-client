import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { enrollStudio, unenrollStudio } from '../../utils/data/studioData';
import { useAuth } from '../../utils/context/authContext';

function StudioCard({ studioObj, onUpdate }) {
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState(studioObj.enrolled);

  const toggleEnrollment = () => {
    if (enrolled) {
      unenrollStudio(studioObj.id, user.uid).then(() => {
        setEnrolled(false);
        onUpdate();
      });
    } else {
      enrollStudio(studioObj.id, user.uid).then(() => {
        setEnrolled(true);
        onUpdate();
      });
    }
  };

  console.warn(studioObj);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 max-w-lg coustard">
      <h2 className="text-2xl font-medium mb-2">{studioObj.name}</h2>
      <div className="flex items-center mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studioObj.teacher_id.profile_image_url}
            alt="teacher"
            className="object-cover w-full h-full max-w-full max-h-full"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-medium">
            Teacher:
          </h3>
          <h2>{studioObj.teacher_id.first_name} {studioObj.teacher_id.last_name}</h2>
          <p className="text-gray-600 italic">{studioObj.teacher_id.pronouns}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        Instrument: {studioObj.teacher_id.instrument}
      </p>
      {user.is_teacher === false ? (
        <div className="mb-2">
          <label htmlFor="enrollmentCheckbox" className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="enrollmentCheckbox"
              checked={enrolled}
              onChange={toggleEnrollment}
              className="form-checkbox h-5 w-5 text-blue-400"
            />
            <span className="ml-2 text-gray-700">Enrolled</span>
          </label>
        </div>
      ) : null}
    </div>

  );
}

StudioCard.propTypes = {
  studioObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    teacher_id: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      pronouns: PropTypes.string,
      instrument: PropTypes.string,
      profile_image_url: PropTypes.string,
    }).isRequired,
    enrolled: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudioCard;
