import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
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

  return (
    <>
      <Card className="text-center">
        <Card.Header>{studioObj.name}</Card.Header>
        <Card.Body>
          <Card.Title>Teacher: {studioObj.teacher_id.first_name} {studioObj.teacher_id.last_name} </Card.Title>
          <Card.Text>{studioObj.teacher_id.pronouns}</Card.Text>
          <Card.Img className="teacher-img" src={studioObj.teacher_id.profile_image_url} alt="teacher" />
        </Card.Body>
        <Card.Footer className="text-muted">Instrument: {studioObj.teacher_id.instrument}</Card.Footer>
        <div>
          <label htmlFor="enrollmentCheckbox">
            <input
              type="checkbox"
              id="enrollmentCheckbox"
              checked={enrolled}
              onChange={toggleEnrollment}
            />
            {enrolled ? 'Ennrolled' : 'Not Enrolled'}
          </label>
        </div>
      </Card>
    </>
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
