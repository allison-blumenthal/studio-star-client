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
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-6 max-w-md coustard">
      <h2 className="text-xl bevan mb-4 text-center">{studioObj.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <div className="w-72 h-72 rounded-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={studioObj.teacher_id.profile_image_url}
            alt="teacher"
            className="object-cover w-full h-full max-w-full max-h-full"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="ml-4 text-center">
          <div className="flex flex-wrap mb-2">
            <h3 className="bevan">
              Instrument:
            </h3>
            <h3 className="pl-1">{studioObj.teacher_id.instrument}</h3>
          </div>
          <div className="flex flex-wrap mb-2">
            <h3 className="bevan">
              Pronouns:
            </h3>
            <h3 className="pl-1 italic">{studioObj.teacher_id.pronouns}</h3>
          </div>
          <div className="flex flex-wrap mb-2">
            <h3 className="bevan">Email:</h3>
            <h3 className="pl-1">{studioObj.teacher_id.email}</h3>
          </div>
        </div>
      </div>

      {user.is_teacher === false ? (
        <div className="mt-3 text-center text-2xl">
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
      email: PropTypes.string,
    }).isRequired,
    enrolled: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudioCard;
