import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { enrollStudio, unenrollStudio } from '../../utils/data/studioData';
import { useAuth } from '../../utils/context/authContext';

function StudioCard({ studioObj, onUpdate }) {
  const { user } = useAuth();

  const enroll = () => {
    enrollStudio(studioObj.id, user.uid).then(() => onUpdate());
  };

  const unenroll = () => {
    unenrollStudio(studioObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{studioObj.name}</Card.Header>
        <Card.Body>
          <Card.Title>Teacher: {studioObj.teacher_id.first_name} {studioObj.teacher_id.last_name} </Card.Title>
          <Card.Text>{studioObj.teacher_id.pronouns}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Instrument: {studioObj.teacher_id.instrument}</Card.Footer>
        {studioObj.enrolled ? (
          <Button
            onClick={unenroll}
          >Unenroll
          </Button>
        )
          : (
            <Button
              onClick={enroll}
            >Enroll
            </Button>
          )}

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
    }).isRequired,
    enrolled: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StudioCard;
