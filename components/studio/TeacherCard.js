import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
function TeacherCard({ teacherObj, onUpdate, isSelected }) {
  const [checked, setChecked] = useState(isSelected);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onUpdate(teacherObj.id, !checked);
  };

  return (
    <Card className={`teacher-card ${checked ? 'selected' : ''}`}>
      <Card.Header>{teacherObj.first_name} {teacherObj.last_name}</Card.Header>
      <Card.Body>
        <Card.Title>{teacherObj.instrument}</Card.Title>
        <Card.Img className="teacher-img" src={teacherObj.profile_image_url} alt="teacher" />
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          Select
        </label>
      </Card.Body>
    </Card>
  );
}

TeacherCard.propTypes = {
  teacherObj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    instrument: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default TeacherCard;
